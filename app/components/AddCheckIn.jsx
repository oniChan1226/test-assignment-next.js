import React, { useState } from "react";
import { storage, db } from "../firebase";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";

const AddCheckIn = ({ display = false, onClose }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Add Items to database
  const handleUpload = async () => {
    if (imageUpload === null || title === "") return;

    setIsUploading(true);

    try {
      const imageRef = ref(storage, `imgs/${imageUpload.name + v4()}`);

      const res = await uploadBytes(imageRef, imageUpload);

      const imageUrl = await getDownloadURL(res.ref);

      await addDoc(collection(db, "CheckIns"), {
        id: v4(),
        title: title,
        imageUrl: imageUrl,
        bookedDate: moment().format("MMMM Do YYYY"),
      });
    } catch (error) {
      console.log(`Error in AddCheckIn :: handleUpload: ${error}`);
    } finally {
      alert("Data Uploaded");
      setTitle("");
      setImageUpload(null);
      onClose();
      setIsUploading(false);
    }
  };

  return (
    <>
      {display && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={isUploading ? "" : onClose}
          ></div>
          <div className="fixed top-[35%] md:top-[50%] left-0 md:left-[50%] transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col justify-center items-center bg-zinc-800 p-4 md:p-8 xl:p-20 rounded-lg z-50 w-full md:w-fit mx-2">
            <button
              className="bg-violet-500 px-8 py-1 absolute top-0 right-0 rounded-md"
              onClick={isUploading ? "" : onClose}
            >
              X
            </button>
            <div className="w-full md:w-fit space-y-2">
              {/* Title */}
              <label htmlFor="title" className="text-xl md:text-2xl capitalize">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black px-2 md:px-4 py-1 mx-2 outline-none rounded-lg bg-zinc-100 md:text-2xl"
              />
              {/* Image */}
              <input
                type="file"
                className="text-xl md:text-2xl rounded-md w-fit"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </div>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`ml-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 duration-200 text-white rounded-lg text-2xl mt-8 `}
            >
              {isUploading ? <ClipLoader /> : "Upload"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AddCheckIn;
