import { AccountLookupForm } from '@/components/forms/account-lookup-form';

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">Account / Order Lookup</h1>
      <p className="max-w-2xl text-[var(--color-sand)]">MVP lookup tool for customers to query order request status via email and request ID.</p>
      <AccountLookupForm />
    </div>
  );
}
