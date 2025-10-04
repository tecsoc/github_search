export const createGithubUserUrl = (username: string): string | undefined => {
  if (!username) return undefined;
  return `https://github.com/${username}/`;
};

export const createRepositoryUrl = (owner: string, repositoryName: string): string | undefined => {
  if (!owner || !repositoryName) return undefined;
  return `${createGithubUserUrl(owner)}${repositoryName}/`;
}