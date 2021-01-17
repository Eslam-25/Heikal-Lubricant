import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListLinesComponent } from './card-list-lines.component';

describe('CardListLinesComponent', () => {
  let component: CardListLinesComponent;
  let fixture: ComponentFixture<CardListLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
