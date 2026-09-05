export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-border border-t-primary animate-spin" />
        <p className="font-mono text-xs text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
