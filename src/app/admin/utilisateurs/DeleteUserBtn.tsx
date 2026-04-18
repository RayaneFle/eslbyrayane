"use client";
import { useRouter } from "next/navigation";

export default function DeleteUserBtn({ userId, email, currentUserEmail }: { userId: string; email: string; currentUserEmail: string }) {
  const router = useRouter();
  
  // Don't show delete for own account
  if (email === currentUserEmail) return null;
  
  async function handleDelete() {
    const confirmed = confirm("Delete account of " + email + " ?\n\nThis action is irreversible. All data of this user will be deleted (scores, progress, enrollments, etc.).");
    if (!confirmed) return;
    
    const doubleConfirm = confirm("Final confirmation: do you really want to permanently delete this account?");
    if (!doubleConfirm) return;
    
    const res = await fetch("/api/admin/users/" + userId, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Deletion failed.");
  }
  
  return <button onClick={handleDelete} className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">Delete</button>;
}