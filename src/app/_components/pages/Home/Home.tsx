"use client";

import RepositoryItem from "@/app/(toppage)/areas/RepositoryItem";
import { sortRepositories } from "@/app/lib/github/repository";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { Button, Select, TextInput } from "@mantine/core";
import { useCallback, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../../atoms/Loading/Loading";
import styles from "./Home.module.scss";

export type RepositoryEdge = {
  node: {
    name: string;
    description: string;
    stargazerCount?: number;
    owner: {
      login: string;
      avatarUrl: string;
    };
    primaryLanguage?: {
      name: string;
    };
  };
};

type SearchRepositoriesData = {
  search: {
    repositoryCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: RepositoryEdge[];
  };
};
const SORT_OPTIONS = [
  { value: "none", label: "" },
  { value: "desc", label: "Star数が多い順）" },
  { value: "asc", label: "Star数が少ない順" },
];



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

export const Home: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<string>("none");
  const languageRef = useRef<HTMLInputElement>("");

  const queryRef = useRef<HTMLInputElement>(null);
  const [searchRepos, { data, loading, fetchMore }] = useLazyQuery<SearchRepositoriesData>(SEARCH_REPOSITORIES);
  const handleSearchButton = useCallback(() => {
    if (!queryRef.current?.value) return;
    let query = queryRef.current?.value;
    if (languageRef.current.value) {
      query += ` language:${languageRef.current.value}`;
    }
    searchRepos({ variables: { query, first: 10 } });
  },[searchRepos]);

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
        <Select
          ref={languageRef}
          data={[{ value: "", label: "全言語" }, { value: "TypeScript", label: "TypeScript" }, { value: "JavaScript", label: "JavaScript" }, { value: "Python", label: "Python" }, { value: "Go", label: "Go" }, { value: "Java", label: "Java" }, { value: "C++", label: "C++" }, { value: "C#", label: "C#" }]}
          defaultValue={""}
          placeholder="言語で絞り込み"
          style={{ minWidth: 180 }}
        />
        <Select
          data={SORT_OPTIONS}
          value={sortOrder}
          onChange={value => setSortOrder(value ?? "desc")}
          placeholder="ソート順"
          style={{ minWidth: 180 }}
        />
        <Button variant={"light"} size="md" onClick={handleSearchButton}>検索</Button>
      </div>
      {loading && <Loading color="blue" />}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!!data?.search?.pageInfo.hasNextPage}
        loader={<Loading key={0} color="blue" />}
      >
        <ul className={styles.repositories}>
          {sortRepositories(data?.search?.edges ?? [], sortOrder).map((node, index) => {
            const item = node.node;
            const name = item.name;
            const owner = item.owner;
            return <RepositoryItem
              key={index}
              name={name}
              owner={owner["login"]}
              avatarUrl={owner["avatarUrl"]}
              description={item["description"]}
              stargazerCount={item.stargazerCount ?? 0}
              primaryLanguage={item.primaryLanguage?.name ?? ""}
            />;
          })}
        </ul>
      </InfiniteScroll>
    </main>
  );
}