import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { activityTypeLabels, levelColors } from "@/lib/utils";
import Link from "next/link";

export default async function ResultatsPage() {
  const session = await getServerSession(authOptions);
  const results = await prisma.activityResult.findMany({
    where: { userId: session!.user.id },
    include: { activity: { select: { id: true, title: true, type: true, level: true } } },
    orderBy: { updatedAt: "desc" },
  });

  const avg = results.length > 0 ? results.reduce((a, r) => a + (r.score || 0), 0) / results.length : 0;
  const best = results.length > 0 ? Math.max(...results.map(r => r.score || 0)) : 0;
  const completedCount = results.filter(r => r.completed).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-slate-900">My results</h1>
        <p className="text-sm text-slate-500 mt-1">History of all your activities</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard icon="🎯" label="Activities" value={results.length} color="brand" />
        <StatCard icon="✅" label="Completed" value={completedCount} color="green" />
        <StatCard icon="📈" label="Avg score" value={Math.round(avg) + "%"} color={avg >= 80 ? "green" : avg >= 50 ? "amber" : "slate"} />
        <StatCard icon="🏆" label="Best" value={Math.round(best) + "%"} color={best >= 80 ? "green" : best >= 50 ? "amber" : "slate"} />
      </div>
      {results.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
          <span className="text-5xl">📈</span>
          <p className="text-slate-500 mt-4">No results yet.</p>
          <p className="text-xs text-slate-400 mt-1">Play an activity to see your scores here.</p>
          <Link href="/activites" className="inline-block mt-4 text-sm font-semibold text-brand-600 bg-brand-50 px-4 py-2 rounded-lg hover:bg-brand-100 transition-colors">Discover activities →</Link>
        </div>
      ) : (
        <div className="space-y-2">
          {results.map(r => {
            const t = activityTypeLabels[r.activity.type] || { emoji: "?", label: r.activity.type };
            const score = Math.round(r.score || 0);
            const date = new Date(r.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
            return (
              <Link key={r.id} href={"/activites/" + r.activity.id} className="bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all p-4 flex items-center gap-4 group">
                <span className="text-2xl shrink-0">{t.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.label}</span>
                    {r.activity.level && <span className={"text-[10px] font-bold px-2 py-0.5 rounded-full " + (levelColors[r.activity.level] || "bg-slate-100 text-slate-600")}>{r.activity.level}</span>}
                    {r.completed ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Completed</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">In progress</span>
                    )}
                  </div>
                  <p className="font-heading font-bold text-slate-900 text-sm truncate group-hover:text-brand-700 transition-colors">{r.activity.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{date} · {r.attempts} attempt{r.attempts > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={"font-heading font-bold text-2xl " + (score >= 80 ? "text-green-600" : score >= 50 ? "text-amber-600" : "text-red-600")}>{score}%</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Score</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    brand: "from-brand-50 to-brand-100/50 border-brand-200",
    accent: "from-accent-50 to-accent-100/50 border-accent-200",
    green: "from-green-50 to-green-100/50 border-green-200",
    amber: "from-amber-50 to-amber-100/50 border-amber-200",
    slate: "from-slate-50 to-slate-100/50 border-slate-200",
  };
  return (
    <div className={"bg-gradient-to-br " + (colors[color] || colors.slate) + " rounded-xl p-3 border"}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">{label}</span>
      </div>
      <p className="font-heading text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
