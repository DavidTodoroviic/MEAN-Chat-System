import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { ChatComponent } from './chat/chat.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ChannelSelectionComponent } from './channel-selection/channel-selection.component';  
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'super-admin', component: SuperAdminComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'channel-selection', component: ChannelSelectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'groups', component: GroupManagementComponent },
  { path: 'chat', component: ChatComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
