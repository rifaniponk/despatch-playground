import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const uri = 'fresh-barnacle-51.hasura.app/v1/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://' + uri,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret':
            'QG5eK8heNXvKxrqx6nsMFRxMBTMp3Q60inTO9XJO2sr885wwE0Ojq2jjIxXV81Hd',
        },
      },
    })
  );
  return {
    link: wsLink,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
