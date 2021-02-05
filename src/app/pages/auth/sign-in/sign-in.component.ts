import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if (this.authService.validateLogin()) {
      this.router.navigate(['']);
    }
  }

  onLoginFormSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe(
        (res) => {
          if (res.user.role !== 'admin') {
            this.snackBar.open('Not Admin User', 'Error', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        },
        (err) => {
          this.snackBar.open(err.error.errors.message, 'Error', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  ngOnInit(): void {}
}
