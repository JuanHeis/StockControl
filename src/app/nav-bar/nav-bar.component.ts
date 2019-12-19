import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthServiceService) { }

  ngOnInit() {
  }
  signOut(){
    this.auth.signOut();
  }
}
