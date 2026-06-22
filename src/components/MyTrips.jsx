import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_Url } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { getDestinationTheme } from "../utils/themeUtils";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTrips = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(Base_Url + "/trips", {
        withCredentials: true,
      });

      setTrips(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load your trips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <p className="text-xl font-medium">Loading your trip plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center max-w-md p-6 rounded-3xl bg-white/10 shadow-2xl backdrop-blur">
          <h1 className="text-3xl font-bold mb-4">Oops!</h1>
          <p className="mb-6">{error}</p>
          <Link to="/createtrip" className="btn btn-primary">
            Create Trip
          </Link>
        </div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-lg">
          <h1 className="text-4xl font-bold mb-4">No Trips Yet</h1>
          <p className="mb-6 text-slate-200">
            Start planning your next adventure.
          </p>
          <Link to="/createtrip" className="btn btn-primary">
            Create Your First Trip
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Travel Planner
            </p>
            <h1 className="text-5xl font-bold">My Trips</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Explore your planned destinations and continue your journey with
              country-themed cards.
            </p>
          </div>
          <Link
            to="/createtrip"
            className="btn btn-primary self-start sm:self-auto"
          >
            Create a New Trip
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {trips.map((trip) => {
            const theme = getDestinationTheme(trip.destination);
            return (
              <div
                key={trip._id}
                className={`group overflow-hidden rounded-4xl border border-white/10 bg-slate-950/70 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20 ${theme.accent}`}
                onClick={() => navigate(`/trip/${trip._id}`)}
              >
                <div
                  className={`p-6 bg-linear-to-br ${theme.gradient} bg-opacity-90 text-white`}
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                        {theme.region}
                      </p>
                      <h2 className="text-3xl font-semibold leading-tight">
                        {trip.destination}
                      </h2>
                    </div>
                    <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                      {theme.emoji}
                    </span>
                  </div>

                  <p className="text-sm text-white/80 mb-6">
                    {trip.interests?.slice(0, 3).join(" · ")}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-3xl bg-white/10 p-4 text-sm">
                      <p className="text-slate-200">Duration</p>
                      <p className="mt-2 text-xl font-semibold">
                        {trip.durationDays} days
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white/10 p-4 text-sm">
                      <p className="text-slate-200">Budget</p>
                      <p className="mt-2 text-xl font-semibold">
                        {trip.budgetTier}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white/10 p-4 text-sm">
                      <p className="text-slate-200">Stops</p>
                      <p className="mt-2 text-xl font-semibold">
                        {trip.itinerary?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-slate-950/90 p-6 text-slate-300 transition-colors duration-300 group-hover:bg-slate-900/95">
                  <p className="text-sm text-slate-400">
                    Click to view trip details
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
