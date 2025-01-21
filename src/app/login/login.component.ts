import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  show: Boolean = true;
  inputType: string = "password";
  idRoom: string | null = null;

  constructor(
    private navgate: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navgate.queryParams.subscribe(params => {
      this.idRoom = params['idroom'] || null;
      console.log('idRoom:', this.idRoom);
    });
    this.initializeGoogleButton();
  }

  creatAccount() {
    const link = this.idRoom ? `CreateAccount?idroom=${this.idRoom}` : 'CreateAccount';
    this.router.navigate([`/${link}`]);
  }

  showPassword() {
    if(!this.show) {
        this.inputType = "text";
        this.show = true
    } else {
        this.inputType = "password";
        this.show = false;
    }
  }
  passwordRecovery () {
    
  }

  handleCredentialResponse(response: any): void {
    try {
      const data: any = jwtDecode(response.credential);

      if (!data) {
        this.errorMessage("Ocorreu um erro na API!");
        return;
      }
      const password = data.sub + "Google";
      let body = {
        Name: data.name,
        Email: data.email,
        Password: password
      };

      if (data.name.length < 16) {
        this.continueWithGoogle(body);
      } else {
        body.Name = data.given_name;
        this.continueWithGoogle(body);
      }
    }catch (error) {
      console.error('Erro ao decodificar o token:', error);
      this.errorMessage("Erro ao processar os dados do Google!");
    }
  }

  initializeGoogleButton(): void {
    const googleSDK = (window as any).google;

    if (!googleSDK || !googleSDK.accounts || !googleSDK.accounts.id) {
      console.error('Google Identity Services SDK não está disponível.');
      return;
    }

    googleSDK.accounts.id.initialize({
      client_id: "745509205468-12llooertqv2a7ht7cipi09si4b53m1g.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    googleSDK.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        type: "standard",
        shape: "pill",
        theme: "outline",
        text: "continue_with",
        size: "large",
        locale: "en-US",
        logo_alignment: "left"
      }
    );

    (window as any).google.accounts.id.prompt();
  }

  errorMessage(message: string): void {
    console.log(message);
  }

  continueWithGoogle(body: any): void {
    console.log('Usuário autenticado com sucesso:', body);
  }
}
