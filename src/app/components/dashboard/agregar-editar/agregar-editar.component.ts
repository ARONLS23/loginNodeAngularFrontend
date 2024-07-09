import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.css'],
})
export class AgregarComponent implements OnInit {
  form: FormGroup;
  id: number;
  operacion: string = '';

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      fechaCreacion: ['', this.operacion === 'add' ? Validators.required : Validators.nullValidator]
    });
    this.id = this.data.productId;
    this.operacion = this.data.operation;
  }

  ngOnInit() {
    if (this.operacion ==='edit') {
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      //this.form.setValue(Todos los elementos)
      this.form.patchValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    });
  }

  guardarProducto() {
    const product: Product = {
      id: undefined,
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
      createdAt: this.form.value.fechaCreacion ? new Date(this.form.value.fechaCreacion).toISOString() : '',
      updatedAt: '',
    };

    console.log(product);


    if (this.operacion === 'edit') {
      //editar
      this._productService.updateProduct(this.id, product).subscribe(()=>{
        this.toastr.info(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
        this.dialog.closeAll();
      })
    }else{
      //agregar
      this._productService.saveProducts(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Producto registrado');
        this.dialog.closeAll();
      });
    }
  }
}
