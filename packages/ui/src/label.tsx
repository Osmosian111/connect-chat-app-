import React, { ReactNode } from "react";
type LabelType = {
  children: ReactNode;
  htmlFor:string;
  className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;
const Label = ({ children, htmlFor, className, ...prop }: LabelType) => {
  return (
    <>
      <label className={`label ${className}`} htmlFor={htmlFor} {...prop}>
        {children}
      </label>
    </>
  );
};

export default Label;
