import { Component, input, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AuthapiService } from '../../services/authapi.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {


}
