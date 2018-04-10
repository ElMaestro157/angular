import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoursesModule, LoginModule, AddCourseModule, NoContentModule } from './pages';
import { LogoModule, FooterModule} from './core/components';
import { HttpInterceptorService } from './core/services';
import { ROUTES } from './app.routes';
import { reducers } from './app.redux';


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
    HttpModule,
    RouterModule.forRoot(ROUTES),
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
