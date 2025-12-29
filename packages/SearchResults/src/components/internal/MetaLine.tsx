export function MetaLine({ meta }: { meta?: string[] }) {
  if (!meta?.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#333]">
      {meta.map((text, index) => (
        <span
          key={`${text}-${index}`}
          className="inline-flex items-center rounded border border-slate-200 bg-white px-3 py-1"
        >
          {text}
        </span>
      ))}
    </div>
  );
}
