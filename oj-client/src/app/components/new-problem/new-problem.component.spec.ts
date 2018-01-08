import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProblemComponent } from './new-problem.component';

describe('NewProblemComponent', () => {
  let component: NewProblemComponent;
  let fixture: ComponentFixture<NewProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
