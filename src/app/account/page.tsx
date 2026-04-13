export default function AccountPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Account / Order Lookup</h1>
      <p className="max-w-2xl text-[var(--color-sand)]">MVP lookup tool for customers to query order request status via email and request ID.</p>
      <form className="max-w-xl space-y-4 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-6">
        <input className="input" name="email" placeholder="Email" type="email" required />
        <input className="input" name="orderRef" placeholder="Order Reference" required />
        <button className="rounded-full bg-[var(--color-gold)] px-6 py-2 text-xs uppercase tracking-[0.16em] text-[var(--color-ink)]" type="button">Lookup (MVP Placeholder)</button>
      </form>
    </div>
  );
}
