import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";

import {AppComponent} from './app.component';
import {ApiService} from "./services/api.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef, MatExpansionModule, MatIconModule,
    MatInputModule, MatMenuModule,
    MatSidenavModule
} from "@angular/material";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ValidateService} from "./auth/validate.service";
import { CreateIssueComponent } from './admin/articles/modals/create-issue/create-issue.component';
import {PageNameService} from "./shared/services/page.name.service";
import {HttpClientModule} from "@angular/common/http";
import { ModalComponent } from './admin/articles/modals/modal/modal.component';
import { MakeIssueCurrentComponent } from './admin/articles/modals/make-issue-current/make-issue-current.component';
import {ModalService} from "./admin/articles/modals/modal/modal.service";
import {ModalSpinnerService} from "./admin/articles/modals/modal/modal.spinner.service";
import { RemoveIssueComponent } from './admin/articles/modals/remove-issue/remove.issue.component';
import { ChangeNameComponent } from './admin/articles/modals/change-name/change-name.component';
import {MainSpinnerService} from "./services/main-spinner/main.spinner.service";

import { FirebaseConfigModule } from 'app/firebase.config.module';
import { RoutingModule } from 'app/routing.module';
import { PlaygroundModule } from 'app/pages/playground/playground.module';
import { AboutModule } from 'app/pages/about/about.module';
import { ContactDataModule } from 'app/pages/contact-data/contact.data.module';
import { AuthorRequirementsModule } from 'app/pages/author-requirements/author.requirements.module';
import { IssueModule } from 'app/pages/issue/issue.module';
import { ArticleModule } from 'app/pages/article/article.module';
import { ArticlesModule } from 'app/admin/articles/articles.module';
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

@NgModule({
    declarations: [
        AppComponent,
        CreateIssueComponent,
        ModalComponent,
        MakeIssueCurrentComponent,
        RemoveIssueComponent,
        ChangeNameComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
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

        FirebaseConfigModule,

        ContactDataModule.forRoot(),
        AuthorRequirementsModule,
        IssueModule.forRoot(),
        ArticleModule.forRoot(),
        ArticlesModule,
        ArchiveModule,
        EditorialScientificBoardModule.forRoot(),
        ReviewersModule.forRoot(),
        IndexingModule.forRoot(),
        SubscriptionsModule.forRoot(),
        EthicalStandardsModule,

        AdminDashboardModule.forRoot(),

        AuthModule.forRoot(),
        SignupModule,
        SigninModule
    ],
    entryComponents: [
        ModalComponent,
        CreateIssueComponent,
        MakeIssueCurrentComponent,
        RemoveIssueComponent,
        ChangeNameComponent
    ],
    providers: [
        ApiService,
        MainSpinnerService,
        ModalService,
        ModalSpinnerService,
        ValidateService,
        PageNameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
