"use client";

import { useState } from "react";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  officeLocations: { city: string; address: string }[];
  socialLinks: { platform: string; url: string }[];
  seoDefaults: { title: string; description: string; keywords: string };
}

const defaultSettings: SiteSettings = {
  siteName: "Green Studio Qatar",
  siteDescription: "Premium architecture, engineering, interior design, and construction supervision in Qatar and the Gulf region.",
  officeLocations: [
    { city: "Doha", address: "West Bay, Tower 12, Floor 8, Doha, Qatar" },
    { city: "Dubai", address: "DIFC, Gate Village 4, Level 3, Dubai, UAE" },
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/greenstudioqatar" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/greenstudioqatar" },
    { platform: "Twitter", url: "https://twitter.com/greenstudioqa" },
  ],
  seoDefaults: {
    title: "Green Studio Qatar — Architecture & Engineering",
    description: "Premium architecture, engineering, interior design, and construction supervision in Qatar and the Gulf region.",
    keywords: "architecture, interior design, engineering, qatar, doha, green studio",
  },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addLocation() {
    setSettings((prev) => ({
      ...prev,
      officeLocations: [...prev.officeLocations, { city: "", address: "" }],
    }));
  }

  function removeLocation(index: number) {
    setSettings((prev) => ({
      ...prev,
      officeLocations: prev.officeLocations.filter((_, i) => i !== index),
    }));
  }

  function updateLocation(index: number, field: "city" | "address", value: string) {
    setSettings((prev) => ({
      ...prev,
      officeLocations: prev.officeLocations.map((loc, i) =>
        i === index ? { ...loc, [field]: value } : loc
      ),
    }));
  }

  function addSocialLink() {
    setSettings((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }));
  }

  function removeSocialLink(index: number) {
    setSettings((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  }

  function updateSocialLink(index: number, field: "platform" | "url", value: string) {
    setSettings((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            saved
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
          }`}
        >
          {saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Site Name</label>
              <input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Office Locations</h2>
            <button
              onClick={addLocation}
              className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="space-y-3">
            {settings.officeLocations.map((loc, i) => (
              <div key={i} className="flex gap-3 items-start">
                <input
                  value={loc.city}
                  onChange={(e) => updateLocation(i, "city", e.target.value)}
                  className="w-32 px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="City"
                />
                <input
                  value={loc.address}
                  onChange={(e) => updateLocation(i, "address", e.target.value)}
                  className="flex-1 px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Address"
                />
                <button
                  onClick={() => removeLocation(i)}
                  className="p-2 rounded hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Social Links</h2>
            <button
              onClick={addSocialLink}
              className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="space-y-3">
            {settings.socialLinks.map((link, i) => (
              <div key={i} className="flex gap-3 items-start">
                <input
                  value={link.platform}
                  onChange={(e) => updateSocialLink(i, "platform", e.target.value)}
                  className="w-32 px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Platform"
                />
                <input
                  value={link.url}
                  onChange={(e) => updateSocialLink(i, "url", e.target.value)}
                  className="flex-1 px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="URL"
                />
                <button
                  onClick={() => removeSocialLink(i)}
                  className="p-2 rounded hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">SEO Defaults</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Default Title</label>
              <input
                value={settings.seoDefaults.title}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoDefaults: { ...settings.seoDefaults, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Default Description</label>
              <textarea
                value={settings.seoDefaults.description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoDefaults: { ...settings.seoDefaults, description: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Default Keywords</label>
              <input
                value={settings.seoDefaults.keywords}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seoDefaults: { ...settings.seoDefaults, keywords: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
