import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Import LoginComponent
import { GroupManagementComponent } from './group-management/group-management.component'; // Import GroupManagementComponent

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Declare LoginComponent
    GroupManagementComponent // Declare GroupManagementComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]), // Initialize RouterModule with an empty route array
    FormsModule // Add FormsModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }