import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit, OnDestroy{

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {}

  signIn(): void {
    this.router.navigate(['/login']);
  }

  signUp(): void {
    this.router.navigate(['/createAccount']);
  }
}
