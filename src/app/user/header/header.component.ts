import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth = false

  constructor(
    private _service: UserService,
    private _toastr: ToastrService,
    private _router: Router,
    private _authService: SocialAuthService,
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('userToken')
    if (token) this.isAuth = true
  }

  logout() {
    this._service.logout().subscribe(() => {
      this._authService.signOut();
      localStorage.removeItem('userToken')
      this._router.navigate(['/login'])
    }, (err) => {
      this._toastr.error('Failed to logout')
    })
  }
}
