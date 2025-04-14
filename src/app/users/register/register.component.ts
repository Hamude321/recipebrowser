import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports:[CommonModule, ReactiveFormsModule, FormsModule, IonButton]
})
export class RegisterComponent  implements OnInit {
  ngOnInit() {}

  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, username, password } = this.registerForm.value;

    this.authService.register(email, username, password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => this.errorMessage = err.message 
    });
  }

}
