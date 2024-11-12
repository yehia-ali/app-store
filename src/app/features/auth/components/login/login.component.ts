import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../../../core/services/i18n.service';
import { ToasterService } from '../../../../shared/services/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private i18nService = inject(I18nService);
  private toasterService = inject(ToasterService);

  username = signal('');
  password = signal('');
  isLoggedIn = signal(false);
  selectedLanguage = this.i18nService.getCurrentLang(); 
  login() {
    if (this.authService.login(this.username(), this.password())) {
      this.isLoggedIn.set(true);
      const route = this.authService.getRole() === 'admin' ? '/admin' : '/user';
      this.router.navigate([route]);
    } else {
      this.toasterService.show('Invalid credentials!', 'Dismiss', 4000, 'toast-error');

    }
  }
  changeLanguage(lang: any): void {
    this.i18nService.changeLanguage(lang); 
    this.selectedLanguage.set(lang); 
  }

}
