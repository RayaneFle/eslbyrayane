export const metadata = {
  title: "Terms of Use - ESL Guliston",
  description: "Terms of use for the ESL Guliston website.",
};

export default function CGUPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold text-brand-900 mb-8">Terms of Use</h1>

      <section className="space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">1. Purpose</h2>
          <p>These terms govern the use of ESL Guliston, a free educational platform for learning English as a foreign language.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">2. Access to the service</h2>
          <p>Access to educational content is free and open. Certain features (progress tracking, activities, classes) require creating an account.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">3. Account creation</h2>
          <p>When registering, the user agrees to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide accurate information</li>
            <li>Choose a sufficiently secure password (minimum 8 characters)</li>
            <li>Not share their credentials with third parties</li>
          </ul>
          <p className="mt-3">The editor reserves the right to suspend any account in case of breach of these terms.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">4. Use of the service</h2>
          <p>The user agrees to use the site in compliance with applicable laws. The following are prohibited:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Any attempt at unauthorized access</li>
            <li>Any activity that may disrupt the service</li>
            <li>Any publication of illegal, offensive, or inappropriate content</li>
            <li>Identity theft</li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">5. Intellectual property</h2>
          <p>Educational content (courses, exercises, texts) is the property of the editor. Any reproduction or use for commercial purposes is prohibited without written authorization.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">6. Liability</h2>
          <p>The service is provided &quot;as is&quot;. The editor does not guarantee continuous availability and cannot be held responsible for any interruptions. Educational content is provided for informational purposes; the editor does not guarantee specific learning outcomes.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">7. Personal data</h2>
          <p>The processing of personal data is detailed in the <a href="/confidentialite" className="text-brand-600 underline">privacy policy</a>.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">8. Termination</h2>
          <p>The user may delete their account at any time via their profile. All personal data is then erased.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">9. Modifications</h2>
          <p>These terms may be updated. The version in force is the one published on this page.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">10. Applicable law</h2>
          <p>These terms are governed by applicable law. In case of dispute, competent courts shall have jurisdiction.</p>
        </div>
      </section>
    </div>
  );
}
