import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/utils";

import { setUser } from "../store/slices/user";
import UserCard from "./UserCard";

const inputFields = [
  { name: "firstName", type: "text", placeholder: "First name" },
  { name: "lastName", type: "text", placeholder: "Last name" },
  { name: "photoUrl", type: "text", placeholder: "Photo URL" },
  { name: "about", type: "text", placeholder: "About" },
  { name: "skills", type: "text", placeholder: "Skills (comma separated)" },
  { name: "age", type: "text", placeholder: "Age" },
];
interface ProfileData {
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  about?: string;
  skills?: string[] | string;
  age?: string | number;
  gender?: string;
}

interface EditProfileProps {
  profileData: ProfileData;
}

const EditProfile: React.FC<EditProfileProps> = ({ profileData }) => {
  if (!profileData) return null;
  const [editForm, setEditForm] = useState({
    firstName: profileData.firstName || "",
    lastName: profileData.lastName || "",
    photoUrl: profileData.photoUrl || "",
    about: profileData.about || "",
    skills: profileData.skills || [],
    age: profileData.age || "",
    gender: profileData.gender || "",
  });
  const [error, setError] = useState<string | undefined>();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          skills: Array.isArray(editForm.skills)
            ? editForm.skills
            : editForm.skills
                .split(",")
                .map((s: string) => s.trim())
                .filter((s: any) => s.length > 0),
          about: editForm.about,
          age: editForm.age,
          photoUrl: editForm.photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(setUser(res.data));
      setShowToast(true);
      //return navigate("/");
    } catch (err: any) {
      setError(err?.response?.data);
      console.error("Error saving profile:", err);
    }
  };
  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully.</span>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-self-center mt-1">
        <div className="card bg-base-300 w-96 shadow-sm mx-auto mt-2 ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            {inputFields.map((field) => (
              <div key={field.name}>
                {field.type === "dropdown" ? (
                  <>
                    <div className="dropdown">
                      <select
                        value={editForm.gender}
                        onChange={(e) =>
                          setEditForm({ ...editForm, gender: e.target.value })
                        }
                        className=" menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <label className="input validator">
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={editForm[field.name as keyof typeof editForm]}
                      onChange={(e) => {
                        setEditForm({
                          ...editForm,
                          [field.name]: e.target.value,
                        });
                      }}
                    />
                  </label>
                )}
              </div>
            ))}

            <div>{error && <p className="text-red-500">{error}</p>}</div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 ml-10">
          <UserCard user={{ ...editForm }} />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
