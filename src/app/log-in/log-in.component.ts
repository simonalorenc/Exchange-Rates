import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  logInForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.initializeForm();
  }

  private initializeForm() {
    this.logInForm = this.fb.group({
      'e-mail': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    })
  }

  onSubmit(): void {
    if (this.logInForm.valid) {
      console.log(this.logInForm.value);
      this.logInForm.reset();
    } else {
      this.logInForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

}
