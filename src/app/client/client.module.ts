import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule, MatIconModule } from '@angular/material';

import { ClientComponent } from 'app/client/client.component';
import { ClientRoutingModule } from 'app/client/client.routing.module';

import { ArchiveModule } from 'app/pages/archive/archive.module';
import { ReviewersModule } from 'app/pages/reviewers/reviewers.module';
import { IndexingModule } from 'app/pages/indexing/indexing.module';
import { SubscriptionsModule } from 'app/pages/subscriptions/subscriptions.module';
import { ContactDataModule } from 'app/pages/contact-data/contact.data.module';
import { AuthorRequirementsModule } from 'app/pages/author-requirements/author.requirements.module';
import { EthicalStandardsModule } from 'app/pages/ethical-standards/ethical.standards.module';
import { IssueModule } from 'app/client/pages/issue/issue.module';
import { ArticleModule } from 'app/pages/article/article.module';
import { AboutModule } from 'app/pages/about/about.module';
import { EditorialScientificBoardModule } from 'app/pages/editorial-scientific-board/editorial.scientific.board.module';
import { HeaderModule } from 'app/shared/templates/header/header.module';
import { MenuModule } from 'app/shared/templates/menu/menu.module';
import { PageLoadSpinnerModule } from 'app/page-load-spinner/page.load.spinner.module';
import { clientPageReducers } from 'app/client/store/client.page.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { clientPageEffects } from 'app/client/store/client.page.effects';
import { ClientContentService } from 'app/client/client.content.service';

const declarations = [
  ClientComponent
];

const providers = [
  ClientContentService
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    ClientRoutingModule,

    StoreModule.forFeature('clientPage', clientPageReducers),
    EffectsModule.forFeature(clientPageEffects),

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
