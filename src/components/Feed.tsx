import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils";
import { addFeed } from "../store/slices/feed";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state: any) => state.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getFeed = async () => {
    console.log(BASE_URL);
    try {
      const resFeed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(resFeed.data.data));
    } catch (err: any) {
      console.error("Error fetching feed:", err);
      if (err.status === 401 || err.status === 400) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed || (Array.isArray(feed) && feed.length === 0)) {
    return (
      <div className="flex justify-center items-center my-10">
        No more users in feed
      </div>
    );
  }
  return (
    <>
      {" "}
      <div className="flex justify-center items-center my-10">
        <UserCard
          user={Array.isArray(feed) && feed.length > 0 ? feed[0] : null}
        />
      </div>
    </>
  );
};

export default Feed;
