import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IPO Enabler';
  isMenuVisible=false;
  constructor(private http:HttpClient,private router:Router)
  {
    
  }
  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/' ; // Replace with your actual login page URL
  }

  downloadPdf():void{
    const url = 'assets/IPOEnabler.pdf';
    window.open(url,'_blank');
  }
  openContact():void{
    this.router.navigate([`/contact`]);
  }
  displayUsers():void{
    this.router.navigate([`/contact`]);
  }
}
