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

const routes: Routes = [
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
