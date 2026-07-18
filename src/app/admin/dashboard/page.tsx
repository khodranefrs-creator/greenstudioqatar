"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  projectType: string;
  services: string[];
  budgetRange: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, projectsRes, blogRes, teamRes] = await Promise.all([
          fetch("/api/admin/leads"),
          fetch("/api/projects"),
          fetch("/api/blog"),
          fetch("/api/team"),
        ]);

        const leadsData = await leadsRes.json();
        const projectsData = await projectsRes.json();
        const blogData = await blogRes.json();
        const teamData = await teamRes.json();

        if (leadsData.success) setLeads(leadsData.data);
        if (projectsData.success) setProjectCount(projectsData.data.length);
        if (blogData.success) setBlogCount(blogData.data.length);
        if (teamData.success) setTeamCount(teamData.data.length);
      } catch {
        console.error("Failed to fetch dashboard data");
      }
    }
    fetchData();
  }, []);

  const activeLeads = leads.filter((l) => l.status !== "won" && l.status !== "lost").length;

  const stats = [
    { label: "Total Projects", value: projectCount, color: "bg-emerald-500" },
    { label: "Active Leads", value: activeLeads, color: "bg-blue-500" },
    { label: "Published Posts", value: blogCount, color: "bg-amber-500" },
    { label: "Team Members", value: teamCount, color: "bg-purple-500" },
  ];

  const statusCounts = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const pipelineStages = [
    { key: "new", label: "New", color: "bg-blue-500" },
    { key: "contacted", label: "Contacted", color: "bg-amber-500" },
    { key: "qualified", label: "Qualified", color: "bg-purple-500" },
    { key: "proposal-sent", label: "Proposal Sent", color: "bg-cyan-500" },
    { key: "won", label: "Won", color: "bg-emerald-500" },
    { key: "lost", label: "Lost", color: "bg-red-500" },
  ];

  const maxCount = Math.max(...Object.values(statusCounts), 1);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-8 rounded-full ${stat.color}`} />
              <div>
                <p className="text-sm text-neutral-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pipeline Overview</h2>
          <div className="space-y-3">
            {pipelineStages.map((stage) => {
              const count = statusCounts[stage.key] || 0;
              const width = (count / maxCount) * 100;
              return (
                <div key={stage.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-neutral-400">{stage.label}</span>
                    <span className="text-sm font-medium text-white">{count}</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-sm text-neutral-200">New Project</span>
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-sm text-neutral-200">New Blog Post</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <span className="text-sm text-neutral-200">View Reports</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Leads</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Project Type</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Budget</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-neutral-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                  <td className="py-3 px-4 text-white">{lead.name}</td>
                  <td className="py-3 px-4 text-neutral-300">{lead.projectType}</td>
                  <td className="py-3 px-4 text-neutral-300">{lead.budgetRange}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === "new" ? "bg-blue-500/20 text-blue-400" :
                      lead.status === "won" ? "bg-emerald-500/20 text-emerald-400" :
                      lead.status === "lost" ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
