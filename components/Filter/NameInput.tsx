import React from "react";

interface InputProps {
  name: string;
  handleChange: any;
  nameFilter: string;
}

const NameInput: React.FC<InputProps> = ({
  name,
  nameFilter,
  handleChange,
}) => {
  return (
    <div>
      <input
        className="name-input"
        type="text"
        id={name}
        name={name}
        value={nameFilter}
        onChange={handleChange}
        placeholder="Enter character's name..."
      />
      <label htmlFor={name} className="visually-hidden ">
        {name}
      </label>
    </div>
  );
};

export default NameInput;
