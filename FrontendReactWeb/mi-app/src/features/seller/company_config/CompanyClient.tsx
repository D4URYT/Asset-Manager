"use client";
// src/feature/company/CompanyClient.tsx

import { useState, useCallback } from "react";
import { Employee } from "./types/company.types";
import T from "@/features/seller/company_config/theme/appTheme";

import { useCompany }    from "./hooks/useCompany";
import { useEmployees }  from "./hooks/useEmployees";

import CompanyHeader      from "./sections/CompanyHeader";
import CompanyInfo        from "./sections/CompanyInfo";
import CompanySalesChart  from "./sections/CompanySalesChart";
import EmployeesSection   from "./sections/EmployeesSection";

import EditCompanyModal from "./ui/EditCompanyModal";
import EmployeeModal    from "./ui/EmployeeModal";
import Toast            from "@/features/seller/orders/ui/Toast";   // reutilizamos el Toast
import { Sidebar } from "../dashboard/dashboards";
import { NAV_ITEMS } from "../dashboard/data/chart.data";
import { dashboardTheme, globalStyles } from "../dashboard/theme/dashboard.theme";

type ToastType = "success" | "error" | "warning" | "info";
interface ToastState { msg: string; type: ToastType; }

export default function CompanyClient() {
  const { company, updateCompany }                      = useCompany();
  const { employees, addEmployee, updateEmployee, toggleStatus } =
    useEmployees(company.employees);

  const [editCompanyOpen, setEditCompanyOpen] = useState(false);
  const [employeeModal,   setEmployeeModal]   = useState<Employee | null | undefined>(undefined);
  // undefined = cerrado, null = nuevo, Employee = editar
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((msg: string, type: ToastType = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const handleSaveCompany = useCallback((fields: Partial<typeof company>) => {
    updateCompany(fields);
    showToast("Empresa actualizada correctamente");
  }, [updateCompany, showToast]);

  const handleSaveEmployee = useCallback((emp: Employee) => {
    if (employeeModal === null) {
      addEmployee(emp);
      showToast("Empleado agregado");
    } else {
      updateEmployee(emp);
      showToast("Empleado actualizado");
    }
  }, [employeeModal, addEmployee, updateEmployee, showToast]);

  const handleToggle = useCallback((id: string) => {
    const emp = employees.find((e) => e.id === id);
    toggleStatus(id);
    showToast(
      emp?.status === "active" ? "Empleado deshabilitado" : "Empleado activado",
      emp?.status === "active" ? "error" : "success"
    );
  }, [employees, toggleStatus, showToast]);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: T.bgMain,
      color: T.text1,
    }}>
      <style>{globalStyles(dashboardTheme)}</style>
      <Sidebar navItems={NAV_ITEMS} />
      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
      {/* Page title */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 14, fontWeight: 600, color: T.text3, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Configuración
        </h1>
        <p style={{ fontSize: 22, fontWeight: 700, color: T.text1, margin: "4px 0 0" }}>
          Mi Empresa
        </p>
      </div>

      <CompanyHeader
        company={{ ...company, employees }}
        onEdit={() => setEditCompanyOpen(true)}
      />

      {/* Two-column layout: info + chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, marginBottom: 20 }}>
        <CompanyInfo company={company} />
        <CompanySalesChart salesHistory={company.salesHistory} />
      </div>

      <EmployeesSection
        employees={employees}
        onAdd={() => setEmployeeModal(null)}
        onEdit={(emp) => setEmployeeModal(emp)}
        onToggle={handleToggle}
      />

      {/* Modals */}
      {editCompanyOpen && (
        <EditCompanyModal
          company={company}
          onClose={() => setEditCompanyOpen(false)}
          onSave={handleSaveCompany}
        />
      )}

      {employeeModal !== undefined && (
        <EmployeeModal
          employee={employeeModal}
          onClose={() => setEmployeeModal(undefined)}
          onSave={handleSaveEmployee}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} />}
      </main>
    </div>
  );
}