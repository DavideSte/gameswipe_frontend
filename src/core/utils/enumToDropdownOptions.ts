import { Option } from "@/core/components/Dropdown";

export function enumToDropdownOptions<T extends { [key: string]: number | string }>(
  enumObj: T
): Option[] {
  return Object.entries(enumObj).reduce<Option[]>((options, [key, value]) => {
    if (typeof value === "number") {
      options.push({ value: value.toString(), label: key });
    }
    return options;
  }, []);
}
