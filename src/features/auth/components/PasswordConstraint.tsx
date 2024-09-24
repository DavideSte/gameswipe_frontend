import { CircleCheckBig, Circle } from "lucide-react";

export default function PasswordConstraint({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <div
      className={`flex flex-row items-center text-cream gap-2 ${
        isValid ? "opacity-100" : "opacity-70"
      }`}
    >
      <div className="flex-shrink-0">
        {isValid ? (
          <CircleCheckBig size={14} strokeWidth={3} stroke="currentColor" />
        ) : (
          <Circle size={14} strokeWidth={3} stroke="currentColor" />
        )}
      </div>
      <p className="flex-1 text-sm">{text}</p>
    </div>
  );
}
