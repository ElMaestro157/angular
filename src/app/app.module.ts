import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoursesModule, LoginModule, AddCourseModule, NoContentModule } from './pages';
import { LogoModule, FooterModule} from './core/components';
import { reducers } from './app.redux';
import { HttpInterceptorService } from './core/services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LogoModule,
    CoursesModule,
    FooterModule,
    LoginModule,
    NoContentModule,
    AddCourseModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
