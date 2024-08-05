import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(product: Product[], search: string): Product[] {
    return product.filter(product=>product.title.toLowerCase().includes(search.toLowerCase()));
  }

}
