import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [{path:'',component:LoginComponent}
 ,{path:'dashboard', component:DashboardComponent},
 { path: 'details/:project', component: DetailsComponent }
//  , {path:'login',component:LoginComponent}
];
