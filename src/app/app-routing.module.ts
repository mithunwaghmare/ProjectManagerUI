import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from '../app/UI/user/user.component';
import {AppComponent} from './app.component';
import {ProjectComponent} from '../app/UI/project/project.component';
import {AddTaskComponent} from '../app/UI/add-task/add-task.component';
import {ViewTaskComponent} from '../app/UI/view-task/view-task.component';

export const routes: Routes = [
  {path: 'project', component: ProjectComponent  },
  {path: 'addtask', component: AddTaskComponent  },
  {path: 'user', component: UserComponent},
  {path: 'viewtask', component: ViewTaskComponent},
  {path: 'edit/:id', component: AddTaskComponent  },
  {path: '', component: ViewTaskComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }


