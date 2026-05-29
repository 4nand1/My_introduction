import { useRef } from "react";
import Image from "next/image";
import { Photo } from "../types";

export function MemorySection({ photos, captions, uploading, onUpload, onDelete, onCaption }: {
  photos: Photo[];
  captions: Record<string, string>;
  uploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (url: string) => void;
  onCaption: (name: string, value: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div
        className="border border-dashed border-white/[0.1] hover:border-[#6d63ff]/40 hover:bg-[#6d63ff]/[0.03] rounded-2xl p-10 text-center transition-colors cursor-pointer mb-8"
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
        <div className="flex flex-col items-center gap-3">
          <span className="text-2xl text-[#6d63ff]/40">↑</span>
          <p className="font-mono text-xs text-[#56545e] tracking-wider">
            {uploading ? "uploading..." : "click to upload photos"}
          </p>
          <p className="font-mono text-[10px] text-[#2e2c38] tracking-wider">JPG · PNG · WEBP · multi-select</p>
        </div>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div key={photo.url} className="group rounded-xl overflow-hidden border border-white/[0.07] bg-[#0d0d17]">
              <div className="relative aspect-square">
                <Image src={photo.url} alt={photo.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => onDelete(photo.url)}
                    className="font-mono text-[11px] text-rose-400 border border-rose-400/40 px-4 py-1.5 rounded-full hover:bg-rose-400/10 transition-colors tracking-wider"
                  >
                    delete
                  </button>
                </div>
                <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#eceae3]/50 bg-black/50 px-1.5 py-0.5 rounded tracking-wider">{photo.name}</span>
              </div>
              <div className="px-2 py-2">
                <input
                  type="text"
                  placeholder="add a caption..."
                  value={captions[photo.name] || ""}
                  onChange={e => onCaption(photo.name, e.target.value)}
                  className="w-full bg-transparent border border-white/[0.05] focus:border-[#6d63ff]/30 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-[#a8a5ad] placeholder:text-[#2e2c38] focus:outline-none transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/[0.08] py-12 text-center">
          <p className="font-mono text-[11px] text-[#56545e] tracking-wider">No photos yet — upload some above.</p>
        </div>
      )}
    </div>
  );
}
