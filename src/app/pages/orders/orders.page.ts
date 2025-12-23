import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonRow, IonCol, IonButton, IonFooter, IonGrid, IonImg } from '@ionic/angular/standalone';
import { OrderService } from 'src/core/services/order/order-service';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonImg, IonGrid, IonFooter, IonButton, IonCol, IonRow, IonItem, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class OrdersPage implements OnInit {
  private readonly _OrderService = inject(OrderService)
  private readonly _AlertController = inject(AlertController)

  allOrders:any[] = []
  ordersCount:string | number = 0

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders():void{
    this._OrderService.getOrders().subscribe({
      next:(res)=>{
        this.allOrders = res
        this.ordersCount = this.allOrders.length
      }
    })
  }

  getPaymentMethod(method: number): string {
    const map: Record<number, string> = {
      0: 'Credit on delivery',
      1: 'Cash on delivery',
      2: 'Online Payment',
      4: 'Credit / Debit on Delivery',
      5: 'NBE Installment',
      6: 'NBE 6 months',
      7: 'Credit Card Installment',
      9: 'NBE 9 months',
      12: 'NBE 12 months',
      18: 'NBE 18 months',
      24: 'NBE 24 months',
      30: 'NBE 30 months',
      36: 'NBE 36 months',
      100: 'valU',
      101: 'FawryPay',
      203: 'Souhoola',
    };

    return map[method] || 'Unknown';
  }

  getStatusImage(status: string): string {
    const map: Record<string, string> = {
      'New Order': 'assets/imgs/order/new.png',
      'Out for Delivery': 'assets/imgs/order/delivery.png',
      'Delivered': 'assets/imgs/order/delivered.png',
    };

    return map[status] || '';
  }

  canCancel(status: string): boolean {
    return !['Canceled', 'Pending For Refund', 'Returned'].includes(status);
  }

  isCanceled(status: string): boolean {
    return status === 'Canceled';
  }

  presentCancel(id: string, reason?: string): void {
    const data = {
      status: 'Canceled',
      reason_for_cancelation: reason || 'User canceled the order'
    };

    this._OrderService.cancelOrder(id, data).subscribe({
      next: (res) => {
        console.log('Order canceled:', res);
        this.getAllOrders(); // refresh list
      },
      error: (err) => {
        console.error('Cancel failed', err);
      }
    });
  }

  async confirmCancel(id: string) {
    const alert = await this._AlertController.create({
      header: 'Cancel Order',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Yes',
          handler: () => this.presentCancel(id)
        }
      ]
    });

    await alert.present();
  }

}
