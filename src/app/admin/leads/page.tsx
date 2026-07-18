"use client";

import { useState, useEffect, useMemo } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  country: string;
  message: string;
  status: string;
  createdAt: string;
  notes: string;
}

const stages = [
  { key: "new", label: "New", color: "border-blue-500", bg: "bg-blue-500/10" },
  { key: "contacted", label: "Contacted", color: "border-amber-500", bg: "bg-amber-500/10" },
  { key: "qualified", label: "Qualified", color: "border-purple-500", bg: "bg-purple-500/10" },
  { key: "proposal-sent", label: "Proposal Sent", color: "border-cyan-500", bg: "bg-cyan-500/10" },
  { key: "won", label: "Won", color: "border-emerald-500", bg: "bg-emerald-500/10" },
  { key: "lost", label: "Lost", color: "border-red-500", bg: "bg-red-500/10" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLeads(data.data);
      });
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchStatus = !statusFilter || lead.status === statusFilter;
      let matchDate = true;
      if (dateFilter) {
        const leadDate = new Date(lead.createdAt).toISOString().split("T")[0];
        matchDate = leadDate >= dateFilter;
      }
      return matchStatus && matchDate;
    });
  }, [leads, statusFilter, dateFilter]);

  function moveToStage(leadId: string, newStatus: string) {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  }

  function exportToCSV() {
    const headers = ["Name", "Email", "Phone", "Project Type", "Services", "Budget", "Timeline", "Country", "Status", "Date", "Message"];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.projectType,
      lead.services.join("; "),
      lead.budgetRange,
      lead.timeline,
      lead.country,
      lead.status,
      new Date(lead.createdAt).toLocaleDateString(),
      `"${lead.message.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Leads Pipeline</h1>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Statuses</option>
            {stages.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={exportToCSV}
            className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stages.map((stage) => {
          const count = filteredLeads.filter((l) => l.status === stage.key).length;
          return (
            <div key={stage.key} className={`rounded-xl border-t-2 ${stage.color} ${stage.bg} p-4`}>
              <p className="text-sm text-neutral-400">{stage.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{count}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageLeads = filteredLeads.filter((l) => l.status === stage.key);
          return (
            <div key={stage.key} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <div className={`px-4 py-3 border-b border-neutral-800 ${stage.bg}`}>
                <h3 className="text-sm font-medium text-white">{stage.label}</h3>
              </div>
              <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
                {stageLeads.length === 0 ? (
                  <p className="text-neutral-600 text-xs text-center py-4">No leads</p>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 cursor-pointer hover:border-neutral-600 transition-colors"
                    >
                      <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                      <p className="text-neutral-400 text-xs truncate">{lead.projectType}</p>
                      <p className="text-neutral-500 text-xs mt-1">{lead.budgetRange}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {lead.services.slice(0, 2).map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-400 text-[10px]">
                            {s.split("-").slice(0, 2).join(" ")}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-1 mt-2">
                        {stages
                          .filter((s) => s.key !== lead.status)
                          .slice(0, 3)
                          .map((s) => (
                            <button
                              key={s.key}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveToStage(lead.id, s.key);
                              }}
                              className="px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-500 text-[10px] hover:bg-neutral-600 hover:text-neutral-300 transition-colors"
                              title={`Move to ${s.label}`}
                            >
                              → {s.label.slice(0, 4)}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setSelectedLead(null)}>
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h2 className="text-lg font-semibold text-white">{selectedLead.name}</h2>
              <button onClick={() => setSelectedLead(null)} className="text-neutral-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-500">Email</p>
                  <p className="text-sm text-white">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Phone</p>
                  <p className="text-sm text-white">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Project Type</p>
                  <p className="text-sm text-white">{selectedLead.projectType}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Budget</p>
                  <p className="text-sm text-white">{selectedLead.budgetRange}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Timeline</p>
                  <p className="text-sm text-white">{selectedLead.timeline}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Country</p>
                  <p className="text-sm text-white">{selectedLead.country}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-500">Services</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedLead.services.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-500">Message</p>
                <p className="text-sm text-neutral-300 mt-1">{selectedLead.message}</p>
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-2">Move to Stage</p>
                <div className="flex flex-wrap gap-2">
                  {stages.map((stage) => (
                    <button
                      key={stage.key}
                      onClick={() => moveToStage(selectedLead.id, stage.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedLead.status === stage.key
                          ? `${stage.color} border ${stage.bg} text-white`
                          : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                      }`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <p className="text-xs text-neutral-500">Notes</p>
                  <p className="text-sm text-neutral-300 mt-1">{selectedLead.notes}</p>
                </div>
              )}

              <div className="text-xs text-neutral-600">
                Received: {new Date(selectedLead.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
