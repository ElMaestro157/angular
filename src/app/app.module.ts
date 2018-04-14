import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Http, XHRBackend, RequestOptions, ConnectionBackend, HttpModule } from '@angular/http';
import { HttpInterceptorService } from './core/services';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { StoreModule } from '@ngrx/store';
import { reducers } from './app.redux';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoursesModule, LoginModule, AddCourseModule, NoContentModule } from './pages';
import { LogoModule, FooterModule} from './core/components';

function httpClientFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new HttpInterceptorService(xhrBackend, requestOptions);
}

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
      provide: Http,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
