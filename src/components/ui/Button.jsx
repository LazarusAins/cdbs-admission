import React from "react";
import cn from "classnames";

const Button = ({ className, callBack, body, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "text-[1.75rem] rounded-[1rem] p-[1.25rem] flex-center my-[.5rem]",
        className
      )}
      onClick={callBack}
    >
      {body}
    </button>
  );
};

export default Button;
