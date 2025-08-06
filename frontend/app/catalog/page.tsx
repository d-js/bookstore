import BookList from "@/components/book/BookList";
import FilterButton from "@/components/book/FilterBar";

const page = () => {
  return <div className="flex min-h-screen">
    <div className="w-16">
      <FilterButton />
    </div>
    <div className="w-full">
      <BookList />
    </div>
  </div>;
};
export default page;
