import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../features/LoadingSlice";


import { toast,ToastContainer } from "react-toastify";
import axiosInstence from "../utils/axiosInstance";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state)=>state.loading);

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [file, setFile] = useState(null); 
  const [bio, setBio] = useState(currentUser?.bio || "");

  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {};
    if (firstName !== currentUser.firstName) payload.firstName = firstName;
    if (lastName !== currentUser.lastName) payload.lastName = lastName;
    if (bio !== currentUser.bio) payload.bio = bio;

    if (Object.keys(payload).length === 0) {
        toast.info("No changes to update.")
      console.log("No changes to update.");
      return;
    }

    try {
      dispatch(SetLoading(true))
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await axiosInstence.patch(`/api/profile/update`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        dispatch(SetLoading(false))
        toast.success(response.data.message)
        console.log("Profile updated successfully:", response.data);
      }
    } catch (error) {
      dispatch(SetLoading(false))
      console.error("Failed to update profile:", error.message);
    }
  };
  const handleSubmitPhoto = async (e) => {
    e.preventDefault();

    // Create a payload with only the fields that have changed
    const payload = {};
    if (file) payload.file = file; // Only include the file if it's selected

    if (Object.keys(payload).length === 0) {
        toast.info("No changes to update.")
      console.log("No changes to update.");
      return;
    }

    try {
      dispatch(SetLoading(true))
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const response = await axiosInstence.patch(`/api/profile/update`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        dispatch(SetLoading(false))
        toast.success(response.data.message)
        console.log("Profile updated successfully:", response.data);
      }
    } catch (error) {
      dispatch(SetLoading(false))
      console.error("Failed to update profile:", error.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
        <ToastContainer/>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            name="firstName"
            type="text"
            className="p-2 border rounded-md"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="font-bold">
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            name="lastName"
            type="text"
            className="p-2 border rounded-md"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="font-bold">
            Bio
          </label>
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id="bio"
            name="bio"
            type="text"
            className="p-2 border rounded-md"
          />
        </div>

        {/* Email (Read-only) */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            readOnly
            value={currentUser?.emailId || ""}
            id="email"
            name="email"
            type="email"
            className="p-2 border rounded-md"
          />
        </div>

     

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-500 ${loading && 'cursor-not-allowed'} text-white py-2 px-4 rounded-md hover:bg-blue-600`}
        >
          {loading ?"Upading Profile":"Submit"}
        </button>
      </form>
    
         <form onSubmit={handleSubmitPhoto} className="flex flex-col gap-2">
          <label htmlFor="profilePhoto" className="font-bold">
            Profile Photo
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            className="p-2 border rounded-md"
            required
          />
            <button
          type="submit"
          className={`bg-blue-500 ${loading && 'cursor-not-allowed'} text-white py-2 px-4 rounded-md hover:bg-blue-600`}
        >
          {loading ?"Upading Profile":"Submit"}
        </button>
        </form>
    </div>
  );
};

export default EditProfile;
