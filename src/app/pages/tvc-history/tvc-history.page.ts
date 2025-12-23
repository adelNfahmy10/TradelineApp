import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tvc-history',
  templateUrl: './tvc-history.page.html',
  styleUrls: ['./tvc-history.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class TvcHistoryPage implements OnInit {

  userName:string | null = localStorage.getItem('userName')
  points:string | null = localStorage.getItem('points')
  history:any[] = []


  ngOnInit() {
  }

}
