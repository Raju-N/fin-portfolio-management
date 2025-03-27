import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTrendComponent } from './market-trend.component';

describe('MarketTrendComponent', () => {
  let component: MarketTrendComponent;
  let fixture: ComponentFixture<MarketTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketTrendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
