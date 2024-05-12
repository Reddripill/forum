"use client";
import React from "react";
import Select from "./Select";
import { useQuery } from "@tanstack/react-query";

const SelectTags = () => {
   // useQuery()
   return (
      <Select placeholder="Choose tags" maxOptions={3} isSearchable isMultiple>
         <></>
      </Select>
   );
};

export default SelectTags;
