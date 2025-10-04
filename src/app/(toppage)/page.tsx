import { Button, TextInput } from "@mantine/core";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.search_wrapper}>
        <TextInput  className={styles.text_input} placeholder="リポジトリ名" required />
        <Button variant={"light"} size="md">検索</Button>
      </div>
    </main>
  );
}
