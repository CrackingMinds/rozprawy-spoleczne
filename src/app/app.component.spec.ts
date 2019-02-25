import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { RoutingModule } from 'app/routing.module';
import { AppModule } from 'app/app.module';
import { AppComponent } from 'app/app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RoutingModule,
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    });
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
