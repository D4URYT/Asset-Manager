"use client";

import { useState, useCallback, useMemo } from "react";
import { COMPANIES_DATA } from "../data/companies.data";
import { Company, CompanyStatus, StatusFilter } from "../types/companies.types";

interface UseCompaniesReturn {
  companies: Company[];
  search: string;
  activeFilter: StatusFilter;
  activeType: string;
  selectedCompany: Company | null;
  rejectModalVisible: boolean;
  companyToReject: Company | null;
  rejectionReason: string;
  toastVisible: boolean;
  toastMessage: string;
  toastType: "success" | "error";
  filteredCompanies: Company[];
  counters: Record<CompanyStatus | "all", number>;
  setSearch: (v: string) => void;
  setActiveFilter: (v: StatusFilter) => void;
  setActiveType: (v: string) => void;
  setRejectionReason: (v: string) => void;
  viewDetail: (c: Company | null) => void;
  approve: (id: string) => void;
  openRejectModal: (c: Company) => void;
  closeRejectModal: () => void;
  confirmRejection: () => void;
}

export function useCompanies(): UseCompaniesReturn {
  const [companies, setCompanies] = useState<Company[]>(COMPANIES_DATA);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");
  const [activeType, setActiveType] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [companyToReject, setCompanyToReject] = useState<Company | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }, []);

  const updateStatus = useCallback((id: string, status: "approved" | "rejected", reason?: string) => {
    setCompanies((prev) =>
      prev.map((c) => c.id === id ? { ...c, status, rejectionReason: reason } : c)
    );
    setSelectedCompany((prev) =>
      prev?.id === id ? { ...prev, status, rejectionReason: reason } : prev
    );
  }, []);

  const approve = useCallback((id: string) => {
    updateStatus(id, "approved");
    showToast("Company approved and active on the platform", "success");
  }, [updateStatus, showToast]);

  const openRejectModal = useCallback((c: Company) => {
    setCompanyToReject(c);
    setRejectionReason("");
    setRejectModalVisible(true);
  }, []);

  const closeRejectModal = useCallback(() => {
    setRejectModalVisible(false);
    setCompanyToReject(null);
    setRejectionReason("");
  }, []);

  const confirmRejection = useCallback(() => {
    if (!companyToReject) return;
    updateStatus(companyToReject.id, "rejected", rejectionReason || "No reason provided");
    closeRejectModal();
    showToast("Company rejected. The representative will be notified.", "error");
  }, [companyToReject, rejectionReason, updateStatus, closeRejectModal, showToast]);

  const counters = useMemo(() => ({
    all:      companies.length,
    pending:  companies.filter((c) => c.status === "pending").length,
    approved: companies.filter((c) => c.status === "approved").length,
    rejected: companies.filter((c) => c.status === "rejected").length,
  }), [companies]);

  const filteredCompanies = useMemo(() => {
    let list = [...companies];

    if (activeFilter !== "all") {
      list = list.filter((c) => c.status === activeFilter);
    }
    if (activeType !== "All") {
      list = list.filter((c) => c.type === activeType);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.taxId.toLowerCase().includes(q) ||
          c.representative.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q)
      );
    }

    // Pending first
    const order: Record<CompanyStatus, number> = { pending: 0, approved: 1, rejected: 2 };
    list.sort((a, b) => order[a.status] - order[b.status]);

    return list;
  }, [companies, activeFilter, activeType, search]);

  return {
    companies, search, activeFilter, activeType,
    selectedCompany, rejectModalVisible, companyToReject,
    rejectionReason, toastVisible, toastMessage, toastType,
    filteredCompanies, counters,
    setSearch, setActiveFilter, setActiveType, setRejectionReason,
    viewDetail: setSelectedCompany,
    approve, openRejectModal, closeRejectModal, confirmRejection,
  };
}