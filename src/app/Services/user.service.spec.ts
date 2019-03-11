import { TestBed,getTestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from  '@angular/common/http/testing';
import { UserService } from './user.service';
import{HttpClientModule, HttpErrorResponse, HttpClient} from '@angular/common/http'
import { User } from '../model/user';
import { environment } from '../../environments/environment';
describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;
  
  
  
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });
  
  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should return all users',()=>{
   const userlst=[
     {User_ID:1,Employee_ID:1,FirstName:"FirstName1",LastName:"LastName1"},
     {User_ID:2,Employee_ID:2,FirstName:"FirstName2",LastName:"LastName2"},
    ];
    service.getUsers().subscribe(users=>{
      expect(users.length).toBe(2);
      expect(users).toEqual(userlst);
    })
    const req = httpMock.expectOne(`${environment.userUrl}/GetAllUsers`);
    expect(req.request.method).toBe("GET");
    expect(req.request.responseType).toEqual('json');
    req.flush(userlst);
    httpMock.verify();
  });
  it('should save user',()=>{
    const user={User_ID:1,Employee_ID:1,FirstName:"FirstName1",LastName:"LastName1"};
     service.Post(user).subscribe(response=>{
      expect(response).toEqual("User added successfully");
     })
     const req = httpMock.expectOne(`${environment.userUrl}/AddUser`);
     expect(req.request.method).toBe("POST");
     expect(req.request.responseType).toEqual('json');
     req.flush("User added successfully");
     httpMock.verify();
   });
   it('should update user',()=>{
    const user={User_ID:1,Employee_ID:1,FirstName:"FirstName1",LastName:"LastName1"};
     service.Put(user).subscribe(response=>{
      expect(response).toEqual("User updated successfully");
     })
     const req = httpMock.expectOne(`${environment.userUrl}/UpdateUser`);
     expect(req.request.method).toBe("POST");
     expect(req.request.responseType).toEqual('json');
     req.flush("User updated successfully");
     httpMock.verify();
   });
   it('should delete user',()=>{
    const user={User_ID:1,Employee_ID:1,FirstName:"FirstName1",LastName:"LastName1"};
     service.Delete(user.User_ID).subscribe(response=>{
      expect(response).toEqual("User deleted successfully");
     })
     const req = httpMock.expectOne(`${environment.userUrl+'/DeleteUser'}/${user.User_ID}`);
     expect(req.request.method).toBe("DELETE");
     expect(req.request.responseType).toEqual('json');
     req.flush("User deleted successfully");
     httpMock.verify();
   });



});