import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../footer/footer.component';
import { AuthapiService } from '../../services/authapi.service';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import { CartitemsService } from '../../services/cartitems.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FooterComponent,
    CommonModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  hidden = false;
  numOfCartItems: number = 0;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  isLogin: boolean = false;
  constructor(private auth: AuthapiService , private cart:CartitemsService) {
    this.auth.UserToken.subscribe({
      next: () => {
        console.log(this.auth.UserToken.getValue(), 'helloTOOLBAR');
        if (this.auth.UserToken.getValue()) {
          this.isLogin = true
        }else{
          this.isLogin= false
        }
      },
    });

    this.cart.numOfCartItems.subscribe({
      next: (response) => {
        this.numOfCartItems = response;
        console.log(response,"fromnavbar numbofcart");
      },
      
    })
    this.numOfCartItems
    // console.log(parent.innerHeight)
  }
  singOut(){
    this.auth.signOut()
  }
  
}
