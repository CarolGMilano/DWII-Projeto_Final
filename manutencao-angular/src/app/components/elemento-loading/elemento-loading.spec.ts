import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoLoading } from './elemento-loading';

describe('ElementoLoading', () => {
  let component: ElementoLoading;
  let fixture: ComponentFixture<ElementoLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementoLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementoLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
