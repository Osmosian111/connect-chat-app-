import React from "react";
type InputType = {
  className?: string;
  id: string;
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, id, type, ...prop }: InputType) => {
  return (
    <input
      className={`input ${className}`}
      id={id}
      type={type}
      name={id}
      placeholder={"Enter your " + id}
      {...prop}
    />
  );
};

export default Input;
