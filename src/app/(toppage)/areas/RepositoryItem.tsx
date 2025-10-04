import { Avatar } from "@mantine/core";

import React from "react";
import styles from "./RepositoryItem.module.scss";
const RepositoryItems: React.FC<{
  name: string;
  owner: string;
  avatarUrl: string;
}> = ({ name, owner, avatarUrl }) => {
  return <li className={styles.repository_wrapper}>
          <a href={`https://github.com/${owner}/`}>
            <Avatar
              className={styles.avatar}
              src={avatarUrl}
              size={100}
              radius={100}
            />
          </a>
          <h2><a href={`/repositories/${owner}/${name}/`}>{name}</a></h2>
        </li>
}
export default React.memo(RepositoryItems);