import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { ChatComponent } from './chat/chat.component';
import { AdminGuard } from '../guards/admin.guard';  
import { AuthGuard } from '../guards/auth.guard';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ChannelSelectionComponent } from './channel-selection/channel-selection.component';  // Corrected import statement

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'super-admin', component: SuperAdminComponent, canActivate: [AdminGuard] },
  { path: 'channel-selection', component: ChannelSelectionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'groups', component: GroupManagementComponent, canActivate: [AdminGuard] },  // Protect route with AdminGuard
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },  // Protect chat with AuthGuard
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
