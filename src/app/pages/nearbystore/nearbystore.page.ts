import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCardContent, IonIcon, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { PremiumService } from 'src/core/services/premium/premium';

@Component({
  selector: 'app-nearbystore',
  templateUrl: './nearbystore.page.html',
  styleUrls: ['./nearbystore.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonIcon, IonCardContent, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class NearbystorePage implements OnInit {
  private readonly _PremiumService = inject(PremiumService)

  stores = computed(() => this._PremiumService.stores());
  userCoordinates: { latitude: number; longitude: number } | null = null;

  async ngOnInit() {
    // طلب صلاحية الموقع
    const permission = await Geolocation.requestPermissions();

    // لو المستخدم رفض أو الموقع غير مفعل
    if (permission.location === 'denied') {
      alert('Please enable location to see nearby stores.');
      return;
    }

    // الحصول على الموقع
    this.userCoordinates = await this.getCurrentLocation();

    if (!this.userCoordinates) return;

    // استدعاء السيرفيس مع location
    this._PremiumService.getStoresWithDistance(
      this.userCoordinates.latitude,
      this.userCoordinates.longitude
    );
  }

  async getCurrentLocation() {
    try {
      const pos = await Geolocation.getCurrentPosition();
      return {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };

    } catch {
      alert('Unable to get your location. Please enable location services.');
      return null;
    }
  }
  openMap(coordinates: string) {
    const [lat, lng] = coordinates.split(',').map(Number);

    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  }
}
