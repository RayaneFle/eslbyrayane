"use client";
export default function DeleteUserBtn({ userId, email, currentUserEmail, onDeleted }: { userId: string; email: string; currentUserEmail: string; onDeleted?: () => void }) {
  if (email === currentUserEmail) return null;
  async function handleDelete() {
    const confirmed = confirm("Delete account of " + email + "?\n\nThis action is irreversible. All data will be deleted (scores, progress, enrollments, etc.).");
    if (!confirmed) return;
    const doubleConfirm = confirm("Last confirmation: are you sure you want to permanently delete this account?");
    if (!doubleConfirm) return;
    const res = await fetch("/api/admin/users/" + userId, { method: "DELETE" });
    if (res.ok) onDeleted?.();
    else alert("Error deleting account.");
  }
  return <button onClick={handleDelete} className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">Delete</button>;
}
