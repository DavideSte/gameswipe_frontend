import { FieldError } from "react-hook-form";

interface InputWrapperProps extends React.PropsWithChildren {
  label: string;
  name: string;
  error: FieldError | undefined;
}

export default function InputWrapper({ label, name, error, children }: InputWrapperProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="flex gap-2 ml-[3px]">
        <p className="font-semibold text-sm">{label}</p>
        {error && <p className="font-semibold text-xs text-red-400">{error.message}</p>}
      </label>
      {children}
    </div>
  );
}
