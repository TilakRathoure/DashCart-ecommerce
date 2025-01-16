import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data!.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (err) {
      toast.error(`Sign up failed ${err}`);
    }
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <main className="w-full h-[80%] max-w-md p-8 shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <div className="w-full flex flex-col gap-2 mb-4">
          <label className="font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="w-full flex flex-col gap-2 mb-4">
          <label className="font-medium">Date of Birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="w-full text-center">
          <p className="mb-6 text-sm">Already Signed In Once</p>
          <button
            onClick={loginHandler}
            className="w-3/4 mx-auto h-12 flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors border border-blue-600"
          >
            <FcGoogle className="bg-white rounded-full p-1 w-10 h-10 mr-2" />
            <span className="text-lg">Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
