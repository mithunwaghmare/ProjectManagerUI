import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{FormsModule} from '@angular/forms';
import { UserComponent } from './user.component';
import {OrderModule} from 'ngx-order-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import{HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers:[FormBuilder],
      imports: [FormsModule, OrderModule, Ng2SearchPipeModule, NgxSmartModalModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
