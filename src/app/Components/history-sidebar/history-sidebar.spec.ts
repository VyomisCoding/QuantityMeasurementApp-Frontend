import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySidebarComponent } from './history-sidebar';

describe('HistorySidebarComponent', () => {
  let component: HistorySidebarComponent;
  let fixture: ComponentFixture<HistorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorySidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorySidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
