import React, { useState, useRef, useEffect } from "react";

import Input from "../Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";

import styles from "./MultiDropdown.module.css";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((options) =>
    options.value.toLowerCase().includes(filter.toLowerCase()),
  );

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div ref={rootRef} className={className}>
      <Input
        placeholder={getTitle(value)}
        disabled={disabled}
        value={isFocused ? filter : value.length > 0 ? getTitle(value) : ""}
        onFocus={() => {
          setIsFocused(true);
          setIsOpen(true);
        }}
        onBlur={() => {
          // Не закрываем список по onBlur, только снимаем фокус
          setIsFocused(false);
        }}
        onChange={(e) => {
          if (disabled) return;
          setIsOpen(true);
          setFilter(e);
        }}
        afterSlot={<ArrowDownIcon color="secondary" />}
        className={styles["input__down"]}
      />

      <div className={styles["block__option"]}>
        {isOpen &&
          !disabled &&
          filteredOptions.map((options) => {
            const alreadySelected = value.some((v) => v.key === options.key);
            return (
              <div
                className={`${styles.option}${alreadySelected ? " " + styles["option--selected"] : ""}`}
                key={options.key}
                onClick={() => {
                  if (alreadySelected) {
                    onChange(value.filter((v) => v.key !== options.key));
                  } else {
                    onChange([...value, options]);
                  }
                }}
              >
                {options.value}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MultiDropdown;
