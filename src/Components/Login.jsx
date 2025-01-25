import React, { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Store/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const selector = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const auth = getAuth(app);

  useEffect(() => {
    if (selector?.email) {
      navigate("/profile"); // Redirect to profile if the user is already logged in
    }
  }, [selector, navigate]); // Dependency array ensures this runs when `selector` changes

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      // Extract user info after successful login
      const user = result.user;

      // Dispatch the user details to Redux
      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User",
        })
      );

      // Navigate to the profile page after successful login
      navigate("/");

      console.log("User:", user);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className='border w-80 mx-auto my-16'>
      <h1 className='font-semibold text-center text-2xl'>Sign In</h1>
      <div
        className='flex text-center my-8 cursor-pointer mx-8 border bg-gray-100'
        onClick={handleSignIn}
      >
        <img
          className='h-8 w-8 rounded-full mx-4'
          src="https://img.freepik.com/premium-vector/google-logo-icon-set-google-icon-searching-icons-vector_981536-453.jpg"
          alt="Google Logo"
        />
        <h2 className='font-semibold'>Sign In With Google</h2>
      </div>
    </div>
  );
};

export default Login;
