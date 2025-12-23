import { Component, computed, effect, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSelect, IonSelectOption, IonList, IonItem, IonRow, IonGrid, IonCol, IonAlert } from '@ionic/angular/standalone';
import { EasypayService } from 'src/core/services/ease-pay/easypay';
import { SafeHtmlPipe } from 'src/core/pipes/safe-html-pipe';
import { RouterLink } from '@angular/router';


interface Rule {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-easy-pay',
  templateUrl: './easy-pay.page.html',
  styleUrls: ['./easy-pay.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonRow, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonSelect, IonSelectOption, IonItem, IonList, SafeHtmlPipe, RouterLink]
})
export class EasyPayPage {
 private readonly easypay = inject(EasypayService);

  tradeIn: Signal<any[]> = computed(() => this.easypay.tradeInArr());
  offers: Signal<any[]> = computed(() => this.easypay.offerArr());
  types: Signal<any[]> = computed(() => this.easypay.typesArr());
  oldDevices: Signal<any[]> = computed(() => this.easypay.oldDevicesArr());
  newDevices: Signal<any[]> = computed(() => this.easypay.newDevicesArr());

  tab: 'tradein' | 'offers' = 'tradein';
  selectedType: string | number | null = null;
  selectedNewDevice: number = 0;
  selectedOldDevice: number = 0;

  rules: Rule[] = [
    { icon: '01.png', text: 'Your device (iPhone & Mac) powers up and functions normally' },
    { icon: '02.png', text: 'Your device display is in good condition (iPhone & Mac)' },
    { icon: '03.png', text: 'Your device enclosure is in good condition (Free from dents)' },
    { icon: '04.png', text: 'Your device has no obvious signs of liquid contact (iPhone & Mac)' },
    { icon: '05.png', text: 'Your device keys or buttons are in good working condition (iPhone & Mac)' },
    { icon: '06.png', text: 'You have the device original power cable and adapter (iPhone & Mac)' },
    { icon: '07.png', text: 'Your device has no iCloud account it' },
    { icon: '08.png', text: 'Your device is signed off from Find My iPhone' },
  ];

  constructor() {
    effect(() => {
      const t = this.types();
      if (t && t.length && !this.selectedType) {
        this.selectedType = t[0].key ?? t[0].id;
        this.loadDevicesForSelectedType();
      }
    });
  }

  loadDevicesForSelectedType() {
    if (!this.selectedType) return;
    this.selectedOldDevice = 0;
    this.selectedNewDevice = 0;
    this.easypay.loadOldDevice(this.selectedType);
    this.easypay.loadNewDevice(this.selectedType);
  }

  onTypeSelect(value: any) {
    if (this.selectedType !== value) {
      this.selectedType = value;
      this.loadDevicesForSelectedType();
    }
  }

  getLogos(body: string): string {
    if (!body) return '';
    const all = body.split('LOG-');

    return all.map(str => {
      if (!str) return '';
      return /^[0-9]/.test(str[0])
        ? `<div><img loading="lazy" src="/assets/images/easypay-images/trade-in/${str[0]}.png" alt="icon" /></div>${str.slice(1)}`
        : str;
    }).join('');
  }

  get resultAmount(): number {
    return (Number(this.selectedNewDevice) || 0) - (Number(this.selectedOldDevice) || 0);
  }
}
