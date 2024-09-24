import { useForm } from "react-hook-form";
import CompanyFilter from "./filters/CompanyFilter";
import ConsoleFilter from "./filters/ConsoleFilter";
import GenresFilter from "./filters/GenresFilter";
import YearsFilter from "./filters/YearsFilter";
import { FiltersFormData } from "../types";
import { X } from "lucide-react";
import { Button } from "@/core/components/Button";

interface FormFiltersProps {
  onClose: () => void;
  onChange: (filters: FiltersFormData) => void;
  defaultValues: FiltersFormData;
}

export default function FormFilters({ onChange, defaultValues, onClose }: FormFiltersProps) {
  const { control, handleSubmit } = useForm<FiltersFormData>({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    onChange(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="md:hidden flex justify-end w-full px-4 relative ">
        <X size={30} strokeWidth={3} color="black" onClick={onClose} />
      </div>
      <div className="text-black p-8 flex flex-col h-fit gap-6">
        <ConsoleFilter control={control} />
        <CompanyFilter control={control} />
        <GenresFilter control={control} />
        <YearsFilter control={control} />
      </div>
      <div className="flex justify-end p-8">
        <Button type="submit" onClick={onClose}>
          Apply
        </Button>
      </div>
    </form>
  );
}
