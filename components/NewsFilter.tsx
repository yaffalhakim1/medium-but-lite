// NewsFilter.tsx
import React from "react";

interface NewsFilterProps {
  onFilterChange: () => void;
  search: string;
  type?: boolean;
  selectedCat: string[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSelectedCat: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewsFilter: React.FC<NewsFilterProps> = ({
  onFilterChange,
  search,
  type,
  selectedCat,
  setSearch,
  setType,
  setSelectedCat,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn m-1">
          Type
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={() => setType(undefined)}>
            <a>Reset Type</a>
          </li>
          <li onClick={() => setType(false)}>
            <a>Free</a>
          </li>
          <li onClick={() => setType(true)}>
            <a>Premium</a>
          </li>
        </ul>
      </div>

      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn m-1">
          Category
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={() => setSelectedCat([])}>
            <a>Reset Category</a>
          </li>
          <li onClick={() => setSelectedCat(["Tech"])}>
            <a>Tech</a>
          </li>
          <li onClick={() => setSelectedCat(["Anime"])}>
            <a>Anime</a>
          </li>
        </ul>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Search"
        className="input input-neutral input-md input-bordered"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={onFilterChange}>Apply Filters</button>
    </div>
  );
};

export default NewsFilter;
