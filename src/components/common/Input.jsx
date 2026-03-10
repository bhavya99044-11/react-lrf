import React from "react";
import IconComponent from "./IconComponent";
import classNames from "classnames";

const Input = React.forwardRef(
  (
    {
      id,
      name,
      type = "text",
      label,
      placeholder,
      value,
      onChange,
      required = false,
      className = "",
      inputClassName = "",
      divClassName = "",
      labelClassName = "",
      error = "",
      startIcon,
      endIcon,
    },
    ref,
  ) => {
    return (
      <div className={classNames(className)}>
        {label && (
          <div className="flex gap-1">
            <label
              htmlFor={name}
              className={classNames(
                "mb-1 block capitalize text-sm font-semibold text-[#212529]",
                labelClassName,
              )}
            >
              {label}
            </label>
            {required ? <span className="text-red-500">*</span> : ""}
          </div>
        )}

        <div
          className={classNames(
            "flex items-center max-h-[48px] gap-2 rounded-lg border bg-white px-3 py-[13px]",
            error ? "border-red-500" : "border-[#DEE2E6]",
            divClassName,
          )}
        >
          {startIcon && (
            <span className="shrink-0 h-4 w-4">
              <IconComponent icon={startIcon} />
            </span>
          )}
          <input
            id={id}
            ref={ref}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={classNames(
              "w-[420px] bg-transparent text-sm text-[#212529] outline-none placeholder:text-sm placeholder:text-[#868E96]",
              inputClassName,
            )}
          />
          {endIcon ? <span className="pt-[2px]">{endIcon}</span> : null}
        </div>

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

export default Input;
