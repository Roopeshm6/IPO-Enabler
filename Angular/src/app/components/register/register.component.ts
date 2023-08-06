import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register:Register={
    id:'',
    firstName: '',
    lastName: '',
    email: ''
  }
  constructor(private registerService:RegisterService, private router:Router){

  }
  login(regitserForm:NgForm)
  {
    this.register.email = regitserForm.form.value.email;
    this.register.firstName = regitserForm.form.value.firstName;
    this.register.lastName = regitserForm.form.value.lastName;
    this.registerService.needToAddUsers(this.register).subscribe((res)=>{
      alert("Send the request to the admin. Admin will provide the access in 3 working days");
      this.router.navigate([`/login`]);
    })
  }
}
