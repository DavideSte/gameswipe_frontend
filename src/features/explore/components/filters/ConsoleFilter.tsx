import Dropdown from "@/core/components/Dropdown";
import { Joystick } from "lucide-react";
import FilterLabel from "./FilterLabel";
import { Control, Controller } from "react-hook-form";
import { Console } from "@/core/store/api/gamesApi/types/enums";
import { enumToDropdownOptions } from "@/core/utils";
import { FiltersFormData } from "../../types";

const consoleOptions = enumToDropdownOptions(Console);

export default function ConsoleFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="console"
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2">
            <FilterLabel label="Console" icon={<Joystick size={20} />} />
            <Dropdown
              options={consoleOptions}
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
