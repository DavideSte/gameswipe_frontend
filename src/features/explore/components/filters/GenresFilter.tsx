import { Tag } from "lucide-react";
import FilterLabel from "./FilterLabel";
import { Genre } from "@/core/store/api/gamesApi/types/enums";
import Dropdown from "@/core/components/Dropdown";
import { Control, Controller } from "react-hook-form";
import { enumToDropdownOptions } from "@/core/utils";
import { FiltersFormData } from "../../types";

const genresOptions = enumToDropdownOptions(Genre);

export default function GenresFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="genres"
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2">
            <FilterLabel label="Genres" icon={<Tag size={20} />} />
            <Dropdown
              options={genresOptions}
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
