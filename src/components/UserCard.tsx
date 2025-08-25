import React from "react";
import { BASE_URL } from "../utils/utils";
import axios from "axios";
import { removeUserFromFeed } from "../store/slices/feed";
import { useDispatch } from "react-redux";

interface UserProps {
  _id?: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  age: string | number;
}
const UserCard = ({ user }: { user: UserProps }) => {
  const dispatch = useDispatch();
  const reviewRequest = async (status: string, requestId: string) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(requestId));
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };
  if (!user) return null;
  const { firstName, lastName, photoUrl, about, age } = user;
  return (
    <div className="card bg-base-300 w-66 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" className="object-cover h-48 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-500">Age: {age}</p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => user._id && reviewRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => user._id && reviewRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
