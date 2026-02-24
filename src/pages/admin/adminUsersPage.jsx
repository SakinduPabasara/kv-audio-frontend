import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiSearch,
  HiX,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiTrash,
} from "react-icons/hi";

function RoleBadge({ role }) {
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        role === "admin"
          ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
          : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
      }`}
    >
      {role}
    </span>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Decode current admin's email from JWT to prevent self-deletion
  const token = localStorage.getItem("token");
  let currentEmail = null;
  try {
    currentEmail = JSON.parse(atob(token.split(".")[1])).email;
  } catch (_) {}

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, { headers })
      .then((res) => { setUsers(res.data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete "${user.firstName} ${user.lastName}"? This cannot be undone.`)) return;
    setDeletingId(user._id);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`, { headers });
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      toast.success(`${user.firstName} ${user.lastName} removed.`);
    } catch {
      toast.error("Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      !q ||
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Users</h1>
          <p className="text-slate-500 dark:text-slate-400">All registered accounts</p>
        </div>
        {loaded && (
          <span className="text-sm text-slate-400">
            {filtered.length} of {users.length} user{users.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Search */}
      {loaded && users.length > 0 && (
        <div className="relative w-full sm:w-72 mb-6">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-cta focus:ring-2 focus:ring-cta/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <HiX className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Loading */}
      {!loaded && (
        <div className="flex justify-center py-32">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cta/30 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            />
          </div>
        </div>
      )}

      {/* Empty */}
      {loaded && users.length === 0 && (
        <div className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-2xl py-20 text-center">
          <p className="font-semibold text-slate-900 dark:text-white mb-1">No users found</p>
          <p className="text-sm text-slate-500">Registered users will appear here.</p>
        </div>
      )}

      {/* No results */}
      {loaded && users.length > 0 && filtered.length === 0 && (
        <div className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-2xl py-16 text-center">
          <p className="font-semibold text-slate-900 dark:text-white mb-1">No results for "{search}"</p>
          <button onClick={() => setSearch("")} className="mt-2 text-sm text-cta font-semibold hover:underline">
            Clear search
          </button>
        </div>
      )}

      {/* Table */}
      {loaded && filtered.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((user, idx) => {
                  const isSelf = user.email === currentEmail;
                  const isDeleting = deletingId === user._id;
                  return (
                    <tr
                      key={user._id || user.email}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-700/30 transition-colors animate-fade-in-up"
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      {/* Avatar + name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.profilePicture}
                            alt={user.firstName}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-600 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";
                            }}
                          />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">
                              {user.firstName} {user.lastName}
                            </p>
                            {isSelf && (
                              <span className="text-xs text-slate-400">(you)</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                            <HiMail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {user.email}
                          </p>
                          {user.phone && (
                            <p className="flex items-center gap-1.5 text-xs text-slate-400">
                              <HiPhone className="w-3 h-3 shrink-0" />
                              {user.phone}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4">
                        {user.address ? (
                          <p className="flex items-start gap-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-[180px]">
                            <HiLocationMarker className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            {user.address}
                          </p>
                        ) : (
                          <span className="text-xs text-slate-300 dark:text-slate-600">—</span>
                        )}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>

                      {/* Delete action */}
                      <td className="px-6 py-4 text-right">
                        {isSelf ? (
                          <span className="text-xs text-slate-300 dark:text-slate-600 italic">—</span>
                        ) : (
                          <button
                            onClick={() => handleDelete(user)}
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isDeleting ? (
                              <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <HiTrash className="w-3.5 h-3.5" />
                            )}
                            {isDeleting ? "Removing…" : "Remove"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
