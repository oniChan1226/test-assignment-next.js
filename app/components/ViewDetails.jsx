import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { ClipLoader } from "react-spinners";

const ViewDetails = ({ checkin, onClose }) => {
  const [rooms, setRooms] = useState(0);
  const [guest, setGuest] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

//   console.log(checkin.id);

  const handleUpdate = async () => {
    if(rooms === 0 || guest === 0) return;

    const checkInRef = doc(db, "CheckIns", checkin.docId);
    setIsAdding(true);
    try{
        await updateDoc(checkInRef, {
            rooms: rooms,
            guest: guest,
        });
    }
    catch(error) {
        console.log(`Error in ViewDetails :: handleUpdate: ${error}`)
    }
    finally {
        setRooms(0);
        setGuest(0);
        alert(`Booking Details Added`);
        setIsAdding(false);
        onClose();
    }

  }

  const formattedDate = moment(checkin.bookedDate, "MMMM Do YYYY").format("YYYY-MM-DD");

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 grid place-items-center bg-zinc-800 p-4 md:p-8 xl:p-20 rounded-lg z-50">
        <h1 className="text-2xl mb-4">Details</h1>
        <div className="flex justify-between items-center gap-2 md:gap-6">
          {/* Left side */}
          <div className="left space-y-2">
            {/* 1st inpuit fielfd */}
            <div className="input-container flex justify-between items-center gap-3">
              <label htmlFor="bookingId">Booking Id:</label>
              <input
                type="text"
                name="bookingId"
                id="bookingId"
                value={checkin.id}
                disabled={true}
                className="px-2 py-1 text-black rounded-md"
              />
            </div>
            <div className="input-container flex justify-between items-center gap-3">
              <label htmlFor="rooms">Rooms:</label>
              <input
                type="number"
                name="rooms"
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="px-2 py-1 text-black rounded-md"
              />
            </div>
            <div className="input-container flex justify-between items-center gap-3">
              <label htmlFor="guest">Number of Guests:</label>
              <input
                type="number"
                name="guest"
                id="guest"
                value={guest}
                onChange={(e) => setGuest(Number(e.target.value))}
                className="px-2 py-1 text-black rounded-md"
              />
            </div>
            <div className="input-container flex justify-between items-center gap-3">
              <label htmlFor="date">Booked Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formattedDate}
                disabled={true}
                className="px-2 py-1 text-black rounded-md"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="right">
            <img
              src={checkin.imageUrl}
              alt="image"
              className="rounded-xl aspect-square object-contain w-[300px]"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 md:gap-4 w-full">
            <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-md text-white w-full"
            >
            Close
            </button>
            <button
            onClick={handleUpdate}
            className="mt-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-md text-white w-full"
            >
            {isAdding ? <ClipLoader /> : "Add"}
            </button>
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
