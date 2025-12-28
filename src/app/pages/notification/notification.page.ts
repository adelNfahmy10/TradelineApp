import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonList, IonAvatar } from '@ionic/angular/standalone';
import { NotificationSerives } from 'src/core/services/notification/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonList, IonLabel, IonItem, IonIcon, IonContent, CommonModule, FormsModule, DatePipe]
})
export class NotificationPage {
  private readonly _NotificationSerives = inject(NotificationSerives)

  notifications: Signal<any[]> = computed(() => this._NotificationSerives.notifications());

  constructor() {
  }

}
