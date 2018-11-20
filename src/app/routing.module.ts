import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewersComponent } from 'app/pages/reviewers/reviewers.component';
import { ArchiveComponent } from 'app/pages/archive/archive.component';
import { AuthorRequirementsComponent } from 'app/pages/author-requirements/author.requirements.component';
import { IndexingComponent } from 'app/pages/indexing/indexing.component';
import { ArticleComponent } from 'app/pages/article/article.component';
import { IssueComponent } from 'app/client/pages/issue/issue.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { AboutComponent } from 'app/pages/about/about.component';
import { SubscriptionsComponent } from 'app/pages/subscriptions/subscriptions.component';
import { SigninComponent } from 'app/auth/signin/signin.component';
import { ContactDataComponent } from 'app/pages/contact-data/contact.data.component';
import { AdminDashboardComponent } from 'app/admin-dashboard/admin.dashboard.component';
import { EditorialScientificBoardComponent } from 'app/pages/editorial-scientific-board/editorial.scientific.board.component';
import { EthicalStandardsComponent } from 'app/pages/ethical-standards/ethical.standards.component';

import { ClientComponent } from 'app/client/client.component';
import { AdminComponent } from 'app/admin/admin.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/about'
      },
      {
        path: 'archive',
        component: ArchiveComponent
      },
      {
        path: 'reviewers',
        component: ReviewersComponent
      },
      {
        path: 'indexing',
        component: IndexingComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent
      },
      {
        path: 'contact',
        component: ContactDataComponent
      },
      {
        path: 'requirements',
        component: AuthorRequirementsComponent
      },
      {
        path: 'ethics-statement',
        component: EthicalStandardsComponent
      },
      {
        path: 'issues/current',
        component: IssueComponent
      },
      {
        path: 'issues/:issueId',
        component: IssueComponent
      },
      {
        path: 'articles/:id',
        component: ArticleComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'editorial-scientific-board',
        component: EditorialScientificBoardComponent
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      }
    ]
  },
  {
    path: 'sign-in',
    component: SigninComponent
  },
];

const providers = [
  AuthGuard
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: providers
})
export class RoutingModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RoutingModule,
      providers: providers
    };
  }

}
