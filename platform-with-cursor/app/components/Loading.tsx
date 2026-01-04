export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--muted)]">
      <div className="text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
        <p className="text-sm font-medium text-[var(--muted-foreground)]">読み込み中...</p>
      </div>
    </div>
  );
}

