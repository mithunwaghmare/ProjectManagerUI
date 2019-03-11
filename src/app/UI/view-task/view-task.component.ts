import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatePipe} from '@angular/common';
import { Project } from "../../Model/project"
import {Task} from '../../model/task';
import {TaskService} from '../../Services/task.service';
import { ProjectService } from '../../Services/project.service'
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private dal:TaskService , private router: Router,private projectService: ProjectService,private modalService: NgxSmartModalService) { }
  
public tasks:Task[];
public withoutfiltertasks:Task[];
public sortBy:string;
public term:string;
public projects: Project[];
public selectedPjt:Project;
public selectedProjectName:string;
public EditTask(TaskId:number):void{
  const link = '../edit/'+ TaskId;
  this.router.navigate([link]);
}
public EndTask(task:Task):void{
 task.EndDate= new Date();
 this.dal.Save(task).subscribe(response => console.log(response), err => console.log(err));
 this.tasks = this.tasks.filter(t => t.Task_ID !== task.Task_ID);
}
  ngOnInit() { 
       this.dal.getTasks().subscribe(task => {
         this.tasks = task;
         this.withoutfiltertasks=task;
        }
        );
  }
  SortByStartDate()
  {
    this.sortBy = "StartDate";
  }
  SortByEndDate()
{
  this.sortBy = "EndDate";
}
SortByPriority()
{
  this.sortBy = "Priority";
}
SortByCompleted()
{
  this.sortBy = "IsCompleted";
}
Reset(){
  this.tasks=this.withoutfiltertasks;
}

SearchProject() {
  this.modalService.getModal('pjtModal').open();
  this.projectService.getProjects().subscribe(projectlist => {
  this.projects = projectlist;
  this.projects=projectlist.filter(t => t.IsSuspended ===false);
  })
}

ClickPjt(event, newPjt) {
  this.selectedPjt = newPjt;
}
SelectProject() {
  this.modalService.getModal('pjtModal').close();
  this.tasks=this.withoutfiltertasks;
  this.tasks = this.tasks.filter(t => t.Project_ID === this.selectedPjt.Project_ID);
  this.selectedProjectName=this.selectedPjt.ProjectName;
  
}
 
}

