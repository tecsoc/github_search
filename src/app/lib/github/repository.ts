import { RepositoryEdge } from "@/gql/graphql";

export const createGithubUserUrl = (username: string): string | undefined => {
  if (!username) return undefined;
  return `https://github.com/${username}/`;
};

export const createRepositoryUrl = (owner: string, repositoryName: string): string | undefined => {
  if (!owner || !repositoryName) return undefined;
  return `${createGithubUserUrl(owner)}${repositoryName}/`;
}

export const sortRepositories = (edges: RepositoryEdge[], order: string): RepositoryEdge[] =>{
  if (order === "none") return edges;
  return edges.slice().sort((a, b) => {
    const aStar = a?.node?.stargazerCount ?? 0;
    const bStar = b?.node?.stargazerCount ?? 0;
    if (order === "desc") return bStar - aStar;
    if (order === "asc") return aStar - bStar;
    return 0;
  });
}