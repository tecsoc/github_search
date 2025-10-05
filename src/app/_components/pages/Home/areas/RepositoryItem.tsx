import { Avatar } from "@mantine/core";

import { Chip } from "@/app/_components/atoms/Chip/Chip";
import { createGithubUserUrl } from "@/app/lib/github/repository";
import React from "react";
import styles from "./RepositoryItem.module.scss";

const RepositoryItems: React.FC<{
  name: string;
  owner: string;
  avatarUrl: string;
  description: string;
  stargazerCount: number;
  primaryLanguage: string;
}> = ({ name, owner, avatarUrl, description, stargazerCount, primaryLanguage }) => {
  return <li className={styles.repository_wrapper}>
          <a href={createGithubUserUrl(owner)}>
            <Avatar
              className={styles.avatar}
              src={avatarUrl}
              size={100}
              radius={100}
              alt={`${owner}のアバター`}
            />
          </a>
          <div>
            <h2><a href={`/${owner}/${name}/`}>{name}</a></h2>
            <p>{description}</p>
            <div className={styles.star_language_wrapper}>
              <span>⭐ {stargazerCount}</span>
              {primaryLanguage && <Chip name={primaryLanguage} />}
            </div>
          </div>
        </li>
}
export default React.memo(RepositoryItems);