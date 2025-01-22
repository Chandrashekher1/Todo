import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../utils/firebase"; // Ensure Firebase is initialized

const Login = () => {
  const handleSignIn = async () => {
    const auth = getAuth(app); // Pass initialized app
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // Signed-in user info
      const user = result.user;
      console.log("User:", user);
      console.log("Token:", token);
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Email:", error.customData?.email);
    }
  };

  return (
    <div className='border w-80 mx-auto my-16'>
      <h1 className='font-semibold text-center text-2xl'>Sign In</h1>
      
      <div className='flex text-center my-8 cursor-pointer mx-8 border bg-gray-100' onClick={handleSignIn}>
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
