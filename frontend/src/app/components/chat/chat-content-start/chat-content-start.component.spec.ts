import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContentStartComponent } from './chat-content-start.component';

describe('ChatContentStartComponent', () => {
  let component: ChatContentStartComponent;
  let fixture: ComponentFixture<ChatContentStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatContentStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatContentStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
