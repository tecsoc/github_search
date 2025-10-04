import { Avatar } from "@mantine/core";

import React from "react";
import styles from "./RepositoryItem.module.scss";
const RepositoryItems: React.FC<{
  name: string;
  avatarUrl: string;
}> = ({ name, avatarUrl }) => {
  return <div className={styles.repository_wrapper}>
          <Avatar
          className={styles.avatar}
            src={avatarUrl}
            size={100}
            radius={100}
          />
          <div>{name}</div>
        </div>
}
export default React.memo(RepositoryItems);