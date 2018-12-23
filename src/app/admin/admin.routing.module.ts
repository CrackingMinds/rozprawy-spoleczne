import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminRoutesResolver } from 'app/routes-resolver/admin.routes.resolver';

const routes: Routes = [
  {
    path: AdminRoutesResolver.dashboard,
    loadChildren: 'app/admin-dashboard/admin.dashboard.module#AdminDashboardModule'
  }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule {
}
