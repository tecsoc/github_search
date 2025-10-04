import type { RepositoryEdge } from "@/app/_components/pages/Home/Home";
import { sortRepositories } from "@/app/lib/github/repository";

describe("sortRepositories", () => {
  const edges: RepositoryEdge[] = [
    { node: { name: "A", description: "descA", stargazerCount: 10, owner: { login: "userA", avatarUrl: "" } } },
    { node: { name: "B", description: "descB", stargazerCount: 5, owner: { login: "userB", avatarUrl: "" } } },
    { node: { name: "C", description: "descC", stargazerCount: 20, owner: { login: "userC", avatarUrl: "" } } },
  ];

  it("ソートなしは元の順序", () => {
    const result = sortRepositories(edges, "none");
    expect(result.map(e => e.node.name)).toEqual(["A", "B", "C"]);
  });

  it("降順（desc）はstar数が多い順", () => {
    const result = sortRepositories(edges, "desc");
    expect(result.map(e => e.node.name)).toEqual(["C", "A", "B"]);
  });

  it("昇順（asc）はstar数が少ない順", () => {
    const result = sortRepositories(edges, "asc");
    expect(result.map(e => e.node.name)).toEqual(["B", "A", "C"]);
  });

  it("star数が未定義でも0扱いでソート", () => {
    const edgesWithUndefined: RepositoryEdge[] = [
      { node: { name: "X", description: "descX", owner: { login: "userX", avatarUrl: "" } } },
      { node: { name: "Y", description: "descY", stargazerCount: 1, owner: { login: "userY", avatarUrl: "" } } },
    ];
    const result = sortRepositories(edgesWithUndefined, "asc");
    expect(result.map(e => e.node.name)).toEqual(["X", "Y"]);
  });
});
