export const createGithubUserUrl = (username: string): string => {
  if (!username) return undefined;
  return `https://github.com/${username}/`;
};

export const createRepositoryUrl = (owner: string, repositoryName: string): string => {
  if (!owner || !repositoryName) return undefined;
  return `${createGithubUserUrl(owner)}${repositoryName}/`;
}