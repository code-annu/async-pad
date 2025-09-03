interface InputFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  type?: string;
  label: string;
  width?: string;
  paddingY?: string;
  paddingX?: string;
}

function InputField(props: InputFieldProps) {
  const {
    placeholder,
    type,
    label,
    width,
    paddingY,
    paddingX,
    value,
    onValueChange,
  } = props;
  return (
    <div className="flex flex-col ">
      <label htmlFor="inputField">{label}</label>
      <input
        type={type || "text"}
        id="inputField"
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
        }}
        className={`border-1 border-gray-300 ${width || ""} ${paddingY || ""} ${
          paddingX || ""
        } rounded mt-1`}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default InputField;
