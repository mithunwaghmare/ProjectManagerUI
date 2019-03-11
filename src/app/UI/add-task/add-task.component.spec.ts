import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AddTaskComponent} from './add-task.component';
import{HttpClientModule} from '@angular/common/http';
import{ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        NgxSmartModalModule,
        Ng2SearchPipeModule
      ],
      providers: [NgxSmartModalService],
      declarations: [ AddTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
