"use client";

import React from "react";
import { useCompanies } from "../hooks/useCompanies";
import { companiesTheme as t, globalStyles } from "../theme/companies.theme";
import { Toast, RejectModal } from "../ui/CompaniesUI";
import { CompaniesHeaderSection } from "../sections/CompaniesHeaderSection";
import { CompaniesListSection } from "../sections/CompaniesListSection";
import { CompaniesDetailPanel } from "../sections/CompaniesDetailPanel";
import { Sidebar } from "../../../seller/dashboard/dashboards";
import { MODERATOR_NAV_ITEMS } from "../../moderationNav";

export default function CompaniesPage() {
  const {
    search,
    activeFilter,
    activeType,
    selectedCompany,
    rejectModalVisible,
    companyToReject,
    rejectionReason,
    toastVisible,
    toastMessage,
    toastType,
    filteredCompanies,
    counters,
    setSearch,
    setActiveFilter,
    setActiveType,
    setRejectionReason,
    viewDetail,
    approve,
    openRejectModal,
    closeRejectModal,
    confirmRejection,
  } = useCompanies();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: t.bgMain,
        color: t.textPrimary,
      }}
    >
      <style>{globalStyles(t)}</style>

      <Sidebar navItems={MODERATOR_NAV_ITEMS} />

      <main
        style={{
          flex: 1,
          overflow: "auto",
          padding: "32px",
          marginRight: selectedCompany ? 440 : 0,
          transition: "margin-right 0.25s ease",
        }}
      >
        <CompaniesHeaderSection />

        <CompaniesListSection
          companies={filteredCompanies}
          search={search}
          activeFilter={activeFilter}
          activeType={activeType}
          counters={counters}
          onSearchChange={setSearch}
          onFilterChange={setActiveFilter}
          onTypeChange={setActiveType}
          onViewDetail={viewDetail}
          onApprove={approve}
          onReject={openRejectModal}
        />
      </main>

      {/* Detail side panel */}
      {selectedCompany && (
        <CompaniesDetailPanel
          company={selectedCompany}
          onClose={() => viewDetail(null)}
          onApprove={approve}
          onReject={openRejectModal}
        />
      )}

      {/* Reject modal */}
      {rejectModalVisible && companyToReject && (
        <RejectModal
          companyName={companyToReject.name}
          reason={rejectionReason}
          onReasonChange={setRejectionReason}
          onConfirm={confirmRejection}
          onCancel={closeRejectModal}
        />
      )}

      <Toast message={toastMessage} visible={toastVisible} type={toastType} />
    </div>
  );
}
