import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from '../app/UI/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {OrderModule} from 'ngx-order-pipe';
import { ProjectComponent } from '../app/UI/project/project.component';
import {AddTaskComponent} from '../app/UI/add-task/add-task.component'
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ViewTaskComponent} from '../app/UI/view-task/view-task.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    AddTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OrderModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
