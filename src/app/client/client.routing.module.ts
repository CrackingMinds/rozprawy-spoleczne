import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from 'app/client/client.component';

import { AboutComponent } from 'app/pages/about/about.component';
import { ReviewersComponent } from 'app/pages/reviewers/reviewers.component';
import { ArchiveComponent } from 'app/pages/archive/archive.component';
import { AuthorRequirementsComponent } from 'app/pages/author-requirements/author.requirements.component';
import { IssueComponent } from 'app/client/pages/issue/issue.component';
import { ArticleComponent } from 'app/pages/article/article.component';
import { IndexingComponent } from 'app/pages/indexing/indexing.component';
import { SubscriptionsComponent } from 'app/pages/subscriptions/subscriptions.component';
import { ContactDataComponent } from 'app/pages/contact-data/contact.data.component';
import { EthicalStandardsComponent } from 'app/pages/ethical-standards/ethical.standards.component';
import { EditorialScientificBoardComponent } from 'app/pages/editorial-scientific-board/editorial.scientific.board.component';

import { RoutesResolver } from 'app/routes-resolver/routes.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesResolver.about
      },
      {
        path: RoutesResolver.archive,
        component: ArchiveComponent
      },
      {
        path: RoutesResolver.reviewers,
        component: ReviewersComponent
      },
      {
        path: RoutesResolver.indexing,
        component: IndexingComponent
      },
      {
        path: RoutesResolver.subscriptions,
        component: SubscriptionsComponent
      },
      {
        path: RoutesResolver.contact,
        component: ContactDataComponent
      },
      {
        path: RoutesResolver.requirements,
        component: AuthorRequirementsComponent
      },
      {
        path: RoutesResolver.ethicsStatement,
        component: EthicalStandardsComponent
      },
      {
        path: RoutesResolver.currentIssue,
        component: IssueComponent
      },
      {
        path: `${RoutesResolver.issue}/:issueId`,
        component: IssueComponent
      },
      {
        path: `${RoutesResolver.article}/:id`,
        component: ArticleComponent
      },
      {
        path: RoutesResolver.about,
        component: AboutComponent
      },
      {
        path: RoutesResolver.editorialAndScientificBoard,
        component: EditorialScientificBoardComponent
      }
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
