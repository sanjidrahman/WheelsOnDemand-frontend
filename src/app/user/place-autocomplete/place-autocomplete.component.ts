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
    }
  }

}
