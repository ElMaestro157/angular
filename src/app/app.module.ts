import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './core/services';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { StoreModule } from '@ngrx/store';
import { reducers } from './app.redux';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoursesModule, LoginModule, AddCourseModule, NoContentModule } from './pages';
import { LogoModule, FooterModule} from './core/components';

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
