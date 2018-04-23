import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { reducers } from './app.redux';
import { ROUTES } from './app.routes';
import { LogoComponent, FooterComponent } from './core/components';
import { HttpInterceptorService, LoaderBlockServiceService } from './core/services';
import { AddCourseModule, CoursesModule, LoginModule, NoContentModule } from './pages';

function httpClientFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new HttpInterceptorService(xhrBackend, requestOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    LoginModule,
    NoContentModule,
    AddCourseModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    LoaderBlockServiceService,
    {
      provide: Http,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
