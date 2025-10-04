import { DefaultMantineColor, Loader } from "@mantine/core"
import React from "react"
import styles from "./Loading.module.scss"

const Loading: React.FC<{
  color?: DefaultMantineColor
}> = ({color}) => {
  return <div className={styles.loading_wrapper}><Loader color={color} /></div>
}

export default React.memo(Loading);