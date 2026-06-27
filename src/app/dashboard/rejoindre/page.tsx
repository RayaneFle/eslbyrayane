"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function JoinClassPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(null);
    const res = await fetch("/api/classrooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim().toUpperCase() }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.message); setLoading(false); return; }
    setSuccess("Welcome to "" + data.classroom.name + ""!");
    setLoading(false);
    setTimeout(() => (window.location.href = "/dashboard"), 2000);
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Join a class</h1>
        <p className="text-sm text-slate-500 mt-1">Enter the code given by your teacher</p>
      </div>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="text-center mb-6">
            <span className="text-5xl">📚</span>
            <h2 className="font-heading font-bold text-slate-900 text-lg mt-3">Class code</h2>
            <p className="text-xs text-slate-500 mt-1">The code is usually 6 characters (e.g. ABC123)</p>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
          {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4 font-semibold">✓ {success}</div>}
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="text" required value={code} onChange={e => setCode(e.target.value.toUpperCase())} maxLength={6}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 text-center text-3xl font-mono font-bold tracking-[0.4em] focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none uppercase transition-all"
              placeholder="ABC123" disabled={loading || !!success} />
            <button type="submit" disabled={loading || code.length < 4 || !!success}
              className="w-full bg-gradient-to-r from-brand-500 to-accent-500 text-white py-3 rounded-xl font-semibold hover:shadow-glow disabled:opacity-50 transition-all">
              {loading ? "Checking..." : success ? "Redirecting..." : "Join the class"}
            </button>
          </form>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-heading font-bold text-slate-900 text-sm mb-2">💡 How to get a code?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Ask your English teacher for the class code. It looks something like <b className="font-mono">ABC123</b>.</p>
          </div>
          <div className="bg-brand-50 rounded-2xl border border-brand-200 p-5">
            <h3 className="font-heading font-bold text-brand-900 text-sm mb-2">🎯 No code?</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">You can still learn on your own with our free courses and activities.</p>
            <Link href="/cours" className="block text-center text-xs font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500 py-2 rounded-lg hover:shadow-md transition-all">Browse free courses →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
