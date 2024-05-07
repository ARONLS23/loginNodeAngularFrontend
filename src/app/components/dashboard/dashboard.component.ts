import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  listProduct: Product[] = [];

  constructor (private _productService: ProductService) { }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts().subscribe( data => {
      this.listProduct = data;
    })
  }

}
