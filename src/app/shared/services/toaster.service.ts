import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private snackBar = inject(MatSnackBar);

  show(message: string, action: string = 'Close', duration: number = 3000, type: string = 'toast-info'): void {
    debugger
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [type]
    });
  }

}
