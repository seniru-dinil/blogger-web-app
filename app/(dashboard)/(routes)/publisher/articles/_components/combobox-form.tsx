import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { CategoryOption, CategoryType } from "@/model/article.model";
import { getCategoryList } from "@/services/article.service";
import { CirclePlus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

interface ComboboxFormProps {
  onChange: (value: CategoryType) => void;
  value?: CategoryType;
}

export default function ComboboxForm({ onChange, value }: ComboboxFormProps) {
  const options: CategoryOption[] = [
    {
      label: "TECH",
      value: "TECH",
    },
    {
      label: "JAVA",
      value: "JAVA",
    },
    {
      label: "SPRING BOOT",
      value: "SPRING BOOT ",
    },
  ];
  const [opt, setOpt] = useState<CategoryOption[]>(options);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await getCategoryList();
      const cato = data.map((c: any) => {
        return {
          label: c.name,
          value: c.name,
        };
      });
      setOpt(cato);
    }
    fetchCategories();
  }, []);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <div className="bg-slate-100 p-4 rounded-sm grid gap-3">
      <div className="flex justify-between items-center ">
        <p className="p-0 m-0 font-medium ">Article category</p>
        <Button variant={"ghost"} onClick={() => setIsEdit((prev) => !prev)}>
          {isEdit ? (
            <p className="font-medium text-md">Cancel</p>
          ) : value ? (
            <div className="flex gap-2 items-center">
              <SquarePen strokeWidth={2} />{" "}
              <p className="font-medium text-md">Edit category</p>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <CirclePlus />
              <p className="font-medium text-md">Add category</p>
            </div>
          )}
        </Button>
      </div>
      {isEdit ? (
        value ? (
          <Combobox
            onChange={(val: CategoryType) => {
              onChange(val);
              setIsEdit(false);
            }}
            options={opt}
            value={value}
          />
        ) : (
          <Combobox
            onChange={(val) => {
              onChange(val);
              setIsEdit(false);
            }}
            options={opt}
          />
        )
      ) : value ? (
        <p className="text-md text-gray-700">{value}</p>
      ) : (
        <p className="text-md text-gray-700">add category</p>
      )}
    </div>
  );
}
