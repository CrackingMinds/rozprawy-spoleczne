import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminRoutesResolver } from 'app/shared/routing-helpers/admin.routes.resolver';
import { AdminComponent } from 'app/admin/admin.component';

const childRoutes: Routes = [
  {
    path: AdminRoutesResolver.dashboard(),
    loadChildren: 'app/admin/pages/admin-dashboard/admin.dashboard.module#AdminDashboardModule'
  },
  {
    path: AdminRoutesResolver.library(),
    loadChildren: 'app/admin/pages/library/library.module#LibraryModule'
  },
  {
    path: AdminRoutesResolver.editorialBoard(),
    loadChildren: 'app/admin/pages/editorial-board/editorial.board.edit.module#EditorialBoardEditModule'
  }
];

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AdminRoutesResolver.dashboard()
      },
      ...childRoutes
    ]
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
