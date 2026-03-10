import React from "react";
import IconComponent from "./IconComponent";
import classNames from "classnames";

const COLOR_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary:"bg-[#E9ECEF]  text-[#ADB5BD]",
  black:'bg-[#E9ECEF] text-black'
};
const Button = React.forwardRef(
  (
    {
      type = "button",
      text,
      className = "",
      color = "primary",
      disabled = false,
      loading = false,
      startIcon,
      endIcon,
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={classNames(
          "inline-flex cursor-pointer items-center text-sm justify-center gap-2 py-[14px] rounded-lg font-semibold transition-colors focus:outline-none disabled:cursor-not-allowed",
          disabled ? COLOR_CLASSES.secondary : COLOR_CLASSES[color],
          className,
        )}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : startIcon ? (
          <IconComponent icon={startIcon}/>
        ) : null}
       {text}
        {!loading && endIcon ? <span className="shrink-0"><IconComponent icon={endIcon}/></span> : null}
      </button>
    );
  }
);

export default Button;
