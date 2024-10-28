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

interface SelectCategoryProps {
  value: string;
  onChange: (value: string) => void;
  city: cityType[];
}
function SelectedContry({ value, onChange, city }: SelectCategoryProps) {
  return (
    <Select onValueChange={onChange} value={value} dir="rtl">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="انتخاب دسته بندی" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>دسته بندی</SelectLabel>
          {city.map((item) => (
            <SelectItem value={item.center}>{item.center}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectedContry;
