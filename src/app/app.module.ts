import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesModule, LoginModule, AddCourseModule } from './pages';
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
    AddCourseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
