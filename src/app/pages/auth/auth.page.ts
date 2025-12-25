import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonSegmentButton, IonSegment, IonLabel, IonSegmentContent, IonSegmentView, IonItem, IonList, IonInput, IonInputPasswordToggle, IonButton, IonCheckbox } from '@ionic/angular/standalone';
import { AuthService } from 'src/core/services/auth/auth-service';
import { switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CartService } from 'src/core/services/cart/cart-service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonButton, IonInput, IonList, IonItem, IonSegment, IonSegmentButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonSegmentContent, IonSegmentView, IonInputPasswordToggle, ReactiveFormsModule, RouterLink]
})
export class AuthPage{
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _Router = inject(Router)

  loginForm:FormGroup = this._FormBuilder.group({
    username:[null, Validators.required],
    password:[null, Validators.required],
  })

  /* Without User Points */
  submitLogin(): void {
    if (this.loginForm.invalid) return;

    const data = this.loginForm.value;

    this._AuthService.login(data).pipe(
      // 1. خزّن توكن المستخدم
      tap((res: any) => {
        this._AuthService.setToken(res.token);
        Preferences.set({ key: 'tradelineToken', value: res.token });
        this._CartService.addCart()
      }),

      // 2. هات بيانات المستخدم
      switchMap((res: any) => this._AuthService.getUserInfo(res.token)),

      // 3. خزّن بيانات المستخدم
      tap((user: any) => {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", `${user.firstname} ${user.lastname}`);
        localStorage.setItem("phone", user.phone);

        this._AuthService.userName.set(`${user.firstname} ${user.lastname}`)
      })
    ).subscribe({
      next: () => {
        this._ToastrService.success(
          `Login successful, ${localStorage.getItem('userName')}`,
          '',
          {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
            positionClass: 'toast-top-right',
            tapToDismiss: true
          }
        );
        this._Router.navigate(['/tabs/explore']);
        this.loginForm.reset();
      },
      error: (err) => {
        console.error('Login flow failed', err);
      }
    });
  }

  signupForm:FormGroup = this._FormBuilder.group({
    firstname:[null, Validators.required],
    lastname:[null, Validators.required],
    phone:[null, Validators.required],
    email:[null, Validators.required],
    password:[null, Validators.required],
    rePassword:[null, Validators.required],
  })

  submitSignup(): void {
    if (this.signupForm.invalid) return;
    const data = this.signupForm.value;

    this._AuthService.register(data).pipe(
      // 1. خزّن التوكن
      tap((res: any) => {
        this._AuthService.setToken(res.token); // استخدم setToken بدل localStorage مباشرة
      }),
      // 2. هات بيانات المستخدم
      switchMap((res: any) => this._AuthService.getUserInfo(res.token)),
      // 3. خزّن بيانات المستخدم
      tap((user: any) => {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", `${user.firstname} ${user.lastname}`);
        localStorage.setItem("phone", user.phone);
      })
    ).subscribe({
      next: () => {
        this._ToastrService.success(
          `SignUp successful, ${localStorage.getItem('userName')}`,
          '',
          {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
            positionClass: 'toast-top-right',
            tapToDismiss: true
          }
        );
        this._Router.navigate(['/tabs/explore']);
        this.signupForm.reset();
      },
      error: (err) => {
        console.error('Signup flow failed', err);
      }
    });
  }

  segmentChanged(event: any) {
    const value = event.detail.value;

    if (value === 'login') {
      this.loginForm.reset();
    } else if (value === 'SignUp') {
      this.signupForm.reset();
    }
  }

  /* Login With User Point */
  // submitLogin(): void {
  //   if (this.loginForm.invalid) return;

  //   const data = this.loginForm.value;

  //   this._AuthService.login(data).pipe(
  //   // 1. خزّن توكن المستخدم
  //   tap((res: any) => {
  //     localStorage.setItem("tradelineToken", res.token);
  //   }),

  //   // 2. هات بيانات المستخدم
  //   switchMap((res: any) => this._AuthService.getUserInfo(res.token)),

  //   // 3. خزّن بيانات المستخدم
  //   tap((user: any) => {
  //     localStorage.setItem("userId", user.id);
  //     localStorage.setItem("userName", `${user.firstname} ${user.lastname}`);
  //     localStorage.setItem("phone", user.phone);
  //   }),

  //   // 4. هات توكن النقاط
  //   switchMap(() => this._AuthService.getPointsToken()),

  //   // 5. استخدم توكن النقاط علشان تجيب النقاط
  //   switchMap((pointsRes: any) => {
  //     const tokenPoints = pointsRes.access_token;
  //     const phone = localStorage.getItem('phone');

  //     return this._AuthService.getPoints(tokenPoints, phone);
  //   }),

  //   // 6. خزّن النقاط
  //   tap((res: any) => {
  //     const p = typeof res === 'string' ? JSON.parse(res) : res;
  //       localStorage.setItem('points', p.Points ?? '0');
  //     })

  //   ).subscribe({
  //     next: () => {
  //       this._ToastrService.success(
  //         `Login successful, ${localStorage.getItem('userName')}`,
  //         '',
  //         {
  //           timeOut: 3000,
  //           progressBar: true,
  //           progressAnimation: 'increasing',
  //           closeButton: true,
  //           positionClass: 'toast-top-right',
  //           tapToDismiss: true
  //         }
  //       );

  //       this._Router.navigate(['/tabs/explore']);
  //       this.loginForm.reset();
  //     },
  //     error: (err) => {
  //       console.error('Login flow failed', err);
  //       localStorage.setItem('points', '0');
  //     }
  //   });
  // }

  /* SignUp With User Point */
  // submitSignup(): void {
  //   if (this.signupForm.invalid) return;

  //   const data = this.signupForm.value;

  //   this._AuthService.register(data).pipe(
  //   // 1. خزّن توكن المستخدم
  //   tap((res: any) => {
  //     localStorage.setItem("tradelineToken", res.token);
  //   }),

  //   // 2. هات بيانات المستخدم
  //   switchMap((res: any) => this._AuthService.getUserInfo(res.token)),

  //   // 3. خزّن بيانات المستخدم
  //   tap((user: any) => {
  //     localStorage.setItem("userId", user.id);
  //     localStorage.setItem("userName", `${user.firstname} ${user.lastname}`);
  //     localStorage.setItem("phone", user.phone);
  //   }),

  //   // 4. هات توكن النقاط
  //   switchMap(() => this._AuthService.getPointsToken()),

  //   // 5. استخدم توكن النقاط علشان تجيب النقاط
  //   switchMap((pointsRes: any) => {
  //     const tokenPoints = pointsRes.access_token;
  //     const phone = localStorage.getItem('phone');

  //     return this._AuthService.getPoints(tokenPoints, phone);
  //   }),

  //   // 6. خزّن النقاط
  //   tap((res: any) => {
  //     const p = typeof res === 'string' ? JSON.parse(res) : res;
  //       localStorage.setItem('points', p.Points ?? '0');
  //     })

  //   ).subscribe({
  //     next: () => {
  //       this._ToastrService.success(
  //         `Login successful, ${localStorage.getItem('userName')}`,
  //         '',
  //         {
  //           timeOut: 3000,
  //           progressBar: true,
  //           progressAnimation: 'increasing',
  //           closeButton: true,
  //           positionClass: 'toast-top-right',
  //           tapToDismiss: true
  //         }
  //       );

  //       this._Router.navigate(['/tabs/explore']);
  //       this.loginForm.reset();
  //     },
  //     error: (err) => {
  //       console.error('Login flow failed', err);
  //       localStorage.setItem('points', '0');
  //     }
  //   });
  // }


}
