import styles from './layout.module.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.body_wrapper}>
      <header className={styles.header}>
        <h1>GitHub リポジトリ検索サイト</h1>
      </header>
      {children}
    </div>
  );
}