import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  id: number;
  constructor(private _productoService: ProductService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService) {
    this.id = this.data.productId;
   }

  ngOnInit() {
    this.getProduct(this.id);
  }

  getProduct(id: number) {
    this._productoService.getProduct(id).subscribe((data: Product) => {
      //console.log(data);
    });
  }

  eliminar(id: number){
    this._productoService.deleteProduct(id).subscribe(() =>{
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
      this.dialog.closeAll();
    });
  }

}
