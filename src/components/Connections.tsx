import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/slices/connections";

const Connections = () => {
  const dispatch = useDispatch();
  const userConnections = useSelector((state: any) => state.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Connections</h1>
      <div className="w-full flex justify-center">
        <div className=" h-auto w-1/2 flex flex-col gap-6">
          {userConnections && userConnections.length > 0 ? (
            <>
              {userConnections.map((connection: any) => (
                <div
                  key={connection.id}
                  className="flex flex-row items-center card bg-base-300 shadow-sm p-4"
                >
                  <img
                    src={connection.photoUrl}
                    className="w-20 h-20 rounded-full"
                    alt={`${connection.firstName} ${connection.lastName}`}
                  />
                  <div className="ml-4">
                    {connection.firstName} {connection.lastName}
                    <p>{connection.about}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>No connections found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
