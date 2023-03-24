import React from "react";
import { DiRedis } from "react-icons/di";
import { FaClipboardList } from "react-icons/fa";
import { TbMessages } from "react-icons/tb";
import { HiLink } from "react-icons/hi";
import { CgCalendarDates } from "react-icons/cg";
import moment from "moment";
import axios from "axios";

const CardDetails = ({ data }) => {
  const [showFile, setShowFile] = React.useState(false);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  // <-- Modal function Code -->
  React.useEffect(() => {
    const openModalBtn = document.getElementById(`open-modal-btn-${data.id}`);
    const closeModalBtn = document.getElementById(`close-modal-btn-${data.id}`);
    const modal = document.getElementById(`modal-${data.id}`);

    const handleOpenModal = (e) => {
      e.preventDefault();
      modal.style.display = "block";
      openModalBtn.id = `open-modal-btn-${data.id}`;
    };

    const handleCloseModal = (e) => {
      e.preventDefault();
      modal.style.display = "none";
      openModalBtn.id = `close-modal-btn-${data.id}`;
    };
    openModalBtn.addEventListener("click", handleOpenModal);
    closeModalBtn.addEventListener("click", handleCloseModal);

    return () => {
      openModalBtn.removeEventListener("click", handleOpenModal);
      closeModalBtn.removeEventListener("click", handleCloseModal);
    };
  }, [data.id]);

  // <-- submit -->
  const handleSubmit = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById(`fileName-${data.id}`);
    const files = Array.from(fileInput.files);

    // All file save to localStorage
    localStorage.setItem(
      `saveFiles-${data?.id}`,
      JSON.stringify(files.map((file) => file.name))
    );
    window.location.reload();

    const modal = document.getElementById(`modal-${data.id}`);
    modal.style.display = "none";
  };

  // Get Storage Data
  const storedFiles = JSON.parse(localStorage.getItem(`saveFiles-${data?.id}`));

  return (
    <>
      <div className="bg-white p-2 rounded-sm space-y-3 shadow-sm">
        {/* <-- Client --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img
              className=" w-6 h-6 object-cover flex justify-center items-center rounded-full"
              src={data?.image}
              alt=""
            />
            <h2 className="text-sm">Client Name</h2>
          </div>
          <div className="flex items-center gap-1">
            <img
              className=" w-6 h-6 object-cover flex justify-center items-center rounded-full"
              src={data?.image}
              alt=""
            />
            <h2 className="text-sm">{data?.client}</h2>
          </div>
        </div>
        {/* <-- Description-- > */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="px-1 flex justify-center items-center rounded-lg">
              <DiRedis className="text-xl" />
            </div>
            <p className="text-sm">
              {showFullDescription
                ? data?.description
                : `${data?.description.substring(0, 20)}...`}{" "}
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-red-300 text-sm"
              >
                {!showFullDescription ? "See More" : "Less"}
              </button>
            </p>
          </div>
          <div className="px-2 flex justify-center items-center rounded-lg bg-gray-300">
            <FaClipboardList className="text-gray-500 " />
            <h1>1/2</h1>
          </div>
        </div>
        {/* <-- Footer --> */}
        <div className=" relative flex gap-1 justify-between items-center">
         {
          [1,2,3,4].slice(0,2).map((data22,index)=> <img
          className={`absolute w-5 h-5 object-cover flex justify-center items-center rounded-full  ${index>0?"left-3":""}`}
          src={data?.image}
          alt=""
        />)
         }
   
          
          <div className=" w-5 h-5 flex justify-center items-center rounded-full bg-gray-300 ">
            <h1 className="text-[10px] flex justify-center items-center">12+</h1>
          </div>
          <div className="px-2 flex justify-center items-center rounded-lg ">
            <TbMessages className="text-gray-500 text-lg" />
            <h1>1/2</h1>
          </div>
          {/* <-- Action Button --> */}
          <div className="px-2 flex justify-center items-center rounded-lg ">
            <HiLink
              id={`open-modal-btn-${data.id}`}
              className="text-gray-500 text-lg cursor-pointer"
            />
            <h1
              className="text-lg px-1 cursor-pointer"
              onClick={() => setShowFile(!showFile)}
            >
              {storedFiles?.length || 0}
            </h1>
          </div>
          <div className="px-2 flex justify-center items-center rounded-lg ">
            <CgCalendarDates className="text-gray-500 text-lg" />
            <h2 className="text-sm">{moment().format("L")}</h2>
          </div>
        </div>
        {showFile && storedFiles.length > 0 && (
          <h2>
            Upload All files:<p> {storedFiles.join(", ")}</p>
          </h2>
        )}
      </div>
      {/* <-- Modal --> */}
      <div
        id={`modal-${data.id}`}
        style={{ display: "none" }}
        className="shadow-2xl p-2"
      >
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="text-red-800">
            Please Select your Attachment File
          </label>
          <input type="file" id={`fileName-${data.id}`} multiple />
          <div className="flex justify-end items-center gap-3">
            <button
              type="submit"
              className="w-20 text-center py-1 bg-cyan-600 rounded-lg text-lg text-white"
            >
              Submit
            </button>
            <button
              id={`close-modal-btn-${data.id}`}
              className="w-20 text-center py-1 bg-red-700 rounded-lg text-lg text-white"
            >
              close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CardDetails;

const handleSubmit = (e) => {
  e.preventDefault();

  axios.post(
    "http:localhost:8000/files",
    {
      image: "files",
      photo: document.querySelector("#fileInput").files,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

<form onSubmit={handleSubmit} className="space-y-2">
  <label className="text-red-800">Please Select your Attachment File</label>
  <input type="file" id={"files"} multiple />
  <div className="flex justify-end items-center gap-3">
    <button
      type="submit"
      className="w-20 text-center py-1 bg-cyan-600 rounded-lg text-lg text-white"
    >
      Submit
    </button>
    <button className="w-20 text-center py-1 bg-red-700 rounded-lg text-lg text-white">
      close
    </button>
  </div>
</form>;
