import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { DebugElement } from '@angular/core';

describe(AlertComponent.name, () => {
  let fixture: ComponentFixture<AlertComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AlertComponent] });
    fixture = TestBed.createComponent(AlertComponent);
    debugElement = fixture.debugElement;
  });

  it('should display alert message and severity', () => {
    const message = 'Message';
    const severity = 'info';
    const alertElement = debugElement.nativeElement as HTMLElement;

    fixture.componentRef.setInput('message', message);
    fixture.componentRef.setInput('severity', severity);
    fixture.detectChanges();

    expect(alertElement.textContent).toContain(message);
    expect(alertElement.querySelector('.alert')?.classList.toString()).toContain(`alert--${severity}`);
  });
});
