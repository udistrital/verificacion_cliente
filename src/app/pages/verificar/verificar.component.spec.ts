import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarComponent } from './verificar.component';

describe('VerificarComponent', () => {
  let component: VerificarComponent;
  let fixture: ComponentFixture<VerificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
