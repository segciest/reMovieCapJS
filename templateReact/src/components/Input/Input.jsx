const Input = ({
  name,
  id,
  handleChange,
  handleBlur,
  touched,
  value,
  error,
  labelInput,
  type = "text",
  placeholder,
  cssInput,
  autoComplete = "off",
  inputWidth,
  inputHeight,
  disabled,
  daDat,
}) => {
  const color =
    "bg-[#eee] text-gray-900 text-sm rounded-lg block w-full p-2.5 ";
  return (
    <div style={{ width: inputWidth, height: inputHeight }}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {labelInput}
      </label>
      <input
        style={{ outline: "none", border: "none" }}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        type={type}
        id={id}
        className={`${color}${cssInput}`}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      {touched && error && <p className="text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
