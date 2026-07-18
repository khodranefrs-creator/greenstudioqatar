"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  typology: string;
  locationCity: string;
  locationCountry: string;
  year: number;
  sizeSqm: number;
  status: string;
  featuredWeight: number;
  services: string[];
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Project>("titleEn");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterTypology, setFilterTypology] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data);
      });
  }, []);

  function handleSort(field: keyof Project) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const filtered = projects
    .filter((p) => {
      const matchSearch =
        p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
        p.locationCity.toLowerCase().includes(search.toLowerCase()) ||
        p.locationCountry.toLowerCase().includes(search.toLowerCase());
      const matchTypology = !filterTypology || p.typology === filterTypology;
      return matchSearch && matchTypology;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  function startEdit(project: Project) {
    setEditingId(project.id);
    setEditForm({ ...project });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  function saveEdit() {
    if (!editingId) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === editingId ? { ...p, ...editForm } : p))
    );
    cancelEdit();
  }

  function toggleFeatured(id: string) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, featuredWeight: p.featuredWeight > 0 ? 0 : 5 } : p
      )
    );
  }

  function deleteProject(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
          + Add Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
        />
        <select
          value={filterTypology}
          onChange={(e) => setFilterTypology(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
        >
          <option value="">All Typologies</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="government">Government</option>
          <option value="hospitality">Hospitality</option>
          <option value="interiors">Interiors</option>
        </select>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th
                  onClick={() => handleSort("titleEn")}
                  className="text-left py-3 px-4 text-neutral-400 font-medium cursor-pointer hover:text-white"
                >
                  Title <span className="text-neutral-600 ml-1">{sortField === "titleEn" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}</span>
                </th>
                <th
                  onClick={() => handleSort("typology")}
                  className="text-left py-3 px-4 text-neutral-400 font-medium cursor-pointer hover:text-white"
                >
                  Typology <span className="text-neutral-600 ml-1">{sortField === "typology" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}</span>
                </th>
                <th
                  onClick={() => handleSort("locationCity")}
                  className="text-left py-3 px-4 text-neutral-400 font-medium cursor-pointer hover:text-white"
                >
                  Location <span className="text-neutral-600 ml-1">{sortField === "locationCity" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}</span>
                </th>
                <th
                  onClick={() => handleSort("year")}
                  className="text-left py-3 px-4 text-neutral-400 font-medium cursor-pointer hover:text-white"
                >
                  Year <span className="text-neutral-600 ml-1">{sortField === "year" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}</span>
                </th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Featured</th>
                <th className="text-right py-3 px-4 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={project.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                  {editingId === project.id ? (
                    <td colSpan={7} className="py-3 px-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          value={editForm.titleEn || ""}
                          onChange={(e) => setEditForm({ ...editForm, titleEn: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                          placeholder="Title"
                        />
                        <input
                          value={editForm.typology || ""}
                          onChange={(e) => setEditForm({ ...editForm, typology: e.target.value })}
                          className="w-32 px-3 py-1.5 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                          placeholder="Typology"
                        />
                        <button onClick={saveEdit} className="px-3 py-1.5 rounded bg-emerald-600 text-white text-sm">Save</button>
                        <button onClick={cancelEdit} className="px-3 py-1.5 rounded bg-neutral-700 text-white text-sm">Cancel</button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="py-3 px-4 text-white font-medium">{project.titleEn}</td>
                      <td className="py-3 px-4 text-neutral-300 capitalize">{project.typology}</td>
                      <td className="py-3 px-4 text-neutral-300">{project.locationCity}, {project.locationCountry}</td>
                      <td className="py-3 px-4 text-neutral-300">{project.year}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : project.status === "ongoing"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-neutral-500/20 text-neutral-400"
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`w-8 h-5 rounded-full transition-colors relative ${
                            project.featuredWeight > 0 ? "bg-emerald-600" : "bg-neutral-700"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                              project.featuredWeight > 0 ? "left-3.5" : "left-0.5"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(project)}
                            className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
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
