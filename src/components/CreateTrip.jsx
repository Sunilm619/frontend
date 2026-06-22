import React, { useState } from "react";
import axios from "axios";
import { Base_Url } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [budgetTier, setBudgetTier] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const generateTrip = async () => {
    if (!source || !destination || !durationDays || !budgetTier || !interests) {
      setError("Please complete all fields before generating your trip.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        Base_Url + "/generate-trip",
        {
          source,
          destination,
          durationDays,
          budgetTier,
          interests: interests.split(",").map((item) => item.trim()),
        },
        {
          withCredentials: true,
        },
      );

      const tripId = response?.data?._id || response?.data?.trip?._id;
      if (tripId) {
        navigate(`/trip/${tripId}`);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to generate trip right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl rounded-4xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-lg">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
              Trip Builder
            </p>
            <h1 className="text-4xl font-bold">Create your next adventure</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Enter your source and destination so the itinerary can adapt to
              distance, travel budget, and local preferences.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            Budget varies with distance, travel mode, and destination.
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="input input-bordered bg-slate-950 text-white"
              placeholder="Source city or airport"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <input
              className="input input-bordered bg-slate-950 text-white"
              placeholder="Destination city"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="number"
              className="input input-bordered bg-slate-950 text-white"
              placeholder="Duration (days)"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              min="1"
            />
            <select
              className="select select-bordered bg-slate-950 text-white"
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
            >
              <option value="">Choose a budget tier</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <textarea
            className="textarea textarea-bordered bg-slate-950 text-white"
            placeholder="Interests (e.g. food, culture, adventure)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            rows={4}
          />

          {error && <p className="text-red-400">{error}</p>}

          <button
            className="btn btn-primary w-full px-6 py-4 text-lg font-semibold"
            onClick={generateTrip}
            disabled={loading}
          >
            {loading ? "Generating trip..." : "Generate Trip"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
