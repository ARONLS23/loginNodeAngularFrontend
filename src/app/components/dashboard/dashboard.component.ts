import { Dialog } from '@angular/cdk/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { AgregarComponent } from './agregar-editar/agregar-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarComponent } from './eliminar/eliminar/eliminar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  listProduct: Product[] = [];
  //Tabla
  displayedColumns = ['name', 'description', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  //Ordenamiento
  @ViewChild(MatSort) ordenamiento?: MatSort;
  //Paginador
  @ViewChild(MatPaginator) paginador?: MatPaginator;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}
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
    this._productService.getListProducts().subscribe((data) => {
      //console.log(data);

      this.dataSource.data = data;
    });
  }

  eliminarDialog(productId: number){
    const dialogDelet = this.dialog.open(EliminarComponent,{
      width: '250px',
      data: {productId}
    });
    dialogDelet.afterClosed().subscribe(result => {
      this.getProducts();
    })
  }

  abrirDialog(operation: string, productId?: number): void {
    const dialogRef = this.dialog.open(AgregarComponent, {
      width: '550px',
      data: { operation, productId }
    });
    //console.log(operation, productId);

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    })
  }
}
