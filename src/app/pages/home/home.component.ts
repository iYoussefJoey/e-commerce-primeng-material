import { Component, OnInit } from '@angular/core';
import { AuthapiService } from '../../services/authapi.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from '../../interfaces/product';
import { MainsliderComponent } from "./component/mainslider/mainslider.component";
import { FeatureProductComponent } from "./component/feature-product/feature-product.component";
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { TrimPipe } from "../../pipes/trim.pipe";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, MainsliderComponent, FeatureProductComponent, InputTextModule, FloatLabelModule, FormsModule, TrimPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: Product[]=[];
  value: string = ' ';
  responsiveOptions: any[]  = [];

  constructor(private authservice: AuthapiService) {}

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
      this.authservice.getProducts().subscribe( {
        next: (data) => {
          this.products = data.data;
          // console.log(data,"fromhomes");
        }
      });
    }

  getSeverity(quantity: number) {
     if(quantity>220 ){
      return 'success' ;
     } else if (quantity>1) {
      return 'warning';
     } else {
      return 'danger';
     }
  }
  getNames (quantity:number) {
      let nameLength = this.getSeverity(quantity).toString();    
    if (nameLength == 'success')
       {
      return "High In Stock";
      
  }
   else if (nameLength == 'warning') 
    {
      return "Low In Stock";
      
  }
    else (nameLength == 'danger')
     {
      return "Out of Stock";
      
  }

}
}
