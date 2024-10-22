import { IButtonProps } from "../data-type/react-type";

interface IBgMap {
  blue: string;
  green: string;
  red: string;
}

interface IColorMap {
  white: string;
  black: string;
}

interface IWidthMap {
  full: string;
  40: string;
}

const bgMap: IBgMap = {
  blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  green: "bg-green-500 hover:bg-green-600 active:bg-green-700",
  red: "bg-rose-500 hover:bg-rose-600 active:bg-rose-700",
};

const colorMap: IColorMap = {
  white: " text-white",
  black: "text-black",
};

const widthMap: IWidthMap = {
  full: "w-full",
  40: "w-40",
};

const getColor = (key: string = "blue"): string => {
  return colorMap[key as keyof IColorMap];
};

const getBg = (key: string = "black"): string => {
  return bgMap[key as keyof IBgMap];
};

const getWidth = (key: string | number = 40): string => {
  return widthMap[key as keyof IWidthMap];
};

export default function Button({
  children,
  bg = "blue",
  color = "white",
  width,
  onClick,
}: IButtonProps) {
  return (
    <button
      className={`px-3 py-1.5 ${getBg(bg)} ${getColor(color)} ${getWidth(
        width
      )} focus:outline-none rounded-md font-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
