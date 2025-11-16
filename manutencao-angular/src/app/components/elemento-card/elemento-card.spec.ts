import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoCard } from './elemento-card';

describe('ElementoCard', () => {
  let component: ElementoCard;
  let fixture: ComponentFixture<ElementoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
