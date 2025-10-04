export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <h1>GitHub リポジトリ検索サイト</h1>
      </header>
      {children}
    </> 
  );
}