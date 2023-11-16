import React from "react";
import { FilterField } from "./FilterField";
import NameInput from "./NameInput";

interface FiltersProps {
  speciesOptions: string[];
  genderOptions: string[];
  valueGender: string;
  valueSpecies: string;
  valueName: string;
  genderFilter: string;
  speciesFilter: string;
  nameFilter: string;
  handleChange: any;
  resetFilter: any;
}

const Filters: React.FC<FiltersProps> = ({
  speciesOptions,
  genderOptions,
  valueGender,
  valueSpecies,
  valueName,
  genderFilter,
  speciesFilter,
  nameFilter,
  handleChange,
  resetFilter,
}) => {
  return (
    <section className="filters">
      <h2 className="visually-hidden">Filters</h2>
      <form className="filter-form">
        <div className="filter-form__wrapper">
          <fieldset className="filter-section__wrapper">
            <legend>{valueName}</legend>
            <NameInput
              nameFilter={nameFilter}
              name={valueName}
              handleChange={handleChange}
            />
          </fieldset>
          <fieldset className="filter-section__wrapper">
            <legend>{valueGender}</legend>
            {genderOptions?.concat("all").map((option, id) => (
              <FilterField
                key={id}
                index={id}
                name={valueGender}
                option={option}
                filter={genderFilter}
                handleChange={handleChange}
              />
            ))}
          </fieldset>
          <fieldset className="filter-section__wrapper">
            <legend>{valueSpecies}</legend>
            {speciesOptions?.concat("all").map((option, id) => (
              <FilterField
                key={id}
                index={id}
                name={valueSpecies}
                option={option}
                filter={speciesFilter}
                handleChange={handleChange}
              />
            ))}
          </fieldset>
        </div>
        <button
          className="filter-form__button"
          onClick={resetFilter}
          type="reset"
        >
          Reset filters
        </button>
      </form>
    </section>
  );
};

export default Filters;
