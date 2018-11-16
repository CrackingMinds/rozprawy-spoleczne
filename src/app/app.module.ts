import { environment } from 'environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateService } from './auth/validate.service';
import { PageNameService } from './shared/services/page.name.service';
import { HttpClientModule } from '@angular/common/http';
import { MainSpinnerService } from './services/main-spinner/main.spinner.service';

import { FirebaseConfigModule } from 'app/firebase.config.module';
import { RoutingModule } from 'app/routing.module';
import { PlaygroundModule } from 'app/pages/playground/playground.module';
import { AboutModule } from 'app/pages/about/about.module';
import { ContactDataModule } from 'app/pages/contact-data/contact.data.module';
import { AuthorRequirementsModule } from 'app/pages/author-requirements/author.requirements.module';
import { IssueModule } from 'app/pages/issue/issue.module';
import { ArticleModule } from 'app/pages/article/article.module';
import { LibraryModule } from 'app/admin/library/library.module';
import { ArchiveModule } from 'app/pages/archive/archive.module';
import { EditorialScientificBoardModule } from 'app/pages/editorial-scientific-board/editorial.scientific.board.module';
import { ReviewersModule } from 'app/pages/reviewers/reviewers.module';
import { IndexingModule } from 'app/pages/indexing/indexing.module';
import { SubscriptionsModule } from 'app/pages/subscriptions/subscriptions.module';
import { SignupModule } from 'app/auth/signup/signup.module';
import { SigninModule } from 'app/auth/signin/signin.module';
import { AuthModule } from 'app/auth/auth.module';
import { AdminDashboardModule } from 'app/admin-dashboard/admin.dashboard.module';
import { EthicalStandardsModule } from 'app/pages/ethical-standards/ethical.standards.module';
import { ArticleService } from 'app/admin/library/add-article/article.service';
import { ArticleTypesService } from 'app/services/article.types.service';
import { IssueService } from 'app/pages/issue/issue.service';

import { ModalModule } from 'app/admin/library/list-of-issues/modals/modal/modal.module';

import { FirestoreArticleService } from 'app/services/firestore/article.service';
import { FirestoreIssueService } from 'app/services/firestore/issue.service';
import { FirestoreArticleTypeService } from 'app/services/firestore/article.types.service';

const devOnlyModules = [
  StoreDevtoolsModule.instrument()
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    PlaygroundModule,
    RoutingModule.forRoot(),
    AboutModule,

    ModalModule,

    FirebaseConfigModule,

    ContactDataModule.forRoot(),
    AuthorRequirementsModule,
    IssueModule.forRoot(),
    ArticleModule.forRoot(),
    LibraryModule,
    ArchiveModule,
    EditorialScientificBoardModule.forRoot(),
    ReviewersModule.forRoot(),
    IndexingModule.forRoot(),
    SubscriptionsModule.forRoot(),
    EthicalStandardsModule,

    AdminDashboardModule.forRoot(),

    AuthModule.forRoot(),
    SignupModule,
    SigninModule,

    environment.production ? [] : [...devOnlyModules]
  ],
  providers: [
    ApiService,

    FirestoreIssueService,
    FirestoreArticleService,
    FirestoreArticleTypeService,

    ArticleService,
    ArticleTypesService,
    IssueService,

    MainSpinnerService,
    ValidateService,
    PageNameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
