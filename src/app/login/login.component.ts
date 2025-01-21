import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  show: Boolean = true;
  inputType: string = "password";
  eyeButton: string = 'ph-eye-closed';
  
  constructor() {}

  showPassword() {
    if(!this.show) {
        this.inputType = "text";
        this.show = true
        this.eyeButton = 'ph-eye';
    } else {
        this.inputType = "password";
        this.show = false;
        this.eyeButton = 'ph-eye-closed';
    }
  }
  passwordRecovery () {
    
  }
}
