import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { DeliveryService } from 'src/core/services/delivery/delivery-service';
import { DotnewlinePipe } from 'src/core/pipes/dotnewline/dotnewline-pipe';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, DotnewlinePipe]
})
export class DeliveryPage implements OnInit {
  private readonly _DeliveryService = inject(DeliveryService)

  shippingDeliveryData:any[] = [];

  ngOnInit() {
    this.getShippingDelivery()
  }

  getShippingDelivery():void{
    this._DeliveryService.shippingDelivery().subscribe({
      next:(res)=>{
        this.shippingDeliveryData = res
        console.log(this.shippingDeliveryData);
      }
    })
  }


}
