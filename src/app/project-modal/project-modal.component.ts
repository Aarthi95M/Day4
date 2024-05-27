import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent implements OnInit {
  @Input() project: any = {};
  @Input() isNew: boolean = true;

  constructor(public activeModal: NgbActiveModal) {
   
  }
  ngOnInit() {
    // Initialize teamMembers array with one empty entry if it's empty and it's a new project
    if (this.isNew && (!this.project.teamMembers || this.project.teamMembers.length === 0)) {
      this.project.teamMembers = [{ name: '', role: '' }];
    }
    if (this.isNew && (!this.project.milestones || this.project.milestones.length === 0)) {
      this.project.milestones = [{ completedTasks: '', overallProgressPercentage: 0 }];
    }
  }
  onSave() {
    this.activeModal.close(this.project);
  }

  onCancel() {
    this.activeModal.dismiss();
  }
  addTeamMember() {
    this.project.teamMembers.push({ name: '', role: '' });
  }

  removeTeamMember(index: number) {
    this.project.teamMembers.splice(index, 1);
  }

  addMilestone() {
    this.project.milestones.push({ completedTasks: '', overallProgressPercentage: 0 });
  }

  removeMilestone(index: number) {
    this.project.milestones.splice(index, 1);
  }
}
