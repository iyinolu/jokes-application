import React, { FocusEventHandler } from 'react';

interface Props {
  fieldInfo?: string;
  hasError?: boolean;
  hasLabel?: boolean;
  hasInfo?: boolean;
  setChange?: (name: string | undefined, value: string) => void;
  type: string;
  placeholder: string;
  className?: string;
  disabled: boolean;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
  name?: string;
}

const CustomTextField = ({
  setChange,
  type,
  placeholder,
  className,
  disabled,
  value,
  onBlur,
  onFocus,
  name,
}: Props) => {
  return (
    <fieldset className={`form-fieldset ${className ?? ''}`}>
      <input
        value={value}
        placeholder={placeholder ?? ''}
        onChange={(e) => setChange && setChange(name, e.target.value)}
        type={`${type ?? 'text'}`}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
      />
    </fieldset>
  );
};

export default CustomTextField;
