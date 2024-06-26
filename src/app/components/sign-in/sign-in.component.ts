import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, private _userService: UserService, 
    private router: Router, private _errorService: ErrorService) { }

  addUser() {
    //Validamos que el usuario ingrese valores

    if (this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error!');
      return;
    }

    //Validamos que las password sean iguales
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error!');
      return;
    }

    //Creamos el body

    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, `Usuario registrado!`);
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      },
      complete: () => console.info('complete')
    })

    /* this._userService.signIn(user).subscribe(data => {
      this.loading=false;
      this.toastr.success(`El usuario ${this.username} fue registrado con exito`, `Usuario registrado!`); 
      this.router.navigate(['/login']);
    }, (event: HttpErrorResponse)=>{
      this.loading=false;
      if (event.error.msg) {
        this.toastr.error(event.error.msg, 'Error');
      }else{
        this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
      }
    }) */
  }

  /* msjError(e: HttpErrorResponse){
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
    }
  } */

}
