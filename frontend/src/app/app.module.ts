import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { ChatComponent } from './chat/chat.component';
import { AuthService } from './services/auth.service';
import { GroupService } from './services/group.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    GroupManagementComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
    AppRoutingModule 
  ],
  providers: [AuthService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
