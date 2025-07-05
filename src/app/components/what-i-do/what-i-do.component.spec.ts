import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIDoComponent } from './what-i-do.component';

describe('WhatIDoComponent', () => {
  let component: WhatIDoComponent;
  let fixture: ComponentFixture<WhatIDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatIDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatIDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
