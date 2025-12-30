import { Component, computed, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonList, IonListHeader, IonLabel, IonItem, IonRadio, IonRadioGroup, IonInput, IonSelect, IonSelectOption, IonButton, IonModal, IonTitle, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { CheckoutService } from 'src/core/services/checkout/checkout-service';
import { CartService } from 'src/core/services/cart/cart-service';
import { AuthService } from 'src/core/services/auth/auth-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonModal, IonInput, IonRadioGroup, IonRadio, IonItem, IonLabel, IonListHeader, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonSelect, IonSelectOption, IonButton]
})
export class CheckoutPage implements OnInit {
  // ================= Injected Services =================
  private readonly _CheckoutService = inject(CheckoutService);
  private readonly _CartService = inject(CartService);
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);

  // ================= Signals =================
  paymentMethods: WritableSignal<any[]> = signal([]);
  cartItems: WritableSignal<any[]> = signal([]);
  shippingValue: WritableSignal<number> = signal(0);

  userData: any = null;
  token = this._AuthService.token;
  currentCartId = this._AuthService.currentCartId;

  cartId:number | null = null
  count:WritableSignal<number> = signal(0)
  totalAmount:WritableSignal<number> = signal(0)
  subTotal:WritableSignal<number> = signal(0)
  tax:WritableSignal<number> = signal(0)

  payments_arr = [
    { code: 0, is_allowed: true, name: 'Credit Card on delivery',
      image: 'assets/images/checkout-image/cdel.png' },
    { code: 1, is_allowed: true, name: 'Cash on delivery',
      image: 'assets/images/checkout-image/cash.png' },
    { code: 2, is_allowed: true, name: 'Online Payment',
      image: 'assets/images/checkout-image/visa.png' },
    { code: 4, is_allowed: true, name: 'Credit - Debit On Delivery',
      image: 'assets/images/checkout-image/visa.png'
    },
    { code: 5, is_allowed: true, name: 'NBE Installment',
      image: 'assets/images/checkout-image/BanksLogos-07.png' },
    { code: 6, is_allowed: true, name: '6 months' },
    { code: 7, is_allowed: true, name: 'Credit Card Installment (CIB - QNB)' },
    { code: 9, is_allowed: true, name: 'ahly 9 months' },
    { code: 12, is_allowed: true, name: '12 months' },
    { code: 18, is_allowed: true, name: '18 months' },
    { code: 24, is_allowed: true, name: '24 months' },
    { code: 30, is_allowed: true, name: '30 months' },
    { code: 36, is_allowed: true, name: 'ahly 36 months' },
    { code: 100, is_allowed: true, name: 'valU',
      image: 'assets/images/checkout-image/BanksLogos-05.png' },
    { code: 101, is_allowed: true, name: 'FawryPay',
      image: 'assets/images/checkout-image/fawry_logo.jpg' },
    { code: 200, is_allowed: true, name: 'PremiumCard',
      image: 'assets/images/checkout-image/BanksLogos-09.png' },
    { code: 201, is_allowed: true, name: 'Orange',
      image: 'assets/images/checkout-image/BanksLogos-05.png' },
    { code: 202, is_allowed: true, name: 'Contact Shopping',
      image: 'assets/images/checkout-image/BanksLogos-05.png' },
    { code: 203, is_allowed: true, name: 'Souhoola',
      image: 'assets/images/checkout-image/BanksLogos-05.png' },
    { code: 204, is_allowed: true, name: 'Sympl',
      image: 'assets/images/checkout-image/sympl.png' },
    { code: 213, is_allowed: true, name: 'Forsa',
      image: 'assets/images/checkout-image/forsa-logo-05.png' },
    { code: 216, is_allowed: true, name: 'Banque du cairo Installment',
      image: 'assets/images/checkout-image/cairo.png' },
    { code: 222, is_allowed: true, name: 'Vodafone',
      image: 'assets/images/checkout-image/vodafone_cash.jpeg' },
    { code: 444, is_allowed: true, name: 'NBE Installment Direct',
      image: 'assets/images/checkout-image/BanksLogos-07.png' },
    { code: 555, is_allowed: true, name: 'paymob',
      image: 'assets/images/checkout-image/Apple_Pay-Logo.wine.png' },
    { code: 556, is_allowed: true, name: 'Souhoola 12m 0% interest 0% downpaymet 0% admin fees (machine on delivery)',
      image: 'assets/images/checkout-image/BanksLogos-05.png' },
    { code: 206, is_allowed: true, name: 'valU 12m 0% interest 0% downpaymet (Payment Link will be sent via SMS)',
      image: 'assets/images/checkout-image/BanksLogos-05.png' }
  ];
  payments_arr_avail:any[] = []
  months_nbe_arr: any[] = [];
  selectedPaymentMethod: number | null = null;
  showForms:boolean = false;

  cities = [
    "10th of Ramadan City",
    "15th of May City",
    "6th of October City",
    "Al 'Ajamī", // A city in Alexandria Governorate
    "Al `Ayyat",
    "Al Hawamidiyah",
    "Al Khusus",
    "Al Qanater El Khayriyah",
    "Al-Salam City",
    "Alexandria",
    "Awsim",
    "Badr City",
    "Badrashin",
    "Borg El Arab",
    "Cairo",
    "Dar El Salam",
    "El Shorouk City",
    "Giza",
    "Halwan",
    "Imbaba",
    "Maadi",
    "Madinaty",
    "Mokattam",
    "Nasr City",
    "New Cairo",
    "New Capital City",
    "Saqqara",
    "Sheikh Zayed City",
    "Shubra El Kheima",
    "Zamalek",
  ];

  // ================= Computed =================
  isPreorder = computed(() => this.cartItems().some(item => item.product?.is_preorder === true) );

  installmentMethods = computed(() => {
    const installmentCodes = [6, 12, 18, 24, 30];
    return this.payments_arr_avail.filter(pm => installmentCodes.includes(Number(pm.code)) );
  });

  // ================= Lifecycle =================
  ngOnInit(): void {
    this.loadCart();
  }

  constructor(){
    effect(() => {
      const token = this.token();
      if (token) {
        this.getUserInfo(token);
      }
    });
  }

  getUserInfo(token: string): void {
    this._AuthService.getUserInfo(token).subscribe({
      next: (res) => {
        this.userData = res;
        console.log('User Info:', res);

        this.checkoutForm.patchValue({
          name: this.userData.firstname + this.userData.lastname,
          phone: this.userData.phone,
          email: this.userData.email
        })
      },
      error: (err) => {
        console.error('Failed to load user info', err);
      }
    });
  }

  // ================= Cart =================
  private loadCart(): void {
    const id = this.token() ? 2 : this.currentCartId();
    if (!id) return;

    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartId = res.id
        this.cartItems.set(res?.cartproduct || []);
        this.count.set(res?.total_quantity || 0);
        this.subTotal.set(res?.total / 1.14)
        this.totalAmount.set(res?.total + this.shippingValue())
        this.tax.set(this.totalAmount() - this.subTotal())
        this._CartService.productCount.set(this.count())

        console.log(this.cartItems());


        this.loadShipping();
        this.loadPaymentMethods();
      },
      error: (err) => console.error('Failed to load cart:', err),
    });
  }

  private loadShipping(): void {
    this._CartService.getShipping().subscribe({
      next: (res) => {
        if(this.cartItems().length > 0){
          this.shippingValue.set(res[0].shipping || 0)
          this.totalAmount.set(this.totalAmount() + this.shippingValue())
        } else {
          this.shippingValue.set(0)
          this.tax.set(0)
          this.totalAmount.set(0)
        }
      },
      error: (err) => console.error('Failed to load shipping:', err),
    });
  }

  // ================= Payment Methods =================
  private loadPaymentMethods(): void {
    let deletedHiddenPayment:any[] = []
    let deletedHiddenPayment2:any[] = []
    this._CheckoutService.hiddingPayment().subscribe({
      next: (res: any) => {
        if (res.length) {
          deletedHiddenPayment = this.payments_arr;

          res.forEach((hiddenMethod:any) => {
            deletedHiddenPayment = deletedHiddenPayment.filter(
              (elm) => elm.code != Number(hiddenMethod.code)
            );
          });
          console.log(deletedHiddenPayment);

          if(this.cartItems()){
            this.cartItems().forEach((element) => {
              if (element.product) {
                if (element.product.payment_methods.length) {
                  let products_arrs = element.product.payment_methods;

                  products_arrs.forEach((element:any) => {
                    deletedHiddenPayment2 = deletedHiddenPayment.filter(
                      (elm, index, arr) => {
                        if ( parseInt(elm.code, 10) == parseInt(element.code, 10) ) {
                          if (elm.is_allowed) {
                            elm.is_allowed = element.is_allowed;
                            arr[arr.indexOf(elm)].is_allowed == elm.is_allowed;

                            if ( elm.code == 6 && elm.is_allowed && !this.months_nbe_arr.some((el) => el.code == 6) ) {
                              this.months_nbe_arr.push(elm);
                            }
                            if ( elm.code == 12 && elm.is_allowed && !this.months_nbe_arr.some((el) => el.code == 12) ) {
                              this.months_nbe_arr.push(elm);
                            }
                            if ( elm.code == 18 && elm.is_allowed && !this.months_nbe_arr.some((el) => el.code == 18) ) {
                              this.months_nbe_arr.push(elm);
                            }
                            if ( elm.code == 24 && elm.is_allowed && !this.months_nbe_arr.some((el) => el.code == 24) ) {
                              this.months_nbe_arr.push(elm);
                            }
                            if ( elm.code == 30 && elm.is_allowed && !this.months_nbe_arr.some((el) => el.code == 30) ) {
                              this.months_nbe_arr.push(elm);
                            }
                          }
                        }
                        return arr;
                      }
                    );
                  });

                  this.payments_arr_avail = deletedHiddenPayment2;
                }
              }
            });
          }
        }
      },
      error: (err) => console.error('Failed to load payment methods:', err),
    });
  }

  // ================= Form Checkout =================
  order:any = null
  showBilingAddress:boolean = true
  isModalOpen = false;
  promoCode:string = ''

  checkoutForm:FormGroup = this._FormBuilder.group({
    name: [null, Validators.required],
    phone: [null, Validators.required],
    email: [null, Validators.required],
    city: [null, Validators.required],
    address1: [null, Validators.required],
    address2: [null],
    bilingCity:[null],
    bilingAddress:[null],
  })

  orderForm:FormGroup = this._FormBuilder.group({
    QR_code:[true],
    cart:[this.cartId],
    code:[null],
    from_mobile:[false],
    orange_account_number:[null],
    payment_method:[this.selectedPaymentMethod],
    preorder_branch:[null],
    promotion:[null],
    wafer_cookies:[null],
    wasla_cookies:[null],
    _address:[null],
    _billing_address:[null],
    _city:[null],
    _email:[null],
    _name:[null],
    _ema_phoneil:[null],
  })

  onPaymentChange(event: any): void {
    this.selectedPaymentMethod = event.detail.value;
    this.showForms = true
  }

  toggleBilingAddress(){
    this.showBilingAddress = !this.showBilingAddress
  }

  continueOrder(isOpen: boolean):void{
    let data = this.orderForm.value
    data.QR_code = true
    data.cart =  this.cartId ? this.cartId : this.currentCartId();
    data.code = null
    data.from_mobile = true
    data.orange_account_number = ''
    data.payment_method = this.selectedPaymentMethod
    data.preorder_branch = null
    data.wafer_cookies = null
    data.wasla_cookies = null

    data._name = this.checkoutForm.get('name')?.value,
    data._address = this.checkoutForm.get('address1')?.value
    if(this.showBilingAddress){
      data._billing_address = this.checkoutForm.get('bilingAddress')?.value
      data._billing_city = this.checkoutForm.get('bilingCity')?.value
    } else {
      data._billing_address = this.checkoutForm.get('address1')?.value
      data._billing_city = this.checkoutForm.get('city')?.value
    }
    data._city = this.checkoutForm.get('city')?.value,
    data._email = this.checkoutForm.get('email')?.value,
    data._ema_phoneil = this.checkoutForm.get('phone')?.value

    if(this.checkoutForm.valid){
      this.isModalOpen = isOpen
    }

    this.order = data
  }

  checkout():void{
    this.order.promotion = this.promoCode
    this._CheckoutService.addOrder(this.order).subscribe({
      next:(res)=>{
        console.log(res);
        this.checkoutForm.reset()
        this.orderForm.reset()
        this.cartItems.set([])
        this.showForms = false
        this._Router.navigate(['tabs/explore'], { replaceUrl: true });
      },
      error:(err)=>{
        this._ToastrService.error(err.error?.detail)
      }
    })
  }
  // ================= Checkout =================


}
