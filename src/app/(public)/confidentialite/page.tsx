export const metadata = {
  title: "Privacy Policy - ESL Guliston",
  description: "How your data is processed on ESL Guliston.",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold text-brand-900 mb-8">Privacy Policy</h1>

      <section className="space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Data controller</h2>
          <p>Rayane, editor of the ESL Guliston website.</p>
          <p>Contact: <a href="mailto:bekhakhrayane@gmail.com" className="text-brand-600 underline">bekhakhrayane@gmail.com</a></p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Data collected</h2>
          <p>When you create an account, we collect:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Your name (chosen by you)</li>
            <li>Your email address</li>
            <li>A password (stored in encrypted form, never in plain text)</li>
          </ul>
          <p className="mt-3">When you use the site, we also record:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Your progress in courses and activities</li>
            <li>Your exercise scores</li>
            <li>Your membership in classes</li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Purpose of processing</h2>
          <p>This data is used solely to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Allow you to use the service (login, course tracking)</li>
            <li>Allow your teacher to track your progress</li>
            <li>Ensure the proper functioning of the site</li>
          </ul>
          <p className="mt-3">No data is sold or shared with third parties for commercial purposes.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Sub-processors</h2>
          <p>Data is stored via:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Supabase (database hosting)</li>
            <li>Vercel (site hosting)</li>
          </ul>
          <p className="mt-3">These providers may store data outside the European Union. They are subject to standard contractual clauses to ensure an adequate level of protection.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Retention period</h2>
          <p>Your data is kept as long as your account is active. It is deleted when you delete your account.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Your rights (GDPR)</h2>
          <p>In accordance with the European data protection regulation (GDPR), you have the following rights:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Right of access</strong>: know the data we hold about you</li>
            <li><strong>Right to rectification</strong>: modify your data (via your profile)</li>
            <li><strong>Right to erasure</strong>: delete your account (via your profile)</li>
            <li><strong>Right to data portability</strong>: receive your data in a readable format</li>
            <li><strong>Right to object</strong>: object to processing</li>
          </ul>
          <p className="mt-3">To exercise these rights, contact us: <a href="mailto:bekhakhrayane@gmail.com" className="text-brand-600 underline">bekhakhrayane@gmail.com</a></p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Cookies</h2>
          <p>The site only uses cookies strictly necessary for its operation (session cookie to keep you logged in). No advertising or tracking cookies are used.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Security</h2>
          <p>Passwords are stored in encrypted form (bcrypt). Communications with the site are encrypted (HTTPS). Technical measures are in place to protect your data against unauthorized access.</p>
        </div>
      </section>
    </div>
  );
}
