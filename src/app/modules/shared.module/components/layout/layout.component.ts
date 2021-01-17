import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd && event.url.includes("/login")){
        this.isLoggedIn = false;
      }else if(event instanceof NavigationEnd){
        this.isLoggedIn = true;
      }

    });
  }

}
