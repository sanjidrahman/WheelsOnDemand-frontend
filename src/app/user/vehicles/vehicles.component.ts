import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { IUserModel } from 'src/app/interfaces/user.model';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatRadioChange } from '@angular/material/radio';
import { IChoiceModel } from '../../interfaces/choice.interface';
import { IJwtData } from '../../interfaces/jwt.interface';
import { environment } from '../../../environments/environment.development';
import { ScriptLoaderService } from '../../scripts-loader/script.loader';
declare var google: any;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, OnDestroy {

  @ViewChild('autocomplete') autocomplete!: ElementRef;

  startDate!: Date
  endDate!: Date
  pickup!: string
  dropoff!: string
  formattedStartDate!: string
  formattedEndDate!: string
  days!: number
  minDate!: string
  maxDate!: string
  userid!: IJwtData
  userDetails!: IUserModel | undefined
  userChoices!: IChoiceModel | null
  isEditable: boolean = false
  panelOpenState: boolean = false;
  fuelOptions: string[] = ['Petrol', 'Diesel']
  transmissionOptions: string[] = ['Manual', 'Automatic']
  fuelSelected: string | undefined
  transmissionSelected: string | undefined
  searchText!: string
  debouncedSearchText!: string
  placesInRange: string[] = []
  private subscribe = new Subscription();
  private searchTextSubject = new Subject<string>()

  constructor(
    private _service: UserService,
    private _toastr: ToastrService,
    private _scriptLoaderService: ScriptLoaderService,
  ) { }

  ngOnInit(): void {
    this.initialize()

    this.searchTextSubject.pipe(debounceTime(1000)).subscribe((val) => {
      this.debouncedSearchText = val
    })

    // this gives contraits on data selection
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = sixMonthsFromNow.toISOString().split('T')[0];
  }

  // debouncing for search
  onSearch() {
    this.searchTextSubject.next(this.searchText)
  }
  // --------------

  // debouncing for autocomplete
  onAutocomplete() {
    // this.searchTextSubject.next(this.pickup)
  }
  // --------------

  // initializes the values to the templete by retrieving from service
  initialize() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userid = jwtDecode(token)
    }

    this._service.getUser().subscribe({
      next: (res: IUserModel) => {
        this.userChoices = res.choices
        this.showDetails()
      },
      error: (err) => {
        this._toastr.error(err.error.message)
      }
    })
  }

  // shows the choice details (pickup, dropoff, startdate, enddate) to DOM after userChoices got its values
  showDetails() {
    if (this.userChoices) {
      this.pickup = this.userChoices.pickup
      this.startDate = new Date(this.userChoices.startDate)
      this.endDate = new Date(this.userChoices.endDate)
      this.formattedStartDate = this.startDate.toISOString().split('T')[0]
      this.formattedEndDate = this.endDate.toISOString().split('T')[0]
      const timeDiff = this.endDate.getTime() - this.startDate.getTime()
      this.days = timeDiff / (1000 * 3600 * 24)
    }
  }

  addMonthsToDate(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  edit() {
    this.subscribe.add(
      this._scriptLoaderService.loadScript(environment.MAP_SCRIPT, () => {
      })
    );
    window['initMap'] = () => {
      this.initMap();
    }
    this.isEditable = true
  }

  // methods on selecting the filter options and reset
  ontransmissionSelected(event: MatRadioChange) {
    this.transmissionSelected = event.value
  }
  onfuelSelected(event: MatRadioChange) {
    this.fuelSelected = event.value
  }
  reset() {
    this.fuelSelected = undefined
    this.transmissionSelected = undefined
  }
  // -------------------------------------------------

  editChoice() {
    const choice = {
      startDate: this.formattedStartDate,
      endDate: this.formattedEndDate,
      pickup: this.pickup,
      dropoff: this.pickup
    }
    if (this.formattedEndDate <= this.formattedStartDate) {
      this._toastr.error('Droppoff date cannot be lesser or equal to start date')
    } else {
      if (this.placesInRange)
        this.subscribe.add(
          this._service.storeChoice(choice, this.placesInRange).subscribe({
            next: () => {
              this.initialize()
              this.isEditable = false
              this._toastr.success('Editted Successfully')
            },
            error: (err) => {
              if (err.message.length >= 2) {
                this._toastr.error('pickup should have value')
              } else {
                this._toastr.error('something went wrong')
              }
            }
          })
        )
    }
  }


  // initializing map autocompletion
  initMap() {
    const inputElement = this.autocomplete?.nativeElement;
    const autocomplete = new google.maps.places.Autocomplete(
      inputElement,
      {
        types: ['geocode'],
        componentRestrictions: { 'country': ['IN'] },
        fields: ['place_id', 'geometry', 'name'],
      });

    autocomplete.addListener('place_changed', () => {
      this.onSelected(autocomplete);
    });
  }

  onSelected(autocomplete: any) {
    const inputElement = this.autocomplete.nativeElement;
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      inputElement.placeholder = 'Enter your location...';
    } else {
      this.pickup = place.name
      this.getNearbyPlaces(place.geometry.location);
    }
  }

  getNearbyPlaces(location: any) {
    const request = {
      location: location,
      radius: 5000,
      types: ['establishment'],
      fields: ['place_id', 'geometry', 'name'],
    };

    const placesService = new google.maps.places.PlacesService(document.createElement('div'));

    placesService.nearbySearch(request, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placesInRange = results.map((place: any) => place.name)
      } else {
        console.error('Error fetching nearby places:', status);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
