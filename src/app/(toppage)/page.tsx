"use client";

import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { Button, TextInput } from "@mantine/core";
import { useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import RepositoryItem from "./areas/RepositoryItem";
import styles from "./page.module.scss";

const ITEMS_PER_PAGE = 10;

const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            owner {
              login
              avatarUrl(size: 100)
            }
          }
        }
      }
    }
  }`

export default function Home() {

  const queryRef = useRef<HTMLInputElement>(null);
  const [searchRepos, { data, loading, fetchMore }] = useLazyQuery(SEARCH_REPOSITORIES);
  const handleSearchButton = useCallback(() => {
    if (!queryRef.current?.value) return;
    console.log({data})
    searchRepos({ variables: { query: queryRef.current?.value, first: 10 } });
  },[data, searchRepos]);

  const loadMore = useCallback( () => {
    if (!queryRef.current?.value) return;
    if (!data?.search.pageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        query: queryRef.current?.value,
        first: 10,
        after: data?.search?.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          search: {
            ...fetchMoreResult.search,
            edges: [
              ...previousResult.search.edges,
              ...fetchMoreResult.search.edges,
            ],
          },
        };
      },
    });
  },[data?.search.pageInfo.endCursor, data?.search.pageInfo.hasNextPage, fetchMore]);

  return (
    <main className={styles.main}>
      <div className={styles.search_wrapper}>
        <TextInput ref={queryRef} className={styles.text_input} placeholder="リポジトリ名" required />
        <Button variant={"light"} size="md" onClick={handleSearchButton}>検索</Button>
      </div>
      <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!!data?.search.pageInfo.hasNextPage}
          loader={<div key={0}>Loading ...</div>}
        >
        <ul className={styles.repositories}>
          {data?.search?.edges.map((node, index: string) => {
            const item = node["node"]
            const name = item["name"]
            const owner = item["owner"]
            return <RepositoryItem
              key={index}
              name={name}
              owner={owner["login"]}
              avatarUrl={owner["avatarUrl"]}
            />;
          })}
        </ul>
      </InfiniteScroll>
    </main>
  );
}
