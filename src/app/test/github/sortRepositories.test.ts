import { sortRepositories } from "@/app/lib/github/repository";
import { Repository, RepositoryEdge } from "@/gql/graphql";

describe("sortRepositories", () => {
  const edges: RepositoryEdge[] = [
    { cursor: "1", node: { id: "1", name: "A", description: "descA", stargazerCount: 10 } as Partial<Repository> as Repository },
    { cursor: "2", node: { id: "2", name: "B", description: "descB", stargazerCount: 5 } as Partial<Repository> as Repository },
    { cursor: "3", node: { id: "3", name: "C", description: "descC", stargazerCount: 20 } as Partial<Repository> as Repository },
  ];

  it("ソートなしは元の順序", () => {
    const result = sortRepositories(edges, "none");
    expect(result.map(e => e?.node?.name)).toEqual(["A", "B", "C"]);
  });

  it("降順（desc）はstar数が多い順", () => {
    const result = sortRepositories(edges, "desc");
    expect(result.map(e => e?.node?.name)).toEqual(["C", "A", "B"]);
  });

  it("昇順（asc）はstar数が少ない順", () => {
    const result = sortRepositories(edges, "asc");
    expect(result.map(e => e?.node?.name)).toEqual(["B", "A", "C"]);
  });

  it("star数が未定義でも0扱いでソート", () => {
    const edgesWithUndefined: RepositoryEdge[] = [
      {
        cursor: "1",
        node: {
          id: "y",
          name: "Y",
          description: "descX",
          stargazerCount: 1,
        } as Partial<Repository> as Repository,
      },
      {
        cursor: "2",
        node: {
          id: "X",
          name: "X",
          description: "descY",
          stargazerCount: undefined,
        } as Partial<Repository> as Repository,
      },
    ];
    const result = sortRepositories(edgesWithUndefined, "asc");
    expect(result.map(e => e?.node?.name)).toEqual(["X", "Y"]);
  });
});
