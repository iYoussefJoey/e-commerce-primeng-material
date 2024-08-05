import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { Product } from '../../../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { SplitterModule } from 'primeng/splitter'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CartitemsService } from '../../../../services/cartitems.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@Component({
  selector: 'app-productslider',
  standalone: true,
  imports: [SplitterModule,CommonModule,RatingModule,FormsModule,ButtonModule,ProgressSpinnerModule],
  templateUrl: './productslider.component.html',
  styleUrl: './productslider.component.css'
})
export class ProductsliderComponent implements OnInit {
  constructor(private categories:CategoriesService , private activated:ActivatedRoute , private caritem:CartitemsService) { }
singleProd?:Product 
prodId:any 
isLoading:boolean = false
loading: boolean = false;

ngOnInit(): void {
  this.isLoading = true;
  setTimeout(() => {
    this.isLoading = false
}, 1000);
  this.activated.paramMap.subscribe((data)=>{
    this.prodId = data.get('id')
    this.getSingleProd()
  })
}

load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false
  }, 2000);

}
getSingleProd(){  
    this.categories.getSpecProduct(this.prodId).subscribe((data)=>{
      this.singleProd = data.data;
      console.log(data.data);
    })
  }
  addtoCart(id:string){
    this.caritem.addProductToCart(id).subscribe((data)=>{
      console.log(data)
    })
  }
  
}
