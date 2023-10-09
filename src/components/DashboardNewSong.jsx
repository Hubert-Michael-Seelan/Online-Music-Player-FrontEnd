import React, { useEffect, useRef, useState } from "react";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
//   deleteObject,
// } from "firebase/storage";
// import { motion } from "framer-motion";

// import { BiCloudUpload } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";

// import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/supportfunctions";
// import AlertSuccess from "./AlertSuccess";
// import AlertError from "./AlertError";

const DashboardNewSong =  () => {
  const [songName, setSongName] = useState("");
  const [{ allArtists, allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data });
      });
    }
  }, []);

  return(
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4 rounded-md">
      <input
            type="text"
            placeholder="Type your song name"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButtons filterData={allArtists} flag={"Artist"} />
            <FilterButtons filterData={allAlbums} flag={"Albums"} />
            <FilterButtons filterData={filterByLanguage} flag={"Language"} />
            <FilterButtons filterData={filters} flag={"Category"} />
          </div>
    </div>
  );
}

export default DashboardNewSong;