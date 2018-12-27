import { Injectable } from '@angular/core';

@Injectable()
export class SignInRepository {

  private redirectedFromUrl: string;

  set redirectedFrom(url: string) {
    this.redirectedFromUrl = url;
  }

  get redirectedFrom(): string {
    return this.redirectedFromUrl;
  }

  constructor() {}

  reset(): void {
    this.redirectedFromUrl = null;
  }

}
