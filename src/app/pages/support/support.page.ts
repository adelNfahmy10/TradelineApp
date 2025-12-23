import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonList, IonAvatar, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
  standalone: true,
  imports: [IonLabel,  IonList, IonItem, IonIcon, IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule]
})
export class SupportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
