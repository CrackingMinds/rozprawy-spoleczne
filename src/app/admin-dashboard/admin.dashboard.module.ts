import { ModuleWithProviders, NgModule } from '@angular/core';

import { AdminDashboardComponent } from 'app/admin-dashboard/admin.dashboard.component';
import { AddArticleModule } from 'app/admin/articles/add-article/add.article.module';

const declarations = [
  AdminDashboardComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    AddArticleModule.forRoot()
  ]
})
export class AdminDashboardModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminDashboardModule,
      providers: providers
    };
  }
}
