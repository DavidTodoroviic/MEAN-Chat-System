import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { GroupManagementComponent } from './group-management/group-management.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'groups', component: GroupManagementComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
