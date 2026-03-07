import classNames from "classnames";
import React from "react";

import CheckIcon from "../icons/CheckIcon";

import styles from "./CheckBox.module.css";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  disabled,
  className,
  ...props
}) => {
  return (
    <label
      className={classNames(styles["checkbox-wrapper"], className, {
        [styles.disabled]: disabled,
        [styles.checked]: checked,
      })}
    >
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        className={styles["checkbox-input"]}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <span className={styles["checkbox-box"]}>
        {checked && (
          <CheckIcon
            width={40}
            height={40}
            color={disabled ? "secondary" : "accent"}
            className={classNames(styles.checkbox, {
              [styles["check-icon"]]: disabled,
            })}
          />
        )}
      </span>
    </label>
  );
};

export default CheckBox;
