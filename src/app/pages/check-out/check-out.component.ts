import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CartitemsService } from '../../services/cartitems.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  isloading: boolean = false;
  cartId!: string;
  private paramMapSubscription!: Subscription;
  private checkoutSubscription!: Subscription;

  constructor(
    private cart: CartitemsService,
    private fb: FormBuilder,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false
  }, 1000);
    this.paramMapSubscription = this.activated.paramMap.subscribe(
      (data: any) => {
        this.cartId = data.params.cartId;
        console.log(this.cartId);
      }
    );
    
  }
  shippingAddress = this.fb.group({
    details: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', Validators.required],
  });

  load() {
    console.log(this.shippingAddress.value);
    this.loading = true;
    this.checkoutSubscription = this.cart
      .processCheckOut(this.cartId, this.shippingAddress.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.session && data.session.url) {
            window.location.href = data.session.url;
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  ngOnDestroy(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.checkoutSubscription) {
      this.checkoutSubscription.unsubscribe();
    }
    console.log(
      'ngOnDestroy called',
      this.checkoutSubscription,
      this.paramMapSubscription
    );
  }
}
