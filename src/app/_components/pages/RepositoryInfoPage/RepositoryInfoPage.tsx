import { apolloClient } from "@/app/lib/apollo/ApolloClient";
import { gql } from "@apollo/client";
import { Avatar, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";
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

  const { data, error } = await apolloClient.query({
    query: REPOSITORY_INFO_QUERY,
    variables: {
      owner,
      name: repositoryName
    }
  });

  const repository = data.repository;
  return <>
    <div className={styles.repository_name_block}>
      <a href={`https://github.com/${owner}/`}>
        <Avatar
          src={repository["owner"]["avatarUrl"]}
          size={100}
          radius={100}
        />
      </a>
      <div className={styles.repository_name_area}>
        <h2>{repositoryName}</h2>
        <p>{repository["description"]}</p>
        <h3><span className={styles.language}>{repository["primaryLanguage"]["name"]}</span></h3>
      </div>
    </div>
    <Table verticalSpacing="xs">
      <TableThead>
        <TableTr>
          <TableTh>Star数</TableTh>
          <TableTh>Watcher数</TableTh>
          <TableTh>Fork数</TableTh>
          <TableTh>Issue数</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        <TableTr>
          <TableTd>{repository["stargazerCount"]}</TableTd>
          <TableTd>{repository["watchers"]["totalCount"]}</TableTd>
          <TableTd>{repository["forkCount"]}</TableTd>
          <TableTd>{repository["issues"]["totalCount"]}</TableTd>
        </TableTr>
      </TableTbody>
    </Table>
  </>
}