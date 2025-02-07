import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((newToken: any) => {
              request = request.clone({
                setHeaders: { Authorization: `Bearer ${newToken.accessToken}` }
              });
              return next.handle(request);
            }),
            catchError(() => {
              this.authService.logout();
              this.showSnackbar('Session expired, please log in again.');
              return of(error);
            })
          );
        }

        if (error.status === 403) {
          this.showSnackbar("❌ You don't have access to this resource.");
        }

        return of(error);
      })
    );
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar']
    });
  }
}
