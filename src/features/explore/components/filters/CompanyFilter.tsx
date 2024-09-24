import { Building2 } from "lucide-react";
import FilterLabel from "./FilterLabel";
import { Company } from "@/core/store/api/gamesApi/types/enums";
import Dropdown, { Option } from "@/core/components/Dropdown";
import { Control, Controller } from "react-hook-form";
import { enumToDropdownOptions } from "@/core/utils";
import { FiltersFormData } from "../../types";

const companyOptions: Option[] = enumToDropdownOptions(Company);

export default function CompanyFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="company"
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2">
            <FilterLabel label="Companies" icon={<Building2 size={20} />} />
            <Dropdown
              options={companyOptions}
              multiple={true}
              selectedOptions={field.value}
              setSelectedOptions={field.onChange}
            />
          </div>
        );
      }}
    ></Controller>
  );
}
