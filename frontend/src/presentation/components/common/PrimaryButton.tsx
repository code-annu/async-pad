import type { ComponentProps } from "react";

interface PrimaryButtonProps extends ComponentProps<"button"> {
  text: string;
  onClick: () => void;
  width?: string;
  height?: string;
  buttonType?: ComponentProps<"button">["type"];
}

export default function PrimaryButton({
  text,
  onClick,
  width,
  height,
  buttonType = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`${width || ""} ${
        height || ""
      } bg-blue-500 text-white rounded cursor-pointer`}
    >
      {text}
    </button>
  );
}