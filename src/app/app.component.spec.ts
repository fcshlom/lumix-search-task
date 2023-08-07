import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { MatToolbar } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavBarComponent, MatToolbar],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display nav bar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-nav-bar')).toBeTruthy;
    expect(compiled.querySelector('router-outlet')).toBeTruthy;
    expect(compiled.querySelector('app-nav-bar mat-toolbar h3')).toBeTruthy;
    expect(
      compiled.querySelector('app-nav-bar mat-toolbar h3').textContent
    ).toContain('Lumix Search task');
  });

  it('should display in nav bar 3 buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelectorAll('app-nav-bar mat-toolbar a').length
    ).toEqual(3);
  });
});
