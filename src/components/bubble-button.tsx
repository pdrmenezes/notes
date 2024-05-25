import { ComponentProps, ReactNode } from "react";

export interface BubbleButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export function BubbleButton(props: BubbleButtonProps) {
  return (
    <button
      className="flex items-center gap-1.5 p-1.5 text-sm font-medium leading-none text-gray-300 hover:bg-[#24292E] hover:text-gray-100 data-[active=true]:bg-[#24292E] data-[active=true]:text-blue-400"
      {...props}
    />
  );
}
