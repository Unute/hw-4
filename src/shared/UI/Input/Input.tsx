import classNames from "classnames";
import React from "react";

import styles from "./Input.module.css";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, afterSlot, disabled, ...rest }, ref) => {
    return (
      <div className={classNames(styles["input__wrapper"], className)}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
        <div>{afterSlot}</div>
      </div>
    );
  },
);

export default Input;
