import React from "react";

interface FilterFieldProps {
  option: string;
  name: string;
  index: number;
  filter: string;
  handleChange: any;
}

export const FilterField: React.FC<FilterFieldProps> = ({
  option,
  name,
  index,
  filter,
  handleChange,
}) => {
  return (
    <div className="filter-item">
      <label className="control__label" htmlFor={`${option}-${index}`}>
        <input
          className="visually-hidden control__input"
          type="radio"
          id={`${option}-${index}`}
          name={name}
          value={option}
          checked={filter === option}
          onChange={handleChange}
        />
        <span className="control__mark"></span>
        <span className="control__text">{option}</span>
      </label>
    </div>
  );
};
