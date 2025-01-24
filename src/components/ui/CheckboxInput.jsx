import cn from "classnames";
import { FaCheck } from "react-icons/fa6";

const CheckboxInput = ({ className, label, name, isChecked, ...props }) => {
  return (
    <div
      className={cn(
        "flex-grow relative flex flex-row-reverse items-center gap-4 self-center",
        className
      )}
    >
      <label
        htmlFor={name}
        className="block text-[1.25rem] md:text-[0.8rem] !mb-0 font-light text-gray text-nowrap lg:text-[1.75rem]"
      >
        {label}
        <span className="opacity-0">{"*"}</span>
      </label>
      <div className="relative">
      <input
        id={name}
        name={name}
        type="checkbox"
        {...props}
        className={cn("size-[2rem] border-1 border-black  rounded-full border text-[1rem] lg:text-[1.75rem] appearance-none z-[999]bg-transparent", )}
      />
      {isChecked && ( <FaCheck className="absolute left-0 top-0 -translate-x-[-50%] translate-y-[50%] text-black z-[-1]" /> )}
      </div>
    </div>
  );
};

export default CheckboxInput;
