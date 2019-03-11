import { Task } from "../../Model/task"
import { User } from "../../Model/user"
import { Project } from "../../Model/project"
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { Route } from "../../../../node_modules/@angular/compiler/src/core";
import { DatePipe } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { ProjectService } from '../../Services/project.service'
import { NgxSmartModalService } from 'ngx-smart-modal';
import {ParentTask} from '../../Model/parenttask';

@Component({
  selector: 'app-update-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  public task:Task;
  public parenttask:ParentTask[];
  public projects: Project[];
  public selectedPjt:Project;
  public parents:Task[];
  public selectedPar:ParentTask;
  public users:User[];
  public selectedUsr: User;
  public projectValidation:boolean;
  public dateValidation:boolean;
  public submitStatus : string;
  public term:string;
  navigated = false; // true if navigated here
  buttonCaption: string;
  constructor(private taskService: TaskService, private projectService: ProjectService, private userService: UserService,
    private route: ActivatedRoute, private modalService: NgxSmartModalService, private router: Router) {
         this.task=new Task();
         this.task.Priority = 0;
          this.task.StartDate = new Date();
          var curDate = new Date();
          curDate.setDate(curDate.getDate() + 1);
          this.task.EndDate = curDate;
         
          
  }
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.buttonCaption = "Update";
        this.taskService.getTask(id).subscribe(task => {
          this.task = task;
        })
      } else {
       
        
        this.navigated = false;
        this.buttonCaption = "Add";
        this.task.IsParentTask = true;
      }
    });

  }
  AddUpdate() {
    if(this.task.Project_ID === undefined)
    {
      this.projectValidation=true;
      return;
    }
    if(this.task.IsParentTask)
    {
      this.task.StartDate=null;
      this.task.EndDate=null;
      this.task.Priority=null;
    }
    let StartDate = new Date(this.task.StartDate);
    let EndDate = new Date(this.task.EndDate);
    console.log(EndDate);
    console.log(this.task.EndDate);

    if((this.task.EndDate!=null) && (EndDate < StartDate))
    {
      this.dateValidation=true;
      return;
    }

    this.taskService.Save(this.task).subscribe(response => this.Cancel(), err => console.log(err));
    
  }

  Cancel() {
    //this.submitStatus=response.toString()
    if(this.navigated =true)
    {
      const url = '../../';
      this.router.navigate([url]);
    }
    else{
      const url = '../';
      this.router.navigate([url]);
    }   
  }


  SearchProject() {
    this.modalService.getModal('pjtModal').open();
    this.projectService.getProjects().subscribe(projectlist => {
      this.projects = projectlist.filter(t => t.IsSuspended ===false);

    })
  }

  ClickPjt(event, newPjt) {
    this.selectedPjt = newPjt;
  }
  SelectProject() {
    this.modalService.getModal('pjtModal').close();
    this.task.Project_ID = this.selectedPjt.Project_ID;
    this.task.ProjectName = this.selectedPjt.ProjectName;
    
  }
  SearchParent() {
    this.modalService.getModal('parModal').open();
    //this.taskService.getTasks().subscribe(tasklist => {
      //this.parents = tasklist.filter(task => task.IsParentTask)

    //})
    this.taskService.getParentTasks(this.task.Project_ID).subscribe(task => {
      this.parenttask = task;
    })

  }
  ClickPar(event, newPar) {
    this.selectedPar = newPar;
  }
  SelectParent() {
    this.modalService.getModal('parModal').close();
    this.task.Parent_ID = this.selectedPar.Parent_ID;
    this.task.ParentTaskName = this.selectedPar.ParentTaskName;
  }
  SearchUser() {
    this.modalService.getModal('usrModal').open();
    this.userService.getUsers().subscribe(userlist => {
      this.users = userlist;
    })
  }
  ClickUsr(event, newUsr) {
    this.selectedUsr = newUsr;
  }
  SelectUser() {
    this.modalService.getModal('usrModal').close();
    this.task.User_ID = this.selectedUsr.Employee_ID;
    this.task.UserName = this.selectedUsr.FirstName + " " + this.selectedUsr.LastName;

  }

}