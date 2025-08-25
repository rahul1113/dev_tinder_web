import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, updateRequest } from "../store/slices/requests";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const Requests = () => {
  const dispatch = useDispatch();
  const userRequests = useSelector((state: any) => state.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };
  const reviewRequest = async (status: string, requestId: string) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(updateRequest(requestId));
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };
  useEffect(() => {
    getRequests();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {Array.isArray(userRequests) && userRequests.length > 0 ? (
        <>
          {userRequests.map((request: any) => {
            // Defensive: check if fromUserId exists
            const fromUser = request.fromUserId || {};
            const {
              _id,
              about = "",
              age = "",
              firstName = "",
              gender = "",
              lastName = "",
              photoUrl = "",
            } = fromUser;
            return (
              <div
                key={request._id}
                className="flex flex-row items-center card bg-base-300 shadow-sm mt-4 p-4 w-1/2 mx-auto"
              >
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-20 h-20 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-bold">
                    {firstName} {lastName}
                  </p>
                  <p>{about}</p>
                  <p className="text-sm text-gray-500">Age: {age}</p>
                  <p className="text-sm text-gray-500">Gender: {gender}</p>
                </div>
                <div className="card-actions mx-auto ">
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>No requests found</div>
      )}
    </div>
  );
};

export default Requests;
