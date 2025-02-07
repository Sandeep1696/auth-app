// home/home-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) // Use loadChildren
      },
      { 
        path: 'profile', 
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) // Use loadChildren
      },
      { 
        path: 'settings', 
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) // Use loadChildren
      },
      {
        path:'employees',
        loadChildren:() => import('../employee-list/employee-list.module').then(m=>m.EmployeeListModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route
    ]
  },
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
  { path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }