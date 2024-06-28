import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatashareService } from '../service/datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //model driven data transfer
  constructor(private fb:FormBuilder,private api:DatashareService,private router:Router){}

  registerForm = this.fb.group({
    username:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm);
      let user =this.registerForm.value
      console.log(user);

      this.api.registerApi(user).subscribe({
        next: (res: any) => {
         console.log(res);    
         alert('Registration Successfull')
         this.router.navigateByUrl('/user/login')   
       

        
        },
        error: (err: any) => {
        console.log(err);
        
  
        }})
      
      
      

    }else{
      alert('invalid')
    }

  }

}
