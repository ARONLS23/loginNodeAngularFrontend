import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, private router: Router, 
    private _userService: UserService, private _errorService: ErrorService) { }

  login(){
    //Validamos que el usuario ingrese datos
    if(this.username == '' || this.password == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error!');
      return
    }
    //Creamos el body
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) =>{
        this.router.navigate(['/dashboard']);
        //localStorage.setItem('token', token);
        localStorage.setItem('token', JSON.stringify(token));
        console.log(token);
      },
      error: (e: HttpErrorResponse)=>{
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }

  /* msjError(e: HttpErrorResponse){
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
    }
  } */
  

}
