import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions
} from '@ionic-native/google-maps';
declare var google: { maps: { Map: new (arg0: HTMLElement, arg1: { center: { lat: number; lng: number; }; zoom: number; }) => null; event: { addListenerOnce: (arg0: null, arg1: string, arg2: () => void) => void; }; Marker: new (arg0: { position: { lat: number; lng: number; }; map: null; title: string; }) => any; }; };

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'], 
})
export class MapaPage implements OnInit {
    showForm = false;
    formData = {
      ciudad: '',
      categoria: '',
      estrellas: '',
      valor: ''
    };

  map = null;
  markers: Marker[] = [
    {
      position: {
        lat: 4.658383846282959,
        lng: -74.09394073486328,
      },
      title: 'Parque Simón Bolivar'
    },
    {
      position: {
        lat: 4.667945861816406,
        lng: -74.09964752197266,
      },
      title: 'Jardín Botánico'
    },
    {
      position: {
        lat: 4.676802158355713,
        lng: -74.04825592041016,
      },
      title: 'Parque la 93'
    },
    {
      position: {
        lat: 4.6554284,
        lng: -74.1094989,
      },
      title: 'Maloka'
    },
  ];

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const maps = document.getElementById('map');
    const mapEle: HTMLElement = maps!;
    // create LatLng object
    const myLatLng = {lat: 4.658383846282959, lng: -74.09394073486328};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }


  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitForm() {
    console.log(this.formData);
}


}