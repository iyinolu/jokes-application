import React, { ChangeEventHandler } from 'react';

interface SelectFieldProps {
  placeholder: string;
  options: JokeOptions[];
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
}
export interface JokeOptions {
  label: string;
  value: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  options,
  onChange,
}) => {
  return (
    <select
      onChange={onChange}
      name="categories"
      id="category-select"
      className="custom-select"
    >
      <option value="">{placeholder}</option>
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
