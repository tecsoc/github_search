
import { createGithubUserUrl, createRepositoryUrl } from "@/app/lib/github/repository";

describe("createGithubUserUrl", () => {
  it("usernameが空文字ならundefined を返す", () => {
    expect(createGithubUserUrl("")).toBeUndefined();
  });

  it("username が正しければ GitHubユーザーのURLを返す", () => {
    expect(createGithubUserUrl("takuto")).toBe("https://github.com/takuto/");
  });
});

describe("createRepositoryUrl", () => {
  it("owner または repositoryName が空ならundefinedを返す", () => {
    expect(createRepositoryUrl("", "repo")).toBeUndefined();
    expect(createRepositoryUrl("user", "")).toBeUndefined();
  });
  it("owner, repositoryNameともに正常なデータを渡した場合GitHUbのURLが返ること", () => {
    expect(createRepositoryUrl("user", "my-repo")).toBe("https://github.com/user/my-repo/");
  });
});