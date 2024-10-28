import { cityType } from "@/lib/Type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Categories } from "@/lib/CategoryData";
interface SelectCategoryProps {
  value: string;
  onChange: (value: string) => void;
}
function SelectCategory({ value, onChange }: SelectCategoryProps) {
  return (
    <Select onValueChange={onChange} value={value} dir="rtl">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="انتخاب دسته بندی" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>دسته بندی</SelectLabel>
          {Categories.map((category) => (
            <SelectItem value={category.label}>{category.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectCategory;
