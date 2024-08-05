import { Component, OnInit } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { CommonModule } from '@angular/common';
import { CartitemsService } from '../../services/cartitems.service';
import { Carts, Product } from '../../interfaces/carts';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CategoriesComponent,
    CommonModule,
    TagModule,
    RatingModule,
    ButtonModule,
    DataViewModule,
    DropdownModule,
    FormsModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [ConfirmationService, MessageService],
})
export class CartComponent implements OnInit {
  cartDeatils!: Carts;
  cartProducts: Product[] = [];
  isLoading: boolean = false;

  visible: boolean = false;

  constructor(
    private cart: CartitemsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}
  confirm(id: string) {
    this.confirmationService.confirm({
      header: 'Confirmation Deleting your item',
      message: 'Are you sure you want to delete this item?',
      acceptIcon: 'pi pi-trash mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have successfully removed this item',
          life: 3000,
        });
        this.deleteCartItem(id);
        this.confirmationService.close();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'item isnot removed',
          life: 3000,
        });
        this.confirmationService.close();
      },
    });
  }

  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems() {
    this.isLoading = true;
    this.cart.getCartData().subscribe({
      next: (response) => {
        console.log(response);
        this.cartDeatils = response;
        this.cartProducts = this.cartDeatils.data.products;
        this.isLoading = false;
      },
    });
  }

  upDatedCount(count: number, id: string) {
    if (count < 1) {
      this.confirm(id);
      return;
    }
    this.cart.upDateCartData(count, id).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Item Updated successfully',
          life: 3000,
        });
        this.getCartItems();
      },
    });
  }

  deleteCartItem(id: string) {
    this.cart.deleteItemCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.getCartItems();
      },
    });
  }
  clearCartItem() {
    this.confirmationService.confirm({
      header: 'Confirmation clearing your item',
      message: 'Are you sure you want to Clear the cart?',
      acceptIcon: 'pi pi-trash mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.cart.deleteAllItemCart().subscribe({
          next: (response) => {
            console.log(response);
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Item Deleted successfully',
              life: 3000,
            });
            this.confirmationService.close();
            this.getCartItems();
            this.router.navigate(['/home']);
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Cart is not cleared',
          life: 3000,
        });
        this.confirmationService.close();
      },
    });
  }

  getSeverity(product: Product) {
    if (product.count > 7) {
      return 'danger';
    } else if (product.count >= 3) {
      return 'warning';
    } else {
      return 'success';
    }
  }
}
