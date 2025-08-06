import BookDetails from "@/components/book/BookDetails";
import { bookDetailsPageProps } from "@/types/interfaces";

const page = async ({ params }: bookDetailsPageProps) => {
  return <BookDetails bookId={params.id} />;
};
export default page;
