import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Subscription } from 'rxjs';
import { ScriptLoaderService } from '../../scripts-loader/script.loader';
import { environment } from '../../../environments/environment.development';
declare var google: any;

declare global {
  interface Window {
    google: any,
    initMap: () => void;
  }
}

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrl: './place-autocomplete.component.css'
})
export class PlaceAutocompleteComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('autocomplete') autocomplete!: ElementRef;
  @Output() placeSelected = new EventEmitter<string>();
  placesInRange: string[] = []
  private subscribe = new Subscription() 

  constructor(
    private _dataSharingService: DataSharingService,
    private _scriptLoaderService: ScriptLoaderService,
  ){}

  ngOnInit(): void {
    this.subscribe.add(
      this._scriptLoaderService.loadScript(environment.MAP_SCRIPT, () => {
      })
    );
    window['initMap'] = () => {
      this.initMap();
    }
   
  }

  ngAfterViewInit(): void {
    // this.initMap()
  }

  initMap() {
    const inputElement = this.autocomplete.nativeElement;
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
      this.placeSelected.emit(place.name);
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
        if(this.placesInRange) {
          this._dataSharingService.setData(this.placesInRange)
        }
      } else {
        console.error('Error fetching nearby places:', status);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
