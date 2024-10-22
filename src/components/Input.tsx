import { IInputProps } from "../data-type/react-type";

export default function Input({
  placeholder,
  error,
  type = "text",
  name,
  value,
  onChange,
}: IInputProps) {
  return (
    <>
      <input
        type={type}
        className={`w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}
