import React from "react";
import classNames from "classnames";

const Checkbox = ({
  id,
  name,
  wrapClassName = "",
  checkLabel,
  labelClassName = "",
  inputClassName = "",
  checked,
  onChange,
}) => {
  const checkboxId = id || `checkbox-${checkLabel?.toLowerCase()?.replace(/\s+/g, "-") || "field"}`;

  return (
    <div className={classNames("flex items-center gap-2", wrapClassName)}>
      <span className="relative h-5 w-5">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={classNames(
            "peer appearance-none cursor-pointer h-5 w-5 border-2 border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:ring-2 focus:ring-blue-300",
            inputClassName,
          )}
        />
        <svg
          className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>

      <label htmlFor={checkboxId} className={classNames("text-[14px]", labelClassName)}>
        {checkLabel}
      </label>
    </div>
  );
};

export default Checkbox;
