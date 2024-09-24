interface FilterLabelProps {
  label: string;
  icon: React.ReactNode;
}

export default function FilterLabel({ label, icon }: FilterLabelProps) {
  return (
    <div className="flex items-end gap-2 ml-1">
      {icon}
      <h6 className="">{label}</h6>
    </div>
  );
}
