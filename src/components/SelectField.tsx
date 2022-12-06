import React from 'react';

interface SelectFieldProps {
  placeholder: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ placeholder }) => {
  return (
    <select name="categories" id="category-select" className="custom-select">
      <option value="">{placeholder}</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  );
};

export default SelectField;
