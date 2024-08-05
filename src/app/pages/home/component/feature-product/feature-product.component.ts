import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CategoriesService } from '../../../../services/categories.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../../pipes/trim.pipe';
import { SearchPipe } from '../../../../pipes/search.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CartitemsService } from '../../../../services/cartitems.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-feature-product',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    PaginatorModule,
    CommonModule,
    TrimPipe,
    SearchPipe,
    InputTextModule,
    ProgressSpinnerModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './feature-product.component.html',
  styleUrl: './feature-product.component.css',
  providers: [ConfirmationService, MessageService],
})
export class FeatureProductComponent implements OnInit {
  productList: Product[] = [];
  paginatedProduct: any[] = [];
  searchBar: string = '';
  first: number = 0;
  rows: number = 10;
  loading: boolean = true;
  constructor(
    private categoryservice: CategoriesService,
    private router: Router,
    private caritem: CartitemsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.categoryservice.getProductsOfCategory().subscribe((data) => {
      // console.table(data)
      // console.log(data)
      this.productList = data.data;
      this.loading = false;
    });
  }
  addtoCart(id: string) {
    this.caritem.addProductToCart(id).subscribe((data) => {
      console.log(data);
      this.caritem.numOfCartItems.next(data.numOfCartItems)
      this.messageService.add({ severity: 'success', summary: 'ADDED', detail: 'You have successfully added item to cart', life: 3000 });

    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    // this.paginate();
  }
  navigateToCart(index: any) {
    this.router.navigate([]);
  }
  // paginate() {
  //   this.paginatedProduct = this.productList.slice(this.first, this.first + this.rows);
  // }
}
