import { TestBed, async } from '@angular/core/testing';

import { RoutingModule } from 'app/routing.module';
import { AppModule } from 'app/app.module';
import { AppComponent } from 'app/app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RoutingModule,
        AppModule
      ]
    });
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
