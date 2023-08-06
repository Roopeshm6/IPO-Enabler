import { Component ,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../auth.service';
import { RegisterService } from '../services/register.service';
import { Register } from '../models/register.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {
    id:'',
    firstname:'',
    lastname:'',
    email:''
  };
  user1:User = {
    id:'',
    firstname:'',
    lastname:'',
    email:''
  };
  users:User[] =[];
  registers:Register[]=[];

  constructor(private loginService:LoginService, private router:Router,private authservice:AuthService,private registerService:RegisterService)
  {

  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  login(loginForm: NgForm){
    if (loginForm.valid) {
      this.user.id='';
      // Perform login logic here, e.g., send login request to the server
      this.user.email = loginForm.form.value.email;
      console.log('Email:', this.user.email);
      //console.log(this.user.email);
      this.getAllUsers();
      this.users.forEach(x =>{
        if(x.email === this.user.email)
        {
          this.user.id = x.id,
          this.user.firstname = x.firstname,
          this.user.lastname = x.lastname
        }
        else{
          this.registers.forEach(x=>{
            if(x.email == this.user.email)
            {
              alert("Your Account is in progress. Admin will provide the access in 3 working days");
              this.router.navigate([`/login`]);
            }
          })
        }
        this.router.navigate([`/login`]);
      });
      this.getUserById(this.user.id);
    }
  }
  getAllUsers(): void {
    this.loginService.getAllUsers().subscribe(response => 
     {
        this.users = response
     }
    );
    this.registerService.getAllUsersinRegister().subscribe((res)=>{
      this.registers = res;
    })
  }
  getUserById(id:any):void{
    this.loginService.getUserRolebyId(id).subscribe(response =>
      {
        if(response.userId == this.user.id && response.userStatus == 1)
        {
          this.router.navigate([`/home/${this.user.id}`]);
        }
        else{
          alert("Sorry! You do not have the access");
          this.router.navigate([`/login`]);
        }
      }
      );
  }
}
