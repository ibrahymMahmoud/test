import { Component, OnInit } from '@angular/core';
import { AuthenticatioService } from '../authenticatio.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private _authenticationService:AuthenticatioService){}
  ngOnInit(): void {
    
  }

}
