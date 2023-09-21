import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { actionType } from "../context/reducer";
import { FaUser } from "react-icons/fa";

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center">
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allArtists, allSongs, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data,
        });
      });
    }

    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data, });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data, });
      });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUser className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />
      <DashboardCard
        icon={<GiLoveSong className="text-3xl text-textColor" />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      />
      <DashboardCard
        icon={<RiUserStarFill className="text-3xl text-textColor" />}
        name={"Artist"}
        count={allArtists?.length > 0 ? allArtists?.length : 0}
      />
      <DashboardCard
        icon={<GiMusicalNotes className="text-3xl text-textColor" />}
        name={"Album"}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      />
    </div>
  );
};

export default DashboardHome;
