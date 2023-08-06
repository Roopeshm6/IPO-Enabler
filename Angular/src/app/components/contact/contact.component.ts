import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact:Contact = {
    emailAddress:'',
    subject:'',
    message:''
  };
  userId :any='';
  userRoleId: any ='';
  displayUser:any;
  constructor(private contactService:ContactService,private router:Router,private route: ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.userRoleId = this.route.snapshot.params['userRoleId'];
    if(this.userRoleId == 'EA5FCA14-EDCF-458F-930C-C4301C94C360')
    {
      this.displayUser = true;
    }
    else if(this.userRoleId == 'E2475B90-606F-484E-8BDB-F15A4E29E73D')
    {
      this.displayUser = false;
    }
    else{
      this.displayUser = false;
    }
  }
  login(contactForm: NgForm){
    if (contactForm.valid) {
      // Perform login logic here, e.g., send login request to the server
     this.contact.emailAddress = contactForm.form.value.emailAddress;
     this.contact.subject = contactForm.form.value.subject;
     this.contact.message = contactForm.form.value.message;
     this.contactService.sendEmail(this.contact).subscribe((response) =>
      {
        console.log(response);
        alert("Mail send successfully");
      });
    }
  }
  downloadPdf():void{
    const url = 'assets/IPOEnabler.pdf';
    window.open(url,'_blank');
  }
  openContact():void{
    this.router.navigate([`/contact/${this.userId}/${this.userRoleId}`]);
  }
  displayUsers():void{
    this.router.navigate([`/users/${this.userId}/${this.userRoleId}`]);
  }
  Gotohome():void{
    this.router.navigate([`/home/${this.userId}`]);
  }
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoleId}`]);
  }
}
