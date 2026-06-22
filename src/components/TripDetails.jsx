import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Base_Url } from "../utils/constants";
import { getDestinationTheme } from "../utils/themeUtils";

const TripDetails = () => {
  const { trip_id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrip = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${Base_Url}/trip/${trip_id}`, {
        withCredentials: true,
      });
      setTrip(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load trip details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trip_id) {
      fetchTrip();
    }
  }, [trip_id]);

  const deleteActivity = async (activityId) => {
    try {
      await axios.delete(
        `${Base_Url}/trip/${trip._id}/activity/${activityId}`,
        {
          withCredentials: true,
        },
      );
      fetchTrip();
    } catch (err) {
      console.error(err);
      setError("Unable to delete activity. Please try again.");
    }
  };

  const regenerateDay = async (dayNumber) => {
    try {
      const instruction = prompt("How would you like to change this day?");
      if (!instruction) return;

      await axios.patch(
        `${Base_Url}/regenerate-day/${trip._id}`,
        {
          dayNumber,
          instruction,
        },
        {
          withCredentials: true,
        },
      );

      fetchTrip();
    } catch (err) {
      console.error(err);
      setError("Unable to regenerate this day. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-xl font-medium">Loading trip details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white px-6">
        <div className="max-w-xl rounded-3xl bg-white/10 p-8 text-center shadow-2xl backdrop-blur-lg">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="mb-6 text-slate-200">{error}</p>
          <button className="btn btn-primary" onClick={fetchTrip}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const theme = getDestinationTheme(trip.destination);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div
        className={`bg-linear-to-br ${theme.gradient} px-6 py-14 text-white`}
      >
        <div className="mx-auto max-w-6xl rounded-4xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-lg">
          <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                {theme.region}
              </p>
              <h1 className="text-5xl font-bold tracking-tight">
                {trip.destination}
              </h1>
              <p className="mt-3 text-lg text-white/80">
                {theme.emoji} {trip.destination} itinerary designed for you.
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 px-6 py-4 text-right text-sm text-white/90 shadow-xl">
              <p className="uppercase text-xs tracking-[0.4em] text-white/70">From</p>
              <p className="mt-2 text-2xl font-semibold">{trip.source || "Unknown"}</p>
              <p className="mt-4 uppercase text-xs tracking-[0.4em] text-white/70">
                Duration
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {trip.durationDays} days
              </p>
              <p className="mt-4 uppercase text-xs tracking-[0.3em] text-white/70">
                Budget
              </p>
              <p className="mt-2 text-2xl font-semibold">{trip.budgetTier}</p>
            </div>
          </div>

          <div className="grid gap-4 rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl">
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              {trip.interests?.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-white/10 px-3 py-1"
                >
                  {interest}
                </span>
              ))}
            </div>
            <p className="max-w-3xl text-slate-300">
              Your trip includes {trip.itinerary?.length || 0} day(s) of curated
              activities and experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6">
          {trip.itinerary?.map((day) => (
            <div
              key={day._id}
              className="overflow-hidden rounded-4xl border border-white/10 bg-slate-900/90 shadow-2xl"
            >
              <div className="flex flex-col gap-4 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                    Day {day.dayNumber}
                  </p>
                  <h2 className="text-2xl font-semibold">Daily plan</h2>
                </div>
                <button
                  className="btn btn-secondary rounded-full border border-white/10 bg-slate-800/80 px-5 text-sm text-white transition hover:bg-slate-700"
                  onClick={() => regenerateDay(day.dayNumber)}
                >
                  Regenerate Day
                </button>
              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {day.activities?.map((activity) => (
                  <div
                    key={activity._id}
                    className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-lg"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          Cost: ₹{activity.estimatedCost}
                        </p>
                      </div>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => deleteActivity(activity._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-slate-300">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
