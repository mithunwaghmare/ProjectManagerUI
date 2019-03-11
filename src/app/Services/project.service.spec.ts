import { TestBed,getTestBed } from '@angular/core/testing';
import {OrderPipe} from 'ngx-order-pipe';
import { ProjectService } from './project.service';
import{HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from  '@angular/common/http/testing';
import { environment } from '../../environments/environment';
describe('ProjectService', () => {
  let injector: TestBed;
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    injector = getTestBed();
    service = injector.get(ProjectService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
  
  it('should return all project',()=>{
    const prjlst=[
      {Project_ID:1,ProjectName:"Test Project 1",StartDate:new Date(),EndDate:new Date(),Priority:5,ManagerID:1,noofTasks:1,noofCompletedTasks:1,managerDetails:"FirstName1",IsSuspended:true},
      {Project_ID:2,ProjectName:"Test Project 2",StartDate:new Date(),EndDate:new Date(),Priority:5,ManagerID:1,noofTasks:1,noofCompletedTasks:1,managerDetails:"FirstName1",IsSuspended:true}
     ];
     service.getProjects().subscribe(projects=>{
       expect(projects.length).toBe(2);
       expect(projects).toEqual(prjlst);
     })
     const req = httpMock.expectOne(`${environment.projectUrl}/GetAllProject`);
     expect(req.request.method).toBe("GET");
     expect(req.request.responseType).toEqual('json');
     req.flush(prjlst);
     httpMock.verify();
   });
   it("should return project", () => {
    const prjlst=[
      {Project_ID:1,ProjectName:"Test Project 1",StartDate:new Date(),EndDate:new Date(),Priority:5,ManagerID:1,noofTasks:1,noofCompletedTasks:1,managerDetails:"FirstName1",IsSuspended:true},
      {Project_ID:2,ProjectName:"Test Project 2",StartDate:new Date(),EndDate:new Date(),Priority:5,ManagerID:1,noofTasks:1,noofCompletedTasks:1,managerDetails:"FirstName1",IsSuspended:true}
     ];
     service.getProjects().subscribe(projects=>{
      service.getProject(1).subscribe(project=>{
        expect(project.Project_ID).toEqual(1);
      });
     })
     const req = httpMock.expectOne(`${environment.projectUrl}/GetAllProject`);
     expect(req.request.method).toBe("GET");
     expect(req.request.responseType).toEqual('json');
     req.flush(prjlst);
  });
  it("should save project", () => {
    const project={Project_ID:1,ProjectName:"Test Project 1",StartDate:new Date(),EndDate:new Date(),Priority:5,ManagerID:1,noofTasks:1,noofCompletedTasks:1,managerDetails:"FirstName1",IsSuspended:true};
     service.Post(project).subscribe(response=>{
      expect(response).toEqual("Project added successfully.");
     })
     const req = httpMock.expectOne(`${environment.projectUrl}/AddProject`);
     expect(req.request.method).toBe("POST");
     expect(req.request.responseType).toEqual('json');
     req.flush("Project added successfully.");
     httpMock.verify();
  });
  it("should update project", () => {
    const project={Project_ID:1,ProjectName:"Test Project 1",StartDate:new Date(),EndDate:new Date(),Priority:5,ManagerID:1,noofTasks:1,noofCompletedTasks:1,managerDetails:"FirstName1",IsSuspended:true};
     service.Put(project).subscribe(response=>{
      expect(response).toEqual("Project updated successfully.");
     })
     const req = httpMock.expectOne(`${environment.projectUrl}/UpdateProject`);
     expect(req.request.method).toBe("POST");
     expect(req.request.responseType).toEqual('json');
     req.flush("Project updated successfully.");
     httpMock.verify();
  })




  
});
