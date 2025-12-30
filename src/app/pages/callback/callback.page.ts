import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonTextarea, IonInput } from '@ionic/angular/standalone';
import { CallbackService } from 'src/core/services/callback/callback-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
  standalone: true,
  imports: [IonInput, IonTextarea, IonItem, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class CallbackPage {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _CallbackService = inject(CallbackService)
  private readonly _Router = inject(Router)

  callbackForm: FormGroup = this._FormBuilder.group({
    description: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', [ Validators.required, Validators.pattern('^[0-9+ ]{8,15}$') ]],
    email: ['', [ Validators.required, Validators.email ]],
    serial: ['', Validators.required],
    details: ['', Validators.required]
  });


  submitCallbackForm():void{
    let data = this.callbackForm.value
    if (this.callbackForm.invalid) return;

    this._CallbackService.sendCallback(this.callbackForm.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/tabs/explore'])
      }
    });
  }
}
