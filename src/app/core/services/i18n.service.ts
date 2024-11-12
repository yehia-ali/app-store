import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translate = inject(TranslateService);
  currentLang = signal<string>('en'); // Default language is 'en'

  constructor() {
    this.translate.setDefaultLang(this.currentLang());
    this.translate.use(this.currentLang());
  }

  // Change the language by updating the currentLang signal and TranslateService
  changeLanguage(language: string) {
    this.currentLang.set(language);
    this.translate.use(language);
    this.updateDirection(language);

  }
  // Update the document direction based on the language
  updateDirection(language: string) {
    const htmlElement = document.documentElement;
    if (language === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
    }
  }
  // Get the current language signal
  getCurrentLang() {
    return this.currentLang;
  }
}
