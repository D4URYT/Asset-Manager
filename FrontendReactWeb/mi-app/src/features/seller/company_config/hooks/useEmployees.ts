"use client";
// src/feature/company/hooks/useEmployees.ts

import { useState, useCallback } from "react";
import { Employee, EmployeeStatus } from "../types/company.types";

export function useEmployees(initial: Employee[]) {
  const [employees, setEmployees] = useState<Employee[]>(initial);

  const addEmployee = useCallback((emp: Employee) => {
    setEmployees((prev) => [emp, ...prev]);
  }, []);

  const updateEmployee = useCallback((updated: Employee) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  }, []);

  const toggleStatus = useCallback((id: string) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "active" ? "disabled" : "active" as EmployeeStatus }
          : e
      )
    );
  }, []);

  return { employees, addEmployee, updateEmployee, toggleStatus };
}