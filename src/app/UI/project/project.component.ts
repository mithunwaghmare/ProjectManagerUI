import { Component, OnInit } from '@angular/core';
import {Project} from '../../Model/project';
import {ProjectService} from '../../Services/project.service';
import {User} from '../../model/user';
import {UserService} from '../../Services/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private userService: UserService, private modalService: NgxSmartModalService) { 
    this.project = new Project();
      this.project.StartDate = new Date();
      var curDate = new Date();
      curDate.setDate(curDate.getDate() + 1);
      this.project.EndDate = curDate;
  }
  public project: Project;
  public projects:Project[];
  public Allprojects:Project[];
  public submitErr:string;
  public buttoncaption:string
  public sortby:string;
  public users: User[];
  public setDate:boolean;
  public selectedUsr:User;
  public managerDetails:string;
  public term:string;
  public dateValidationMessage:string;
  public dateValidation:boolean;
  public managerValidation:boolean;
  public submitStatus:string;
  public showOpenProject:boolean;
  
  ngOnInit() {
    this.buttoncaption = "Add";
    this.projectService.getProjects().subscribe(projectlist => {
      this.Allprojects = projectlist;
      this.showOpenProject=false;
      this.projects = projectlist.filter(t => t.IsSuspended ===false);
      

     })
  
  }
SortByStartDate()
{
  this.sortby = "StartDate";
}
SortByEndDate()
{
  this.sortby = "EndDate";
}
SortByPriority()
{
  this.sortby = "Priority";
}
SortByCompleted()
{
  this.sortby = "IsSuspended";
}
GetCompletedProject()
{
  this.showOpenProject=true;
  this.projects=this.Allprojects;
  this.projects = this.projects.filter(t => t.IsSuspended ===true);
}
GetOpenProject()
{
  this.showOpenProject=false;
  this.projects=this.Allprojects;
  this.projects = this.projects.filter(t => t.IsSuspended ===false);
}
Refresh()
{
  
      
  this.projectService.getProjects().subscribe(projectlist => {
    this.Allprojects = projectlist;
    this.projects = projectlist.filter(t => t.IsSuspended ===false);
   })
}
  AddUpdateProject() {
    
    this.managerValidation=false;
    let StartDate = new Date(this.project.StartDate);
    let EndDate = new Date(this.project.EndDate);
    
    
    if(this.project.ManagerID === undefined)
    {
      
      this.managerValidation=true;
      return;
    }
    if((this.project.EndDate!=null) &&(EndDate < StartDate))
    {
      this.dateValidation=true;
      return;
    }
    this.dateValidationMessage="";
    this.dateValidation=false;
    if(this.buttoncaption == "Add")
    {

      this.projectService.Post(this.project).subscribe(response => this.submitStatus=response.toString(), err => {
        this.submitErr =err.ExceptionMessage;
        
      },() => this.Refresh());
    }
    else{
      this.projectService.Put(this.project).subscribe(response => this.submitStatus=response.toString(), err => {
        this.submitErr =err.ExceptionMessage;
       
      },() => this.Refresh());
    }
   
  }
  Reset()
  {
    window.location.reload();
    this.project = new Project();
      this.project.StartDate = new Date();
      var curDate = new Date();
      curDate.setDate(curDate.getDate() + 1);
      this.project.EndDate = curDate;
    this.Refresh();
    
    
     this.buttoncaption = "Add";
  }

  EditProject(ProjectId:number) {
    this.project = this.projects.filter(p => p.Project_ID == ProjectId)[0];
    this.buttoncaption = "Update";
    }
    SearchUser(){
      this.modalService.getModal('myModal').open();
      this.userService.getUsers().subscribe(userlist => {
        this.users = userlist;

       })
    }
    ListClick(event, newUsr){
      this.selectedUsr=newUsr;
    }
    SelectUser(){
      this.modalService.getModal('myModal').close();
      this.project.ManagerID = this.selectedUsr.Employee_ID;
      this.project.managerDetails = this.selectedUsr.Employee_ID.toString() + " - "+ this.selectedUsr.FirstName + " " + this.selectedUsr.LastName;

    }
    SuspendProject(pjt:Project)
    {
     
      pjt.IsSuspended=true;
      pjt.EndDate=new Date();
      this.projectService.Put(pjt).subscribe(response => console.log(response), err => {
      this.submitErr =err.ExceptionMessage;
     
      });
      this.projects = this.projects.filter(t => t.IsSuspended ===false);

    }
    
   
}
