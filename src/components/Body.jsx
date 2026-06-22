import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_Url } from "../utils/constants";
import { Link } from "react-router-dom";

const Body = () => {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(Base_Url + "/my-trips", {
        withCredentials: true,
      });

      setTrips(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">My Trips</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {trips.map((trip) => (
          <div key={trip._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{trip.destination}</h2>

              <p>Duration: {trip.durationDays} Days</p>

              <p>Budget: {trip.budgetTier}</p>

              <p>
                Interests:
                {trip.interests.join(", ")}
              </p>

              <div className="card-actions justify-end">
                <Link to={`/trip/${trip._id}`} className="btn btn-primary">
                  View Trip
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
