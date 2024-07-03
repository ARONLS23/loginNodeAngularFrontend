import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  listProduct: Product[] = [];
  //Tabla
  displayedColumns = ['name', 'description'];
  dataSource = new MatTableDataSource<Product>();
  //Ordenamiento
  @ViewChild(MatSort) ordenamiento?: MatSort;
  //Paginador
  @ViewChild(MatPaginator) paginador?: MatPaginator;

  constructor(private _productService: ProductService, private router: Router) {}
  //Filtros
  buscar(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.dataSource.filter = inputElement.value.trim().toLowerCase();
  }

  ngOnInit() {
    this.getProducts();
  }

  //Paginacion y ordenamiento
  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento ?? null;
    this.dataSource.paginator = this.paginador ?? null;
  }

  getProducts() {
    this._productService.getProducts().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

}
