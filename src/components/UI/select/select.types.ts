import { SetStateType } from "@/types/main.types";

export interface ISelectProps {
   children?: React.JSX.Element | React.JSX.Element[];
   placeholder: string;
   isMultiple?: boolean;
   isSearchable?: boolean;
   classnames?: string;
   maxOptions?: number;
   inputHandler?: (val: any) => Promise<any>;
   value: SelectValuesType;
   setValue: SetStateType<SelectValuesType>;
}

export interface IControlledValue {
   name: string;
   id: string;
}

export type SelectValuesType = IControlledValue | IControlledValue[] | null;
