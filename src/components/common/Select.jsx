import React from "react";
import ReactSelect, { components as ReactSelectComponents } from "react-select";
import IconComponent from "./IconComponent";
import classNames from "classnames";

const OptionLabel = ({ image, name }) => (
  <div className="flex items-center">
    {image ? (
      <img src={image} alt={name} className="h-[27px] w-[40px]  object-cover" />
    ) : null}
    <span className="pl-3">{name}</span>
  </div>
);

const DropdownIndicator = (props) => (
  <ReactSelectComponents.DropdownIndicator {...props}>
    <span className="text-xs leading-none text-[#646464]">
        <IconComponent icon='drop-down'/>
    </span>
  </ReactSelectComponents.DropdownIndicator>
);

const Select = ({
  options = [],
  className = "",
  value,
  defaultValue,
  onChange,
  onClick,
  ...rest
}) => {
  const mappedOptions = options.map((item) => ({
    ...item,
    value: item.id ?? item.name,
    label: item.name,
  }));

  const fallbackValue = mappedOptions[0] || null;
  const selectedValue = value ?? defaultValue ?? fallbackValue;

  const handleChange = (selectedOption, actionMeta) => {
    if (onChange) {
      onChange(selectedOption, actionMeta);
    }
    if (onClick) {
      onClick(selectedOption, actionMeta);
    }
  };

  return (
    <ReactSelect
      className={classNames(className)}
      classNamePrefix="lrf-select"
      options={mappedOptions}
      value={selectedValue}
      isSearchable={false}
      onChange={handleChange}
      components={{ IndicatorSeparator: null, DropdownIndicator }}
      formatOptionLabel={(option) => (
        <OptionLabel image={option.image} name={option.name} />
      )}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: 32,
          border: "none",
          boxShadow: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
          ...(state.isFocused ? { boxShadow: "none" } : {}),
        }),
        menu: (base) => ({
          ...base,
          marginTop: 6,
          minWidth: "max-content",
          zIndex: 30,
        }),
        option: (base, state) => ({
          ...base,
          cursor: "pointer",
          backgroundColor: state.isFocused ? "#e5e7eb" : "#fff",
          color: "#111827",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#646464",
        }),
        valueContainer: (base) => ({
          ...base,
          padding: 0,
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: 0,
          paddingLeft: 8,
        }),
      }}
      {...rest}
    />
  );
};

export default Select;
