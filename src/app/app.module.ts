import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { reducers } from './app.redux';
import { ROUTES } from './app.routes';
import { AlertModule, ConfirmWindowModule, FooterComponent, LoaderBlockModule, LogoComponent } from './core/components';
import { AlertService, ConfirmWindowService, HttpInterceptorService, LoaderBlockServiceService } from './core/services';
import { AddCourseModule, CoursesModule, LoginModule, NoContentComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FooterComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    LoaderBlockModule,
    ConfirmWindowModule,
    AlertModule,
    CoursesModule,
    LoginModule,
    AddCourseModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    LoaderBlockServiceService,
    ConfirmWindowService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
