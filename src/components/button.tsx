import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  className,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button className={clsx(variant && `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  );
};
