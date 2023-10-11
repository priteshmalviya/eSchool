import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RagisterComponent } from './ragister.component';

describe('RagisterComponent', () => {
  let component: RagisterComponent;
  let fixture: ComponentFixture<RagisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RagisterComponent]
    });
    fixture = TestBed.createComponent(RagisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
