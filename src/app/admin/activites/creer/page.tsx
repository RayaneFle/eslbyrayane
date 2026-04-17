import Link from "next/link";
import { activityTypeLabels } from "@/lib/utils";

const CATS: Record<string, string[]> = {
  "Quiz": ["QCM", "TRUE_FALSE", "FILL_BLANKS"],
  "Vocabulaire": ["MATCHING", "MEMORY", "HANGMAN"],
  "Organisation": ["DRAG_DROP", "SORTING", "CATEGORIZE", "WORD_ORDER"],
};
const DESC: Record<string, string> = { QCM: "Multiple choice with feedback", TRUE_FALSE: "True or false", FILL_BLANKS: "Fill in the blanks", MATCHING: "Match pairs", MEMORY: "Find the pairs", HANGMAN: "Guess letter by letter", DRAG_DROP: "Drag to the zone", SORTING: "Put in order", CATEGORIZE: "Sort into categories", WORD_ORDER: "Put the words in order" };

export default function CreateActivitePage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-brand-900 mb-2">Create an activity</h1>
      <p className="text-brand-400 mb-10">Choose the type</p>
      {Object.entries(CATS).map(([cat, types]) => (
        <div key={cat} className="mb-10">
          <h2 className="font-heading text-lg font-bold text-brand-700 mb-4">{cat}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {types.map(type => { const info = activityTypeLabels[type]; if (!info) return null;
              return <Link key={type} href={`/admin/activites/creer/${type}`} className="group flex items-start gap-4 p-5 rounded-2xl border-2 border-brand-100 hover:border-accent-300 hover:shadow-card-hover card-hover bg-white">
                <span className="text-3xl">{info.emoji}</span>
                <div><p className="font-heading font-bold text-brand-800 group-hover:text-accent-600">{info.label}</p><p className="text-xs text-brand-400 mt-1">{DESC[type]}</p></div>
              </Link>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
