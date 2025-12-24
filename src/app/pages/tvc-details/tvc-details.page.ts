import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/core/services/auth/auth-service';

@Component({
  selector: 'app-tvc-details',
  templateUrl: './tvc-details.page.html',
  styleUrls: ['./tvc-details.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class TvcDetailsPage{
  private readonly _AuthService = inject(AuthService)

  history:any[] = []
  userName:string | null = this._AuthService.userName()
  points:string | null = localStorage.getItem('points') || '0'
}
