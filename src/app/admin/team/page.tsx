"use client";

import { useState, useEffect } from "react";

interface TeamMember {
  id: string;
  name: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  photo?: string;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TeamMember>>({});

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMembers(data.data);
      });
  }, []);

  function startEdit(member: TeamMember) {
    setEditingId(member.id);
    setEditForm({ ...member });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  function saveEdit() {
    if (!editingId) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === editingId ? { ...m, ...editForm } : m))
    );
    cancelEdit();
  }

  function deleteMember(id: string) {
    if (confirm("Are you sure you want to remove this team member?")) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Team</h1>
        <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
          + Add Member
        </button>
      </div>

      {editingId ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Edit Member</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Name</label>
                <input
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Role (EN)</label>
                <input
                  value={editForm.roleEn || ""}
                  onChange={(e) => setEditForm({ ...editForm, roleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Role (AR)</label>
              <input
                value={editForm.roleAr || ""}
                onChange={(e) => setEditForm({ ...editForm, roleAr: e.target.value })}
                className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Bio (EN)</label>
              <textarea
                value={editForm.bioEn || ""}
                onChange={(e) => setEditForm({ ...editForm, bioEn: e.target.value })}
                className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600 text-white text-sm"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={saveEdit} className="px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium">Save</button>
              <button onClick={cancelEdit} className="px-4 py-2 rounded bg-neutral-700 text-white text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-start gap-4">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-neutral-700 flex items-center justify-center text-neutral-300 text-lg font-medium shrink-0">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-white font-medium truncate">{member.name}</h3>
                <p className="text-neutral-400 text-sm truncate">{member.roleEn}</p>
              </div>
            </div>

            <p className="text-neutral-500 text-xs mt-3 line-clamp-2">{member.bioEn}</p>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-800">
              <button
                onClick={() => startEdit(member)}
                className="flex-1 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMember(member.id)}
                className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 text-xs font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
