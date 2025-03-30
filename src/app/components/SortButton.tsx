import React from "react";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  toggleSort: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ sortOrder, toggleSort }) => {
  return (
    <button onClick={toggleSort}>
      Sort by Population ({sortOrder === "asc" ? "Ascending" : "Descending"})
    </button>
  );
};

export default SortButton;
