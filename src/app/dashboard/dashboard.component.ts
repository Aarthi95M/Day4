import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,RouterModule,FormsModule],
  providers:[ProjectService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  projects: any[] = [];
  filteredProjects: any[] | undefined;
  searchQuery: string = '';
  constructor(private projectService: ProjectService, private modalService: NgbModal, private router :Router) {}

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.filteredProjects = this.projects;
  }

  deleteProject(index: number) {
    this.projectService.deleteProject(index);
    this.projects = this.projectService.getProjects();
  }

  editProject(index: number) {
    const modalRef = this.modalService.open(ProjectModalComponent);
    modalRef.componentInstance.project = { ...this.projects[index] };
    modalRef.componentInstance.isNew = false;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.projectService.updateProject(index, result);
          this.projects = this.projectService.getProjects();
        }
      },
      (reason) => {
        // Handle dismiss reason if necessary
      }
    );
  }

  addProject() {
    const modalRef = this.modalService.open(ProjectModalComponent);
    modalRef.componentInstance.project = {};
    modalRef.componentInstance.isNew = true;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.projectService.addProject(result);
          this.projects = this.projectService.getProjects();
        }
      },
      (reason) => {
        // Handle dismiss reason if necessary
      }
    );
  }

  
viewDetails(project: any) {
  // Navigate to the details route with the project id as a parameter
  this.router.navigate(['/details', project.projectName]);
}


searchProjects() {
  this.filteredProjects = this.projects.filter(project =>
    project.projectName.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

resetSearch() {
  this.searchQuery = '';
  this.filteredProjects = this.projects;
}
}
