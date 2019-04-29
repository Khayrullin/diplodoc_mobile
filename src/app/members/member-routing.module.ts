import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'task', loadChildren: './task/task.module#TaskPageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'reports', loadChildren: './reports/reports.module#ReportsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
