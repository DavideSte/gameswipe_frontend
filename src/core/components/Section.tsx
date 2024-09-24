import React, { ForwardedRef } from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

const SectionWrapper = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className, ...props }: SectionProps, ref: ForwardedRef<HTMLDivElement>) => {
    const classes = twMerge("min-h-[calc(100dvh-80px)] snap-start pt-4 pb-8 px-6 ", className);
    return (
      <section className={classes} ref={ref} {...props}>
        {children}
      </section>
    );
  }
);

export default SectionWrapper;
