import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NgxSpinnerComponent } from "ngx-spinner";
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, NgxSpinnerComponent],
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.initApp();
  }

  async initApp() {
     if (Capacitor.getPlatform() === 'web') {
      this.requestLocationPermissionWeb();
    } else {
      this.requestLocationPermission();
      // Hide splash
      await SplashScreen.hide();

      // Fullscreen StatusBar
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setStyle({ style: Style.Default });
      await StatusBar.hide();
    }


  }

  async requestLocationPermission() {
    try {
      const permission = await Geolocation.requestPermissions();

      if (permission.location === 'granted') {
        this.getCurrentLocation();
      } else {
        // console.warn('Location permission denied');
      }
    } catch (error) {
      // console.error('Error requesting location permission', error);
    }
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      // ممكن تخزن الإحداثيات أو تستخدمها مباشرة
    } catch (error) {
      // console.error('Error getting location', error);
    }
  }

  async requestLocationPermissionWeb() {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log('Current location (web):', position.coords);
      },
      (error) => {
        // console.error('Error getting location (web):', error);
      }
    );
  }
}
