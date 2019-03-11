import { AppRoutingModule,routes } from './app-routing.module';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Component, NgModule } from '@angular/core';
import { TestBed,fakeAsync, tick } from '@angular/core/testing';
import { Routes,Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserComponent } from '../app/UI/user/user.component';
import { ProjectComponent } from '../app/UI/project/project.component';
import {AddTaskComponent} from '../app/UI/add-task/add-task.component'
import {ViewTaskComponent} from '../app/UI/view-task/view-task.component';
import {Location} from "@angular/common";
import {FormsModule} from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {UserService} from '../app/Services/user.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)     
      ,FormsModule,Ng2SearchPipeModule,NgxSmartModalModule,HttpClientModule,HttpModule],
      declarations: [ 
        AppComponent,
        UserComponent,
        ProjectComponent,
        AddTaskComponent,
        ViewTaskComponent,
        OrderPipe
        
      ],
      providers:[NgxSmartModalService,UserService,HttpClient,FormBuilder]
    });
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 

    fixture = TestBed.createComponent(AppComponent); 
    fixture.detectChanges();

    router.navigate(['/'])
        .then(() => {
          expect(router.url).toEqual('/');
        });
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });

  it('navigate to "" redirects you to /ViewTask', fakeAsync(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe(''); 
  }));
  it('navigate to "/ViewTask" redirects you to /ViewTask', fakeAsync(() => { 
    router.navigate(['/viewtask'])
        .then(() => {
          expect(router.url).toEqual('/viewtask');
        });
    
  }));
  it('navigate to "/project" redirects you to /project', fakeAsync(() => { 
    router.navigate(['/project'])
        .then(() => {
          expect(router.url).toEqual('/project');
        });
    
  }));
  it('navigate to "/user" redirects you to /user', fakeAsync(() => { 
    router.navigate(['/user'])
        .then(() => {
          expect(router.url).toEqual('/user');
        });
    
  }));
  it('navigate to "/addtask" redirects you to /addtask', fakeAsync(() => { 
    router.navigate(['/addtask'])
        .then(() => {
          expect(router.url).toEqual('/addtask');
        });
    
  }));

});
