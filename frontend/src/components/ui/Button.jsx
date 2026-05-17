import "./Button.css";

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`.trim()}
      disabled={disabled}
      {...rest}
    >
      <span className="btn__shine" aria-hidden />
      {children}
    </button>
  );
}
