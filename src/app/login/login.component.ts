import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  users:any;
  constructor(private http:HttpClient, private authService: AuthServiceService,private router: Router ){
  }
role='';
  User={
    email:'',
    password:''
  }
  
  ngOnInit(): void {
      this.http.get('http://localhost:8000/users').subscribe((data)=>{
      
      this.users =data;
      console.log(this.users);
   });
  }
  onSubmit()
  {
    // console.log(this.User);
    // for (const user of this.users) {
    //   if (user.email == this.User.email && user.password == this.User.password) {
    //     console.log(user.role);
    //     this.role = user.role;
    //     return user.role; 
        
    //   }
    //   else{
    //     alert('Invalid User');
    //     return null;
    //   }
    // }
    
    const isAuthenticated = this.authService.login(this.User.email, this.User.password);
    if (isAuthenticated) {
      // Navigate to a different page, e.g., dashboard
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid Credentials');
    }

  }

  getRole(): string | null {
    return this.role;
  }
}

