"use client";

import { useState, useRef, useCallback } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.ms-autocad",
  "application/octet-stream",
];

const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.dwg";
const MAX_FILE_SIZE_MB = 25;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FileItem {
  id: string;
  file: File;
  progress: number;
  error?: string;
}

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
}

export default function FileUpload({ onFilesChange, maxFiles = 5 }: FileUploadProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const incoming = Array.from(newFiles);
      setFiles((prev) => {
        const available = maxFiles - prev.length;
        const toAdd = incoming.slice(0, available).map((file) => ({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          progress: 0,
          error: file.size > MAX_FILE_SIZE_BYTES ? `Max size is ${MAX_FILE_SIZE_MB}MB` : undefined,
        }));

        const updated = [...prev, ...toAdd];
        onFilesChange?.(updated.filter((f) => !f.error).map((f) => f.file));

        // Simulate upload progress for valid files
        toAdd.forEach((item) => {
          if (item.error) return;
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 30 + 10;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
            }
            setFiles((curr) =>
              curr.map((f) => (f.id === item.id ? { ...f, progress } : f))
            );
          }, 200);
        });

        return updated;
      });
    },
    [maxFiles, onFilesChange]
  );

  const removeFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const updated = prev.filter((f) => f.id !== id);
        onFilesChange?.(updated.filter((f) => !f.error).map((f) => f.file));
        return updated;
      });
    },
    [onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border border-dashed p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-charcoal bg-charcoal/5"
            : "border-border hover:border-muted"
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mx-auto mb-2 text-muted"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-sm text-muted">
          Drop files here or <span className="underline">browse</span>
        </p>
        <p className="text-xs text-muted/60 mt-1">
          PDF, JPG, PNG, DWG up to {MAX_FILE_SIZE_MB}MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-charcoal truncate">{item.file.name}</p>
                {item.error ? (
                  <p className="text-xs text-red-600">{item.error}</p>
                ) : (
                  <div className="mt-1 h-0.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(item.id)}
                className="text-muted hover:text-charcoal transition-colors shrink-0 p-1"
                aria-label={`Remove ${item.file.name}`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="3" x2="11" y2="11" />
                  <line x1="11" y1="3" x2="3" y2="11" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
