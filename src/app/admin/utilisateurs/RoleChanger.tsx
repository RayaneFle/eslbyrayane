"use client";
export default function RoleChanger({ userId, currentRole, onChanged }: { userId: string; currentRole: string; onChanged?: (role: string) => void }) {
  async function change(role: string) {
    await fetch(`/api/admin/users/${userId}/role`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role }) });
    onChanged?.(role);
  }
  return (
    <select value={currentRole} onChange={e => change(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-400 bg-white">
      <option value="student">Student</option><option value="teacher">Teacher</option><option value="admin">Admin</option>
    </select>
  );
}
