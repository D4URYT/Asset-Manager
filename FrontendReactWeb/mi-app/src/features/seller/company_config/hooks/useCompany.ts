"use client";
// src/feature/company/hooks/useCompany.ts

import { useState, useCallback } from "react";
import { Company } from "../types/company.types";
import mockCompany from "../data/mockCompany";

type CompanyEditable = Pick<Company, "name" | "legalName" | "rnc" | "email" | "phone" | "address" | "city" | "country">;

export function useCompany() {
  const [company, setCompany] = useState<Company>(mockCompany);

  const updateCompany = useCallback((fields: Partial<CompanyEditable>) => {
    setCompany((prev) => ({ ...prev, ...fields }));
  }, []);

  return { company, updateCompany };
}