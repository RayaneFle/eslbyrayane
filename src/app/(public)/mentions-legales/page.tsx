export const metadata = {
  title: "Legal Notice - ESL Guliston",
  description: "Legal notice for the ESL Guliston website.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-bold text-brand-900 mb-8">Legal Notice</h1>

      <section className="space-y-6 text-slate-700 leading-relaxed">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Site editor</h2>
          <p>The ESL Guliston website is edited by Rayane, on a personal and non-commercial basis.</p>
          <p>Contact: bekhakhrayane@gmail.com</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Publication director</h2>
          <p>Rayane</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Hosting</h2>
          <p>The site is hosted by:</p>
          <p>Vercel Inc.</p>
          <p>340 S Lemon Ave #4133</p>
          <p>Walnut, CA 91789, USA</p>
          <p>Website: <a href="https://vercel.com" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Nature of the activity</h2>
          <p>ESL Guliston is a personal educational website, offering free English learning resources. The site has no commercial activity.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Intellectual property</h2>
          <p>All content on the site (texts, exercises, images) is the property of the editor or is used with permission. Any reproduction is prohibited without prior authorization.</p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Contact</h2>
          <p>For any questions regarding legal notices, data protection, or site content: <a href="mailto:bekhakhrayane@gmail.com" className="text-brand-600 underline">bekhakhrayane@gmail.com</a></p>
        </div>
      </section>
    </div>
  );
}
