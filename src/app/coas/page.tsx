import { getPublicCoadocuments } from '@/lib/services/admin-data';

export default async function CoasPage() {
  const coas = await getPublicCoadocuments();

  return (
    <div className="space-y-6">
      <h1 className="section-title">COAs</h1>
      <p className="max-w-3xl text-[var(--color-sand)]">Search and review current Certificates of Analysis by product and batch.</p>

      <div className="overflow-x-auto rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)] p-4">
        <table className="min-w-full text-left text-sm text-[var(--color-sand)]">
          <thead>
            <tr className="border-b border-[var(--color-gold-soft)] text-xs uppercase tracking-[0.14em] text-[var(--color-gold)]">
              <th className="py-2 pr-3">Product</th>
              <th className="py-2 pr-3">Batch</th>
              <th className="py-2 pr-3">Purity</th>
              <th className="py-2 pr-3">Lab</th>
              <th className="py-2 pr-3">Test Date</th>
              <th className="py-2 pr-3">Document</th>
            </tr>
          </thead>
          <tbody>
            {coas.map((coa) => (
              <tr key={coa.id} className="border-b border-[var(--color-gold-soft)]/20">
                <td className="py-2 pr-3">{coa.productName ?? coa.productId}</td>
                <td className="py-2 pr-3">{coa.batchNumber}</td>
                <td className="py-2 pr-3">{coa.purityPercent}%</td>
                <td className="py-2 pr-3">{coa.labName}</td>
                <td className="py-2 pr-3">{new Date(coa.testDate).toLocaleDateString()}</td>
                <td className="py-2 pr-3">
                  <a href={coa.pdfUrl} target="_blank" rel="noreferrer" className="text-[var(--color-gold)] hover:underline">
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
