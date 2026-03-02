import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  login = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    if (this.auth.login(this.login, this.password)) {
      this.router.navigate(['/track-selection']);
    } else {
      alert('Неверный логин или пароль');
    }
  }
}
