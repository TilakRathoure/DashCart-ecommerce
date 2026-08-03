import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const LoginHandler = async () => {
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
        console.log("data in worked");
        toast.success(res.data!.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user));
        navigate("/");
        window.location.reload();
      } else {
        if (user) await signOut(auth);
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
        console.log("everything has worked");
      }
    } catch (err) {
      console.log("try catch error worked");
      toast.error(`Sign up failed ${err}`);
    }
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,148,136,0.14),_transparent_55%),linear-gradient(180deg,_#eef1f4_0%,_#e4e9ef_100%)]" />

      <main className="relative w-full max-w-md rounded-md border border-store-line bg-store-surface p-8 shadow-sm">
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-tight text-store-text"
        >
          DashCart
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold text-store-text">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-store-muted">
          Sign in to shop, track orders, and pick up where you left off.
        </p>

        <div className="mt-8 flex w-full flex-col gap-2">
          <label className="text-sm font-medium text-store-text">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="store-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mt-4 flex w-full flex-col gap-2">
          <label className="text-sm font-medium text-store-text">
            Date of Birth
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="store-input"
          />
        </div>

        <button
          onClick={LoginHandler}
          className="store-btn mt-8 w-full !py-3 text-base"
        >
          <FcGoogle className="h-6 w-6 rounded bg-white p-0.5" />
          <span>Sign in with Google</span>
        </button>
      </main>
    </div>
  );
};

export default Login;
