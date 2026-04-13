import { RegistrationForm } from '@/components/forms/registration-form';

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <h1 className="section-title">New Customer Registration</h1>
      <p className="max-w-2xl text-[var(--color-sand)]">Complete registration to streamline order request processing and compliance acknowledgements.</p>
      <RegistrationForm />
    </div>
  );
}
