import classNames from 'classnames';
import React, { useState } from 'react';

import { TextFieldProps } from './TextField.types';

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
