import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

import { SigninComponent } from 'app/auth/signin/signin.component';

const declarations = [
  SigninComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SigninModule {

}
