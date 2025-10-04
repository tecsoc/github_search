"use client";

import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { Button, TextInput } from "@mantine/core";
import { useCallback, useRef } from "react";
import RepositoryItem from "./areas/RepositoryItem";
import styles from "./page.module.scss";

const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int!) {
    search(query: $query, type: REPOSITORY, first: $first) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            nameWithOwner
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            owner {
              avatarUrl(size: 100)
            }
          }
        }
      }
    }
  }`

export default function Home() {

  const queryRef = useRef<HTMLInputElement>(null);
  const [searchRepos, { data, loading, error }] = useLazyQuery(SEARCH_REPOSITORIES);
  const handleSearchButton = useCallback(() => {
    if (!queryRef.current?.value) return;
    console.log({data})
    searchRepos({ variables: { query: queryRef.current?.value, first: 10 } });
  },[queryRef]);

  return (
    <main className={styles.main}>
      <div className={styles.search_wrapper}>
        <TextInput ref={queryRef} className={styles.text_input} placeholder="リポジトリ名" required />
        <Button variant={"light"} size="md" onClick={handleSearchButton}>検索</Button>
      </div>
      <div className={styles.repositories}>
        {data?.search?.edges.map(node => {
          const item = node["node"]
          const name = item["name"];
          return <RepositoryItem
            key={name}
            name={name}
            avatarUrl={item["owner"]["avatarUrl"]}
          />;
        })}
      </div>
    </main>
  );
}
