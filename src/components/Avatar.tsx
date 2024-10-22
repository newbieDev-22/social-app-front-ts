import { IAvatarProps } from "../data-type/react-type";

export default function Avatar({ name, width = "w-1/6" }: IAvatarProps) {
  return (
    <div className={`${width} flex justify-center items-center`}>
      <div className="text-xl bg-sky-400 text-white rounded-full w-10 h-10 flex justify-center items-center font-bold">
        {name[0]?.toUpperCase()}
      </div>
    </div>
  );
}
