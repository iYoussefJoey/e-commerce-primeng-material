import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterlibraryComponent } from './registerlibrary.component';

describe('RegisterlibraryComponent', () => {
  let component: RegisterlibraryComponent;
  let fixture: ComponentFixture<RegisterlibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterlibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
