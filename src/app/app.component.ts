import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonMenu, IonContent, IonList, IonItem, IonButtons, IonMenuButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { NgxSpinnerComponent } from "ngx-spinner";
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, NgxSpinnerComponent],
})
export class AppComponent implements OnInit{

  path:string = ''

  constructor() {
    this.initApp();
  }

  ngOnInit(): void {
    this.pathPage()
  }

  pathPage():void{
  }

  async initApp() {
     if (Capacitor.getPlatform() === 'web') {
      this.requestLocationPermissionWeb();
    } else {
      this.requestLocationPermission();
    }
  }

  async requestLocationPermission() {
    try {
      const permission = await Geolocation.requestPermissions();

      if (permission.location === 'granted') {
        this.getCurrentLocation();
      } else {
        console.warn('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting location permission', error);
    }
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      // ممكن تخزن الإحداثيات أو تستخدمها مباشرة
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  async requestLocationPermissionWeb() {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Current location (web):', position.coords);
      },
      (error) => {
        console.error('Error getting location (web):', error);
      }
    );
  }
}
