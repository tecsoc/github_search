import { Chip } from "@/app/_components/atoms/Chip/Chip";
import StarCountTable from "@/app/_components/pages/RepositoryInfoPage/areas/StarCountTable/StarCountTable";
import { apolloClient } from "@/app/lib/apollo/ApolloClient";
import { createGithubUserUrl, createRepositoryUrl } from "@/app/lib/github/repository";
import { GetRepositoryQuery } from "@/gql/graphql";
import { gql } from "@apollo/client";
import { Avatar } from "@mantine/core";
import { notFound } from "next/navigation";
import styles from "./RepositoryInfoPage.module.scss";

export type RepositoryInfoPageType = {
  params: Promise<{
    owner: string;
    repositoryName: string;
  }>;
};

const REPOSITORY_INFO_QUERY = gql`
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      nameWithOwner
      description
      url
      stargazerCount
      watchers {
        totalCount
      }
      forkCount
      issues(states: OPEN) {
        totalCount
      }
      primaryLanguage {
        name
      }
      owner {
        login
        avatarUrl(size: 100)
      }
    }
  }`

export const RepositoryInfoPage: React.FC<RepositoryInfoPageType> = async ({ params }) => {
  const { owner, repositoryName } = await params;

  const { data, error } = await apolloClient.query<GetRepositoryQuery>({
    query: REPOSITORY_INFO_QUERY,
    variables: {
      owner,
      name: repositoryName
    }
  });

  const repository = data?.repository;
  if (error || !repository) {
    return notFound();
  };

  return <>
    <div className={styles.repository_name_block}>
      <a href={createGithubUserUrl(owner)}>
        <Avatar
          src={repository["owner"]["avatarUrl"]}
          size={100}
          radius={100}
        />
      </a>
      <div className={styles.repository_name_area}>
        <h2><a href={createRepositoryUrl(owner, repositoryName)} target="_blank">{repositoryName}</a></h2>
        <p>{repository["description"]}</p>
        <Chip name={repository["primaryLanguage"]["name"]} />
      </div>
    </div>
    <StarCountTable
      stargazerCount={repository["stargazerCount"]}
      watchersCount={repository["watchers"]["totalCount"]}
      forkCount={repository["forkCount"]}
      issuesCOunt={repository["issues"]["totalCount"]}
    />
  </>
}