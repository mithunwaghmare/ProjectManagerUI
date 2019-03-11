import { TestBed,getTestBed  } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from  '@angular/common/http/testing';
import { TaskService } from './task.service';
import{HttpClientModule, HttpErrorResponse} from '@angular/common/http'
import { Task } from '../model/task';
import { environment } from '../../environments/environment';
describe('TaskService', () => {
  let injector: TestBed;
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    injector = getTestBed();
    service = injector.get(TaskService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('should return all task',()=>{
    const tsklst=[
      {Task_ID:1,Project_ID:1,Parent_ID:1,TaskName:"TaskName1",IsParentTask:true,Priority:5,StartDate:new Date(),EndDate:new Date(),User_ID:1,ParentTaskName:"ParentTaskName1",UserName:"FirstName1",ProjectName:"TestProject1"},
      {Task_ID:2,Project_ID:2,Parent_ID:1,TaskName:"TaskName2",IsParentTask:true,Priority:10,StartDate:new Date(),EndDate:new Date(),User_ID:1,ParentTaskName:"ParentTaskName1",UserName:"FirstName1",ProjectName:"TestProject1"}
     ];
     service.getTasks().subscribe(tasks=>{
       expect(tasks.length).toBe(2);
       expect(tasks).toEqual(tsklst);
     })
     const req = httpMock.expectOne(`${environment.taskUrl}/GetAllTask`);
     expect(req.request.method).toBe("GET");
     expect(req.request.responseType).toEqual('json');
     req.flush(tsklst);
     httpMock.verify();
   });
   it('should return all paretentask',()=>{
    const tsklst=[
      {Parent_ID:1,ParentTaskName:"ParentTaskName1"},
      {Parent_ID:2,ParentTaskName:"ParentTaskName2"}
     ];
     service.getParentTasks(1).subscribe(tasks=>{
       expect(tasks.length).toBe(2);
       expect(tasks).toEqual(tsklst);
     })
     const req = httpMock.expectOne(`${environment.taskUrl}/GetAllParentTask/1`);
     expect(req.request.method).toBe("GET");
     expect(req.request.responseType).toEqual('json');
     req.flush(tsklst);
     httpMock.verify();
   });
   
   it("should return task", () => {
    const tsklst=[
      {Task_ID:1,Project_ID:1,Parent_ID:1,TaskName:"TaskName1",IsParentTask:true,Priority:5,StartDate:new Date(),EndDate:new Date(),User_ID:1,ParentTaskName:"ParentTaskName1",UserName:"FirstName1",ProjectName:"TestProject1"},
      {Task_ID:2,Project_ID:2,Parent_ID:1,TaskName:"TaskName2",IsParentTask:true,Priority:10,StartDate:new Date(),EndDate:new Date(),User_ID:1,ParentTaskName:"ParentTaskName1",UserName:"FirstName1",ProjectName:"TestProject1"}
     ];
     service.getTasks().subscribe(tasks=>{
      service.getTask(1).subscribe(task=>{
        expect(task.Task_ID).toEqual(1);
      });
     })
     const req = httpMock.expectOne(`${environment.taskUrl}/GetAllTask`);
     expect(req.request.method).toBe("GET");
     expect(req.request.responseType).toEqual('json');
     req.flush(tsklst);
  });
  it("should save task", () => {
    const task={Task_ID:1,Project_ID:1,Parent_ID:1,TaskName:"TaskName1",IsParentTask:true,Priority:5,StartDate:new Date(),EndDate:new Date(),User_ID:1,ParentTaskName:"ParentTaskName1",UserName:"FirstName1",ProjectName:"TestProject1"};
     service.Post(task).subscribe(response=>{
      expect(response).toEqual("Task added successfully");
     })
     const req = httpMock.expectOne(`${environment.taskUrl}/AddTask`);
     expect(req.request.method).toBe("POST");
     expect(req.request.responseType).toEqual('json');
     req.flush("Task added successfully");
     httpMock.verify();
  });
  it("should update task", () => {
    const task={Task_ID:1,Project_ID:1,Parent_ID:1,TaskName:"TaskName1",IsParentTask:true,Priority:5,StartDate:new Date(),EndDate:new Date(),User_ID:1,ParentTaskName:"ParentTaskName1",UserName:"FirstName1",ProjectName:"TestProject1"};
     service.Put(task).subscribe(response=>{
      expect(response).toEqual("Task updated successfully");
     })
     const req = httpMock.expectOne(`${environment.taskUrl}/UpdateTask`);
     expect(req.request.method).toBe("POST");
     expect(req.request.responseType).toEqual('json');
     req.flush("Task updated successfully");
     httpMock.verify();
  });
 


});
