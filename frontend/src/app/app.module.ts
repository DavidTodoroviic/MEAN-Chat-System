import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { ChatComponent } from './chat/chat.component';
import { ChannelSelectionComponent } from './channel-selection/channel-selection.component';
import { ManageUsersComponent } from './manage-users/manage-users.component'; 

@NgModule({
  declarations: [
    AppComponent,
    SuperAdminComponent,
    LoginComponent,
    LogoutComponent,
    GroupManagementComponent,
    ChatComponent,
    ChannelSelectionComponent,
    ManageUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }