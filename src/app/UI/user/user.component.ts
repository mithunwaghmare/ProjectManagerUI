import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  


  constructor(private userService: UserService,private formBuilder: FormBuilder) { 
   
  }
  public user: User;
  public users:User[];
  public submitErr:string;
  public submitStatus:string;
  public buttoncaption:string
  public sortBy:string;
  public term:string;

  ngOnInit() {
    this.buttoncaption = "Add";
    this.userService.getUsers().subscribe(userlist => {
      this.users = userlist;
     })


    this.user = new User();
  
  }
SortById()
{
  this.sortBy = "EmployeeId";
  console.log(this.sortBy);
}
SortByFirstName()
{
  this.sortBy = "FirstName";
}
SortByLastName()
{
  this.sortBy = "LastName";
}
  AddUpdateUser() {
    if(this.buttoncaption == "Add")
    {
      this.userService.Post(this.user).subscribe(response => this.submitStatus=response.toString(), err => {
        this.submitErr =err.ExceptionMessage;
       

        this.Refresh();
      }, () => this.Refresh());
    }
    else{
      this.userService.Put(this.user).subscribe(response => this.submitStatus=response.toString(), err => {
        this.submitErr =err.ExceptionMessage;
       
        this.Refresh();
       
      }, () => this.Refresh());
    }
   
  }
  Refresh()
  {
    this.userService.getUsers().subscribe(userlist => {
      this.users = userlist;
       
     })
  }

  Reset()
  {
    this.Refresh();
    this.buttoncaption = "Add";
  }
  DeleteUser(employeeId:number)
  {
    this.userService.Delete(employeeId).subscribe(response => this.submitStatus=response.toString(), err => {
      this.submitErr =err.ExceptionMessage;
      
    }, () => this.Refresh());
  }

  EditUser(employeeId:number) {
    
    this.user = Object.create(this.users.filter(u => u.Employee_ID == employeeId)[0]);
    this.user = this.users.filter(u => u.Employee_ID == employeeId)[0];
    this.buttoncaption = "Update";
    }
    
    
}
