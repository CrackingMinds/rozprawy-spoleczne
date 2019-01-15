import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminRoutesResolver } from 'app/shared/routing-helpers/admin.routes.resolver';
import { AdminComponent } from 'app/admin/admin.component';

import { EditorialScientificBoardEditModule } from 'app/admin/pages/editorial-scientific-board/editorial.scientific.board.edit.module';

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
    path: AdminRoutesResolver.editorialAndScientificBoardEdit(),
    loadChildren: () => EditorialScientificBoardEditModule
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
        redirectTo: AdminRoutesResolver.library()
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
