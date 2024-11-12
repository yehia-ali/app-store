import { Component, inject } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 
import { I18nService } from '../../../core/services/i18n.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslateModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private i18nService = inject(I18nService);
  selectedLanguage = this.i18nService.getCurrentLang(); 

  ngOnInit(): void {
  }

  changeLanguage(event: any): void {
    this.i18nService.changeLanguage(event.value); 
    this.selectedLanguage.set(event.value); 
  }

  // Logout method to log out the user
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

}
