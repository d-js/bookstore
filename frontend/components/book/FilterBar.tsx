"use client";

import { useBookStore } from "@/stores/book";
import { isValidFilter } from "@/types/guards";
import { Filters } from "@/types/types";
import { BOOK_FORMATS, CATEGORIES } from "@/utils/constants/constant";
import language from "@/translations/en.json";

const FilterButton = () => {
  const resetFilter = useBookStore((state) => state.resetFilters);
  const filters = useBookStore((state) => state.filters);
  const setFilter = useBookStore((state) => state.setFilter);

  const handleChange = (field: string, value: string): void => {
    if (isValidFilter(field)) setFilter(field as keyof Filters, value);
  };

  const handleResetFilters = () => {
    resetFilter();
  };

  return (
    <div
      className="
    fixed
    top-[64px] left-0
    w-[380px]
    h-[calc(100vh-64px)]
    p-6
    bg-red-50
    rounded-r-xl
    shadow-md
    flex flex-col space-y-6
    overflow-y-auto
    border-r border-red-200
  "
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-extrabold mb-6 text-red-700 text-center mt-8 tracking-wide">
          {language.filterBar.title}
        </h2>
        <button
          className="font-semibold text-md bg-orange-700 text-white rounded-lg px-3 py-1 h-fit hover:cursor-pointer mt-2"
          onClick={handleResetFilters}
        >
          {language.filterBar.buttons.reset}
        </button>
      </div>

      <div className="flex flex-col space-y-5 flex-grow">
        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.price}
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              name="priceMin"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
            />
            <input
              type="number"
              name="priceMax"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.genre}
          </label>
          <select
            name="genre"
            className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
            value={filters.genre}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            {Object.values(CATEGORIES).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.authorId}
          </label>
          <input
            type="number"
            name="authorId"
            placeholder="Author ID"
            className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={filters.authorId}
          />
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.pages}
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              name="pagesMin"
              placeholder="Min"
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
              value={filters.pagesMin}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="number"
              name="pagesMax"
              placeholder="Max"
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
              value={filters.pagesMax}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.format}
          </label>
          <select
            name="format"
            className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
            value={filters.format}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            {Object.values(BOOK_FORMATS).map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.language}
          </label>
          <input
            type="text"
            name="language"
            placeholder="Language"
            className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={filters.language}
          />
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.publisher}
          </label>
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={filters.publisher}
          />
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.discount}
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              name="discountMin"
              placeholder="Min"
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
              value={filters.discountMin}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="number"
              name="discountMax"
              placeholder="Max"
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
              value={filters.discountMax}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-red-800 font-semibold mb-2">
            {language.filterBar.publicationDate}
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              name="dateFrom"
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
              value={filters.dateFrom}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="date"
              name="dateTo"
              className="w-1/2 px-3 py-2 border border-red-300 rounded-md bg-red-100 text-red-600 focus:outline-none"
              value={filters.dateTo}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterButton;
