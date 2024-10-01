import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ViewDetails from "./ViewDetails";

const ListCheckIns = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [selectedCheckIn, setSelectedCheckIn] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "CheckIns"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let checkInsArr = [];
      querySnapshot.forEach((checkin) => {
        checkInsArr.push({ ...checkin.data(), docId: checkin.id });
      });
      setCheckIns(checkInsArr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-[80%] mx-auto mt-24">
      <h1 className="text-2xl md:text-4xl tracking-wide ">Added CheckIns</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 place-items-center my-4">
        {checkIns.map((checkIn) => (
          <div
            key={checkIn.id}
            className="flex flex-col justify-center p-6 bg-zinc-900 rounded-lg"
          >
            <div className="my-2 mb-4">
              <img
                src={checkIn.imageUrl}
                alt="img"
                className="rounded-xl aspect-square object-contain"
              />
            </div>
            <div className="text-xl mb-1">{checkIn.title}</div>
            <div className="text-base text-zinc-400">{checkIn.bookedDate}</div>
            <button
              className="w-full bg-violet-500 hover:bg-violet-600 duration-200 mt-4 py-2 rounded-lg"
              onClick={() => setSelectedCheckIn(checkIn)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedCheckIn && (
        <ViewDetails
          checkin={selectedCheckIn}
          onClose={() => setSelectedCheckIn(null)}
        />
      )}
    </div>
  );
};

export default ListCheckIns;
