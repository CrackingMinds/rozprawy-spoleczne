import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";

import {AppComponent} from './app.component';
import {ApiService} from "./services/api.service";
import {ArticleCardComponent} from './shared/templates/article-card/article-card.component';
import {PageContentComponent} from './shared/templates/page-content/page-content.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef, MatExpansionModule, MatIconModule,
    MatInputModule, MatMenuModule,
    MatSidenavModule
} from "@angular/material";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MenuComponent} from './shared/templates/menu/menu.component';
import {HeaderComponent} from './shared/templates/header/header.component';
import {SpinnerService} from "./services/spinner/spinner.service";
import {IssueComponent} from './pages/issue/issue.component';
import {IssueService} from "./pages/issue/issue.service";
import {ArticleComponent} from './pages/article/article.component';
import {ArticleService} from "./pages/article/article.service";
import {SignupComponent} from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ValidateService} from "./auth/validate.service";
import {AuthService} from "./auth/auth.service";
import {SigninComponent} from './auth/signin/signin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin.dashboard.component';
import { ArticlesComponent } from './admin/articles/articles.component';
import { CreateIssueComponent } from './admin/articles/modals/create-issue/create-issue.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { AboutComponent } from './pages/about/about.component';
import { EditorialScientificBoardComponent } from './pages/editorial-scientific-board/editorial.scientific.board.component';
import {EditorialScientificBoardService} from "./pages/editorial-scientific-board/editorial.scientific.board.service";
import { ReviewersComponent } from './pages/reviewers/reviewers.component';
import {ReviewersService} from "./pages/reviewers/reviewers.service";
import { IndexingComponent } from './pages/indexing/indexing.component';
import {IndexingService} from "./pages/indexing/indexing.service";
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import {SubscriptionsService} from "./pages/subscriptions/subscriptions.service";
import { ContactDataComponent } from './pages/contact-data/contact.data.component';
import {ContactDataService} from "./pages/contact-data/contact.data.service";
import { PhoneNumComponent } from './shared/templates/phone-num/phone.num.component';
import { PhoneNumPipe } from './shared/pipes/phone-num.pipe';
import { AuthorRequirementsComponent } from './pages/author-requirements/author.requirements.component';
import {PageNameService} from "./shared/services/page.name.service";
import {HttpClientModule} from "@angular/common/http";
import { ModalComponent } from './admin/articles/modals/modal/modal.component';
import { MakeIssueCurrentComponent } from './admin/articles/modals/make-issue-current/make-issue-current.component';
import {ModalService} from "./admin/articles/modals/modal/modal.service";
import {ModalSpinnerService} from "./admin/articles/modals/modal/modal.spinner.service";
import { RemoveIssueComponent } from './admin/articles/modals/remove-issue/remove.issue.component';
import { ChangeNameComponent } from './admin/articles/modals/change-name/change-name.component';
import {MainSpinnerService} from "./services/main-spinner/main.spinner.service";
import { PlaygroundComponent } from 'app/pages/playground/playground.component';

import { FirebaseConfigModule } from 'app/firebase.config.module';
import { RoutingModule } from 'app/routing.module';
import { PlaygroundModule } from 'app/pages/playground/playground.module';

@NgModule({
    declarations: [
        AppComponent,
        ArticleCardComponent,
        PageContentComponent,
        MenuComponent,
        HeaderComponent,
        IssueComponent,
        ArticleComponent,
        SignupComponent,
        SigninComponent,
        AdminDashboardComponent,
        ArticlesComponent,
        CreateIssueComponent,
        ArchiveComponent,
        AboutComponent,
        EditorialScientificBoardComponent,
        ReviewersComponent,
        IndexingComponent,
        SubscriptionsComponent,
        ContactDataComponent,
        PhoneNumComponent,
        PhoneNumPipe,
        AuthorRequirementsComponent,
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
        FirebaseConfigModule,
        PlaygroundModule,
        RoutingModule.forRoot()
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
        SpinnerService,
        MainSpinnerService,
        IssueService,
        ArticleService,
        EditorialScientificBoardService,
        ReviewersService,
        IndexingService,
        SubscriptionsService,
        ContactDataService,
        PageNameService,
        ModalService,
        ModalSpinnerService,
        ValidateService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
