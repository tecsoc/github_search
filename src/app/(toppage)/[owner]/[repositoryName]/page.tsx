import { RepositoryInfoPage, RepositoryInfoPageType } from "@/app/_components/pages/RepositoryInfoPage/RepositoryInfoPage";

export const generateMetadata = async ({ params } : {
  params: Promise<RepositoryInfoPageType>;
}) => {
  const { repositoryName } = await params;
  return {
    title: `${repositoryName}リポジトリの詳細`,
    description: `${repositoryName}リポジトリの詳細ページです。`
  }
}

export default RepositoryInfoPage;