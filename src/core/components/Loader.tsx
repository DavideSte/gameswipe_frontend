import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export default function Loader({ message, className, ...rest }: LoaderProps) {
  const baseClasses = "flex justify-center items-center pt-8";
  const classes = twMerge(baseClasses, className);
  return (
    <div className={classes} {...rest}>
      <LoaderCircle strokeWidth={3} className="mr-2 h-5 w-5 animate-spin" />
      <h6>{message || "Loading..."}</h6>
    </div>
  );
}
