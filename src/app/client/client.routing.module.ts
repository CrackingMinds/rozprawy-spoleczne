import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from 'app/client/client.component';

import { AboutComponent } from 'app/client/pages/about/about.component';
import { ReviewersComponent } from 'app/client/pages/reviewers/reviewers.component';
import { ArchiveComponent } from 'app/client/pages/archive/archive.component';
import { AuthorRequirementsComponent } from 'app/client/pages/author-requirements/author.requirements.component';
import { IssueComponent } from 'app/client/pages/issue/issue.component';
import { ArticleComponent } from 'app/client/pages/article/article.component';
import { IndexingComponent } from 'app/client/pages/indexing/indexing.component';
import { SubscriptionsComponent } from 'app/client/pages/subscriptions/subscriptions.component';
import { ContactDataComponent } from 'app/client/pages/contact-data/contact.data.component';
import { EthicalStandardsComponent } from 'app/client/pages/ethical-standards/ethical.standards.component';
import { RODOComponent } from 'app/client/pages/rodo/rodo.component';
import { EditorialScientificBoardComponent } from 'app/client/pages/editorial-scientific-board/editorial.scientific.board.component';

import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { PageRoute } from 'app/client/page.route';

const clientRoutes: PageRoute[] = [
  {
    path: RoutesResolver.archive(),
    component: ArchiveComponent
  },
  {
    path: RoutesResolver.reviewers(),
    component: ReviewersComponent
  },
  {
    path: RoutesResolver.indexing(),
    component: IndexingComponent
  },
  {
    path: RoutesResolver.subscriptions(),
    component: SubscriptionsComponent
  },
  {
    path: RoutesResolver.contact(),
    component: ContactDataComponent
  },
  {
    path: RoutesResolver.requirements(),
    component: AuthorRequirementsComponent
  },
  {
    path: RoutesResolver.ethicsStatement(),
    component: EthicalStandardsComponent
  },
  {
    path: RoutesResolver.rodo(),
    component: RODOComponent
  },
  {
    path: RoutesResolver.currentIssue(),
    component: IssueComponent
  },
  {
    path: `${RoutesResolver.issue()}/:issueId`,
    component: IssueComponent
  },
  {
    path: `${RoutesResolver.article()}/:articleId`,
    component: ArticleComponent
  },
  {
    path: RoutesResolver.about(),
    component: AboutComponent
  },
  {
    path: RoutesResolver.editorialAndScientificBoard(),
    component: EditorialScientificBoardComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesResolver.about()
      },
      ...clientRoutes
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
export class ClientRoutingModule {
}
