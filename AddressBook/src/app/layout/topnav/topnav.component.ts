import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api.service';
import { AuthService } from 'app/shared/service/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  user: any
  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
  logoutUser(){
    sessionStorage.removeItem("userData");
    this.user = {isAuthenticated: false}
    this.router.navigate(['./login']);

  }

}
