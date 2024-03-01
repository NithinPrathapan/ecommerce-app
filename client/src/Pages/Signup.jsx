import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [fileError, setFileError] = useState({});
  const [filePer, setFilePer] = useState(0);
  const [file, setFile] = useState(undefined);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = (e) => {
    e.preventDefault();
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },

      (error) => {
        setFileError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePicture: downloadUrl });
        });
      }
    );
  };
  const handleSubmit = () => {};
  return (
    <div className="flex items-center  justify-center gap-2 px-6 flex-col w-full">
      <div className="relative mx-auto my-8 flex items-center justify-center">
        <h1 className="tracking-[9px] justify-center  drop-shadow-xl text-center font-logo font-extrabold sm:text-4xl  text-3xl text-heading  px-6   rounded-lg">
          Sociopedia
          <div className="border-2 rounded-full w-[90%] bg-heading py-[1px]  mt-2 flex justify-center text-center mx-auto"></div>
        </h1>
      </div>

      <form
        action=""
        className="flex flex-col   gap-8 my-auto w-full mx-auto justify-center items-center max-w-5xl "
      >
        <input
          className=" sm:w-[80%] w-full text-center outline-none rounded-md shadow-sm  px-4 py-3"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <input
          className=" sm:w-[80%] w-full text-center outline-none rounded-md shadow-sm  px-4 py-3"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Enter Full Name"
        />
        <input
          className=" sm:w-[80%] w-full text-center outline-none rounded-md shadow-sm  px-4 py-3"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Create a Password"
        />
        <div className="flex justify-between items-center gap-5 sm:w-[80%] w-full">
          <input
            className="w-[80%] px-4 py-3 bg-main_text shadow-md drop-shadow-md  rounded-lg  bg-cblue"
            type="file"
            onChange={(e) => handleFileChange(e)}
          />
          <button
            onClick={handleFileUpload}
            type="button"
            className="bg-button px-3 text-main_text py-2 tracking-widest rounded-lg text-cyellow text-xl w-[80%] shadow-md font-semibold"
          >
            Upload
          </button>
        </div>
        {filePer > 0 && filePer < 100 && (
          <p className="text-heading tracking-widest font-semibold">
            {filePer}%
          </p>
        )}
        {filePer === 100 && (
          <p className="text-heading tracking-widest font-semibold">
            Profile image uploaded successfully
          </p>
        )}

        <button className="bg-button px-6 py-4 tracking-widest rounded-lg  text-main_text text-xl sm:w-[80%] w-full shadow-md font-semibold">
          Register
        </button>
      </form>

      <p className="text-heading text-xs sm:text-lg ">
        Already have an account?{" "}
        <Link to="/login">
          <span className="text-[#0d0acdee] hover:cursor-pointer font-semibold">
            click
          </span>{" "}
        </Link>
        here to Login page
      </p>
    </div>
  );
};

export default Signup;
