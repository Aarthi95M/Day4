import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthServiceService } from '../auth-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule,LoginComponent,NgIf],
  providers:[LoginComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
//   role='';
// constructor(public r : LoginComponent){
// this.role = r.role
// console.log("Login role:" + this.role)
// }
role: string | null = null;
dashboardflag =false;
constructor(private authService: AuthServiceService) {}
ngOnInit(): void {
  this.authService.role$.subscribe(role => {
    this.role = role;
    if(this.role =='admin'){
      this.dashboardflag = true;
      console.log("Role access"+this.role)
    }
    
  });
}

logout() {
  this.authService.logout();
  this.role = '';
  this.dashboardflag=false;
  this.ngOnInit();
}
}
