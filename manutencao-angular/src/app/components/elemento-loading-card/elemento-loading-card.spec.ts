import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoLoadingCard } from './elemento-loading-card';

describe('ElementoLoadingCard', () => {
  let component: ElementoLoadingCard;
  let fixture: ComponentFixture<ElementoLoadingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementoLoadingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementoLoadingCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
