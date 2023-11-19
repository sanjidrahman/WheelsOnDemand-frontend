import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrl: './place-autocomplete.component.css'
})
export class PlaceAutocompleteComponent implements AfterViewInit {

  @ViewChild('autocomplete') autocomplete!: ElementRef;
  @Output() placeSelected = new EventEmitter<string>();
  placesInRange: string[] = []

  ngAfterViewInit(): void {
    this.initMap()
  }

  initMap() {
    const inputElement = this.autocomplete.nativeElement;
    const autocomplete = new google.maps.places.Autocomplete(
      inputElement,
      {
        types: ['establishment'],
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
        console.log(this.placesInRange);
      } else {
        console.error('Error fetching nearby places:', status);
      }
    });
  }

}
