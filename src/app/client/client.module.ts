import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule, MatIconModule } from '@angular/material';

import { ClientComponent } from 'app/client/client.component';
import { ClientRoutingModule } from 'app/client/client.routing.module';

import { ArchiveModule } from 'app/client/pages/archive/archive.module';
import { ReviewersModule } from 'app/client/pages/reviewers/reviewers.module';
import { IndexingModule } from 'app/client/pages/indexing/indexing.module';
import { SubscriptionsModule } from 'app/client/pages/subscriptions/subscriptions.module';
import { ContactDataModule } from 'app/client/pages/contact-data/contact.data.module';
import { AuthorRequirementsModule } from 'app/client/pages/author-requirements/author.requirements.module';
import { EthicalStandardsModule } from 'app/client/pages/ethical-standards/ethical.standards.module';
import { IssueModule } from 'app/client/pages/issue/issue.module';
import { ArticleModule } from 'app/client/pages/article/article.module';
import { AboutModule } from 'app/client/pages/about/about.module';
import { EditorialScientificBoardModule } from 'app/client/pages/editorial-scientific-board/editorial.scientific.board.module';
import { HeaderModule } from 'app/shared/templates/header/header.module';
import { MenuModule } from 'app/shared/templates/menu/menu.module';
import { PageLoadSpinnerModule } from 'app/shared/templates/page-load-spinner/page.load.spinner.module';

const declarations = [
  ClientComponent
];

const providers = [
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    ClientRoutingModule,

    MatSidenavModule,
    MatIconModule,

    HeaderModule,
    MenuModule,
    PageLoadSpinnerModule.forRoot(),

    ArchiveModule,
    ReviewersModule,
    IndexingModule,
    SubscriptionsModule,
    ContactDataModule,
    AuthorRequirementsModule,
    EthicalStandardsModule,
    IssueModule,
    ArticleModule,
    AboutModule,
    EditorialScientificBoardModule
  ],
  providers: providers
})
export class ClientModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ClientModule,
      providers: providers
    };
  }

}
