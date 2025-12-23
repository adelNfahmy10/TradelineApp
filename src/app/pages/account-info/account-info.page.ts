import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonList, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/core/services/auth/auth-service';
import { AccountInfoService } from 'src/core/services/accountInfo/account-info-service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
  standalone: true,
  imports: [IonButton, IonBackButton, IonButtons, IonList, IonInput, IonItem, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AccountInfoPage implements OnInit{
  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)

  userData:any;
  userToken:string | null = localStorage.getItem('tradelineToken')
  editMode: boolean = false;

  ngOnInit(): void {
    if (this.userToken) {
      this.userInfo();
    }
  }

  userInfo(): void {
    this._AuthService.getUserInfo(this.userToken!).subscribe({
      next: (res) => {
        this.userData = res;
        this.infoForm.patchValue(res);
      }
    });
  }

  infoForm: FormGroup = this._FormBuilder.group({
    id:[''],
    firstname: [''],
    lastname: [''],
    email: [''],
    phone: [''],
    address: [''],
    address2: [''],
    billing_address: [''],
    city: [''],
    password: ['']
  });

  toggleEdit(): void {
    this.editMode = true

  }

  submitUpdate():void{
    this.editMode = false

  }

}
