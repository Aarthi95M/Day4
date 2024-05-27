import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,DashboardComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  projectId = ''; // Define a property to store the project id
  project :any;
  constructor(private route: ActivatedRoute, private projectService : ProjectService) { }

  ngOnInit(): void {
    // Retrieve the project id from the route parameters
    this.route.params.subscribe(params => {
      this.projectId = params['project'];
      this.project = this.projectService.getProjectByName(this.projectId);
      console.log(this.projectId);
      console.log(this.project);
    });
    
  }
  
    
      
}
