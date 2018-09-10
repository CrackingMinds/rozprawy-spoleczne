import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewersComponent } from 'app/pages/reviewers/reviewers.component';
import { ArchiveComponent } from 'app/pages/archive/archive.component';
import { AuthorRequirementsComponent } from 'app/pages/author-requirements/author.requirements.component';
import { IndexingComponent } from 'app/pages/indexing/indexing.component';
import { ArticleComponent } from 'app/pages/article/article.component';
import { IssueComponent } from 'app/pages/issue/issue.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { AboutComponent } from 'app/pages/about/about.component';
import { SubscriptionsComponent } from 'app/pages/subscriptions/subscriptions.component';
import { SignupComponent } from 'app/auth/signup/signup.component';
import { SigninComponent } from 'app/auth/signin/signin.component';
import { ContactDataComponent } from 'app/pages/contact-data/contact.data.component';
import { AdminDashboardComponent } from 'app/admin-dashboard/admin.dashboard.component';
import { EditorialScientificBoardComponent } from 'app/pages/editorial-scientific-board/editorial.scientific.board.component';
import { PlaygroundComponent } from 'app/pages/playground/playground.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
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
    path: 'issues/current',
    component: IssueComponent,
    data: {currentIssue: true}
  },
  {
    path: 'issues/:id',
    component: IssueComponent,
    data: {currentIssue: false}
  },
  {
    path: 'articles/:id',
    component: ArticleComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'sign-in',
    component: SigninComponent
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'editorial-scientific-board',
    component: EditorialScientificBoardComponent
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
  }
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
