"use client";

import { useState, useEffect } from "react";

interface Service {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  summaryEn: string;
  summaryAr: string;
  heroImage: string;
  icon?: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.data);
      });
  }, []);

  function startEdit(service: Service) {
    setEditingId(service.id);
    setEditForm({ ...service });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  function saveEdit() {
    if (!editingId) return;
    setServices((prev) =>
      prev.map((s) => (s.id === editingId ? { ...s, ...editForm } : s))
    );
    cancelEdit();
  }

  function deleteService(id: string) {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
          + Add Service
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Name (EN)</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Name (AR)</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Summary</th>
                <th className="text-right py-3 px-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                  {editingId === service.id ? (
                    <td colSpan={4} className="py-3 px-4">
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <input
                            value={editForm.nameEn || ""}
                            onChange={(e) => setEditForm({ ...editForm, nameEn: e.target.value })}
                            className="flex-1 px-3 py-1.5 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                            placeholder="Name (EN)"
                          />
                          <input
                            value={editForm.nameAr || ""}
                            onChange={(e) => setEditForm({ ...editForm, nameAr: e.target.value })}
                            className="flex-1 px-3 py-1.5 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                            placeholder="Name (AR)"
                          />
                        </div>
                        <textarea
                          value={editForm.summaryEn || ""}
                          onChange={(e) => setEditForm({ ...editForm, summaryEn: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                          placeholder="Summary"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button onClick={saveEdit} className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm">Save</button>
                          <button onClick={cancelEdit} className="px-3 py-1.5 rounded bg-neutral-700 text-white text-sm">Cancel</button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="py-3 px-4 text-white font-medium">{service.nameEn}</td>
                      <td className="py-3 px-4 text-neutral-300">{service.nameAr}</td>
                      <td className="py-3 px-4 text-neutral-400 max-w-xs truncate">{service.summaryEn}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(service)}
                            className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteService(service.id)}
                            className="p-1.5 rounded hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
