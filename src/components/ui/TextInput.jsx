import cn from "classnames"

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  onInput = () => {},
  className,
  ...rest
}) => (
  <div className={cn("mb-4 flex-grow w-full", className)}>
    <label htmlFor={name} className="block  text-[0.8rem] font-medium text-gray text-nowrap lg:font-bold lg:text-[1.75rem]">
      {label}
      <span
        className="opacity-0"
      >
        {"*"}
      </span>
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      onInput={onInput}
      placeholder={placeholder}
      {...rest}
      style={{ appearance: "text-field" }}
      // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      className="w-full py-[1rem] px-[2rem]  rounded-[10px] border text-[1rem] lg:text-[1.75rem]"
    />
  </div>
);

export default TextInput;
