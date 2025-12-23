import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation, Position } from '@capacitor/geolocation';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonCardHeader, IonCardTitle, IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { PremiumService } from 'src/core/services/premium/premium';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-premuim',
  templateUrl: './premuim.page.html',
  styleUrls: ['./premuim.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCardContent, IonCard, IonCardTitle, IonCardHeader, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class PremuimPage implements OnInit {
  private readonly _PremiumService = inject(PremiumService);

  stores = computed(() => this._PremiumService.stores());
  userCoordinates: { latitude: number; longitude: number } | null = null;
  locationDenied: boolean = false;

  async ngOnInit() {
    const hasPermission = await this.requestLocationPermission();

    if (!hasPermission) {
      this.locationDenied = true;
      return;
    }

    this.userCoordinates = await this.getCurrentLocation();

    if (!this.userCoordinates) return;

    this._PremiumService.getStoresWithDistance(
      this.userCoordinates.latitude,
      this.userCoordinates.longitude
    );
  }

  async requestLocationPermission(): Promise<boolean> {
    try {
      if (Capacitor.getPlatform() === 'web') {
        // المتصفح سيطلب تلقائيًا عند استدعاء getCurrentPosition
        return true;
      }

      const status = await Geolocation.checkPermissions();
      if (status.location === 'granted') return true;

      const request = await Geolocation.requestPermissions();
      return request.location === 'granted';
    } catch {
      return false;
    }
  }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number } | null> {
    try {
      const pos: Position = await Geolocation.getCurrentPosition();
      return {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
    } catch {
      return null;
    }
  }

  openMap(coordinates: string) {
    const [lat, lng] = coordinates.split(',').map(Number);

    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  }
}
