import { CalendarRange } from "lucide-react";
import FilterLabel from "./FilterLabel";
import MultiRangeSlider from "@/core/components/multiRangeSlider/MultiRangeSlider";
import { Control, Controller } from "react-hook-form";
import { FiltersFormData } from "../../types";

const MIN_YEAR = 1980;
const MAX_YEAR = new Date().getFullYear();

export default function YearsFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="years"
      render={({ field }) => {
        return (
          <div className="flex flex-col gap-2">
            <FilterLabel label="Years" icon={<CalendarRange size={20} />} />
            <div className="py-4 ">
              <MultiRangeSlider
                min={MIN_YEAR}
                max={MAX_YEAR}
                startingMax={field.value[1] || MAX_YEAR}
                startingMin={field.value[0] || MIN_YEAR}
                onChange={(min, max) => {
                  field.onChange([min, max]);
                }}
              />
            </div>
          </div>
        );
      }}
    ></Controller>
  );
}
