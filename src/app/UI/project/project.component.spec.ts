import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {OrderModule} from 'ngx-order-pipe';
import { ProjectComponent } from './project.component';
import{FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import{HttpClientModule} from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, OrderModule, Ng2SearchPipeModule, NgxSmartModalModule, HttpClientModule],
      providers: [NgxSmartModalService],
      declarations: [ ProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
