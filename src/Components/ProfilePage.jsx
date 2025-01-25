import React, { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Store/userSlice';

const auth = getAuth();

const Profile = () => {
  const selector = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selector?.email) {
      navigate("/");
    }
  }, [selector, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error.message);
    }
  };

  return (
    <div className='border text-center my-16 mx-auto w-[50%] shadow-md'>
      <h1 className='font-bold text-2xl'>Profile Info</h1>
      <div className='font-semibold my-4'>
        <h1 className='my-4 text-2xl'>
          Name: <span className='text-xl mx-10'>{selector?.name || "User"}</span>
        </h1>
        <h1 className='font-semibold text-2xl'>
          Email: <span className='text-xl mx-2'>{selector?.email || "Null"}</span>
        </h1>

        {auth.currentUser?.photoURL && (
          <img
            src={auth.currentUser.photoURL}
            alt="User Profile"
            className='rounded-full mt-4'
          />
        )}
      </div>
      <button
        className='border px-8 rounded-md my-4 p-2 bg-red-600 text-white font-semibold hover:bg-red-500'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
