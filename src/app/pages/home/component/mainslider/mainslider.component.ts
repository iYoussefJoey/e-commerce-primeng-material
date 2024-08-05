import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from '../../../../interfaces/product';
import { CategoriesService } from '../../../../services/categories.service';

@Component({
  selector: 'app-mainslider',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './mainslider.component.html',
  styleUrl: './mainslider.component.css'
})
export class MainsliderComponent implements OnInit {
  categoriesList: Product[]=[];
  responsiveOptions: any[]  = [];
  constructor(private categories:CategoriesService){}

  ngOnInit() {
     
    this.responsiveOptions = [
         {
             breakpoint: '1199px',
             numVisible: 3,
             numScroll: 3
         },
         {
             breakpoint: '991px',
             numVisible: 2,
             numScroll: 2
         },
         {
             breakpoint: '767px',
             numVisible: 1,
             numScroll: 1
         }
     ];
     this.categories.getCategories().subscribe( {
       next: (data) => {
         this.categoriesList = data.data;
        //  console.log(data),"mainslider";
       }
     });
   }

 getSeverity(quantity: number) {
    if(quantity ){
     return 'success' ;
    } else {
     return 'danger';
 }
}
}