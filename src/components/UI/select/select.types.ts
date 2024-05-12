import { SetStateType } from "@/types/main.types";

export interface ISelectProps {
   placeholder: string;
   isMultiple?: boolean;
   isSearchable?: boolean;
   classnames?: string;
   maxOptions?: number;
   inputHandler?: (val: any) => Promise<any>;
   selectedValue: SelectValuesType;
   setSelectedValue: SetStateType<SelectValuesType>;
   options?: ISelectValue[];
}

export interface ISelectValue {
   label: React.ReactNode;
   id: string | number;
}

export type SelectValuesType = ISelectValue | ISelectValue[] | null;
