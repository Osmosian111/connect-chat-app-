import React from "react";
type FormType = {
  use: "form";
  className?: string;
  id: string;
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ use, className, id, type, ...prop }: FormType) => {
  return (
    <>
      {use == "form" && (
        <input
          className={`input ${className}`}
          id={id}
          type={type}
          name={id}
          placeholder={"Enter your " + id}
          {...prop}
        />
      )}
    </>
  );
};

export default Input;
