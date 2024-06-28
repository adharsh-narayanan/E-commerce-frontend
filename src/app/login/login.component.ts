import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatashareService } from '../service/datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private api: DatashareService,private router:Router) {
  }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]
  })
  login() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value
      console.log(user);
      
      this.api.loginApi(user).subscribe({
        next: (res: any) => {
          console.log(res);
          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)
          alert('Login Successfull')
          this.router.navigateByUrl("")


        },
        error: (err: any) => {
          console.log(err);
        }
      })


    } else {
      alert('invalid form')
    }

  }


}
