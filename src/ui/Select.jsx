import { FIELD_STYLE } from "./Input";

export function Select({ className = "", children, ...props }) {
  return (
    <select className={`${FIELD_STYLE} ${className}`} {...props}>
      {children}
    </select>
  );
}