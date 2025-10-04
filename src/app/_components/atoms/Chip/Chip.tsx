import styles from "./Chip.module.scss";

export const Chip : React.FC<{
  name: string;
}> = ({name}) => {
  return <h3><span className={styles.chip}>{name}</span></h3>;
}