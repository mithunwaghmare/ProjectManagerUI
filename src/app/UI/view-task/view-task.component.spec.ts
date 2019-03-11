import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import{FormsModule} from '@angular/forms'
import{HttpClientModule} from '@angular/common/http';
import{RouterTestingModule} from '@angular/router/testing';
import {OrderModule} from 'ngx-order-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgxSmartModalService} from 'ngx-smart-modal';


describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,
        HttpClientModule,
        RouterTestingModule,  Ng2SearchPipeModule, NgxSmartModalModule,OrderModule
      ],
      providers:[NgxSmartModalService],
      declarations: [ ViewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
