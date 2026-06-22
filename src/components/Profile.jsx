import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.User_Store);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
          <div className="rounded-4xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-lg">
            <h1 className="text-3xl font-bold">No profile available</h1>
            <p className="mt-4 text-slate-300">
              Please log in to view your profile details.
            </p>
            <Link to="/login" className="btn btn-primary mt-6 inline-block">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-4xl border border-white/10 bg-slate-900/70 p-10 shadow-2xl backdrop-blur-lg">
          <div className="mb-10 flex flex-col gap-6 rounded-4xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-8 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
                Your profile
              </p>
              <h1 className="mt-4 text-5xl font-bold">
                Welcome back, {user.name || "Traveler"}
              </h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                View your account details, active plan, and next trips from your
                dashboard.
              </p>
            </div>
            <Link
              to="/myTrips"
              className="btn btn-primary self-start sm:self-auto"
            >
              View My Trips
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Account details</h2>
              <div className="space-y-4 text-slate-300">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                    Name
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">
                    {user.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                    Email
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">
                    {user?.email || user?.email_Id || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                    User ID
                  </p>
                  <p className="mt-2 text-sm text-slate-400 break-all">
                    {user._id || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Quick actions</h2>
              <div className="space-y-4 text-slate-300">
                <Link
                  to="/createtrip"
                  className="block rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Plan a new trip
                </Link>
                <Link
                  to="/myTrips"
                  className="block rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  See all trips
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
