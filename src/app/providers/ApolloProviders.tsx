"use client";

import { apolloClient } from "@/app/lib/apollo/ApolloClient";
import { ApolloProvider } from "@apollo/client/react";

export default function ApolloProviders({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}