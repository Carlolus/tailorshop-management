import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricsListComponent } from './fabrics-list.component';

describe('FabricsListComponent', () => {
  let component: FabricsListComponent;
  let fixture: ComponentFixture<FabricsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
