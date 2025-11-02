import "./Button.css";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  ...props
}) => {
  const variantClasses = {
    primary: "button-primary",
    secondary: "button-secondary",
    danger: "button-danger",
    success: "button-success",
  };

  return (
    <button
      onClick={onClick}
      className={`button ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
