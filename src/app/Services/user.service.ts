import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../Model/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  taskUrl: string = 'assets/tasks.json';

  private refreshData() {
    this.getUsers();
  }
  public getUsers() {
    return this.http.get<User[]>(environment.userUrl+'/GetAllUsers')
      .pipe(map(data => {
        return data;
      }

      ), catchError(this.handleError));
  }
  public getUser(employeeId: number): Observable<User> {
    return this.getUsers().pipe(
      map(tasks => tasks.find(user => user.Employee_ID === employeeId))
    );
  }
  public Save(user: User) {
    if (user.Employee_ID) {
      this.Put(user);
    }
    else {
      this.Post(user);
    }
    return this.getUsers();
  }
  public Put(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var body = JSON.stringify(user);
    const url = `${environment.userUrl+'/UpdateUser'}`;
    return this.http
      .post(url, body, httpOptions)
      .pipe(catchError(this.handleError));

  }
// delete user
  public Delete(employeeId:number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${environment.userUrl+'/DeleteUser'}/${employeeId}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError));

  }
  // Add New Task
  public Post(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var body = JSON.stringify(user);

    return this.http
      .post(environment.userUrl+'/AddUser', body, httpOptions)
      .pipe(catchError(this.handleError));
  }

   

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
