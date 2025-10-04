import { Avatar } from "@mantine/core";

import { createGithubUserUrl } from "@/app/lib/github/repository";
import React from "react";
import styles from "./RepositoryItem.module.scss";
const RepositoryItems: React.FC<{
  name: string;
  owner: string;
  avatarUrl: string;
  description: string;
  stargazerCount: number;
}> = ({ name, owner, avatarUrl, description, stargazerCount }) => {
  return <li className={styles.repository_wrapper}>
          <a href={createGithubUserUrl(owner)}>
            <Avatar
              className={styles.avatar}
              src={avatarUrl}
              size={100}
              radius={100}
            />
          </a>
          <div>
            <h2><a href={`/${owner}/${name}/`}>{name}</a></h2>
            <p>{description}</p>
            <p>⭐ {stargazerCount}</p>
          </div>
        </li>
}
export default React.memo(RepositoryItems);