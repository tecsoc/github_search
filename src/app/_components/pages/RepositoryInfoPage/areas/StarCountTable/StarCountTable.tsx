import { Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";
import React from "react";

const StarCountTable: React.FC<{
  stargazerCount: number;
  watchersCount: number;
  forkCount: number;
  issuesCOunt: number;
}> = ({
  stargazerCount,
  watchersCount,
  forkCount,
  issuesCOunt
})=> {
  return <Table verticalSpacing="xs">
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
            <TableTd>{stargazerCount}</TableTd>
            <TableTd>{watchersCount}</TableTd>
            <TableTd>{forkCount}</TableTd>
            <TableTd>{issuesCOunt}</TableTd>
          </TableTr>
        </TableTbody>
      </Table>
}

export default React.memo(StarCountTable);