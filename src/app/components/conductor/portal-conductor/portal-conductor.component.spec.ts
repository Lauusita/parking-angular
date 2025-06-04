import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalConductorComponent } from './portal-conductor.component';

describe('PortalConductorComponent', () => {
  let component: PortalConductorComponent;
  let fixture: ComponentFixture<PortalConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
