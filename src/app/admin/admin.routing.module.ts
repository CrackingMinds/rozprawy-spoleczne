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
  },
  {
    path: AdminRoutesResolver.scientificBoard(),
    loadChildren: 'app/admin/pages/scientific-board/scientific.board.edit.module#ScientificBoardEditModule'
  },
  {
    path: AdminRoutesResolver.reviewers(),
    loadChildren: 'app/admin/pages/reviewers/reviewers.edit.module#ReviewersEditModule'
  },
  {
    path: AdminRoutesResolver.indexing(),
    loadChildren: 'app/admin/pages/indexing/indexing.edit.module#IndexingEditModule'
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
