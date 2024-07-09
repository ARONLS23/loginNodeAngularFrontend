import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor (private router: Router) {}

  onProductsClick() {
    window.location.href = '/dashboard';
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
