import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProd } from './alta-prod';

describe('AltaProd', () => {
  let component: AltaProd;
  let fixture: ComponentFixture<AltaProd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaProd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaProd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
