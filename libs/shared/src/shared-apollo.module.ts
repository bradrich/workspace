import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})
export class SharedApolloModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {}
}
