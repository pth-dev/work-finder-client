import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#1967d2] text-white hover:bg-[#0146a6] text-[16px] font-medium",
        secondary:
          "bg-[#f9ab00] text-[#202124] hover:bg-[#e9a000] text-[16px] font-medium",
        third:
          "bg-[#eff4fc] text-[#1967d2] hover:bg-[#1967d2] hover:text-white text-[16px] font-medium",
        fourth:
          "bg-[#e1f2e5] text-[#34a853] hover:bg-[#34a853] hover:text-white text-[16px] font-medium",
        outline:
          "border border-[#E8EAED] bg-white text-[#202124] shadow-sm hover:bg-[#F8F9FA]",
        ghost: "text-[#202124] hover:bg-[#F8F9FA]",
        link: "text-[#1967D2] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[60px] px-[50px] py-[17px]",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-12 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
