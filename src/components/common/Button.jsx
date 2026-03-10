import React from "react";
import IconComponent from "./IconComponent";
import classNames from "classnames";

const COLOR_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary:"bg-[#E9ECEF]  text-[#ADB5BD]",
  black:'bg-[#E9ECEF] text-black'
};
const Button =(
  (
    {
      type = "button",
      text,
      className = "",
      variant = "default",
      color = "primary",
      useColorClasses = true,
      disabled = false,
      loading = false,
      startIcon,
      onClick,
      endIcon,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const baseClasses =
      variant === "icon"
        ? "inline-flex cursor-pointer items-center justify-center rounded-full transition focus:outline-none disabled:cursor-not-allowed"
        : variant === "custom"
          ? "inline-flex cursor-pointer items-center justify-center transition focus:outline-none disabled:cursor-not-allowed"
          : "inline-flex cursor-pointer items-center text-sm justify-center gap-2 py-[14px] rounded-lg font-semibold transition-colors focus:outline-none disabled:cursor-not-allowed";

    return (
      <button
        ref={ref}
        onClick={onClick}
        type={type}
        disabled={isDisabled}
        className={classNames(
          baseClasses,
          useColorClasses ? (disabled ? COLOR_CLASSES.secondary : COLOR_CLASSES[color]) : "",
          className,
        )}
        {...rest}
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
