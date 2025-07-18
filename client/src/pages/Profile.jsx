import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.profilePicture} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input type='text' id='username' placeholder='username' className='border p-3 rounded-lg'/>
        <input type='email' id='email' placeholder='email' className='border p-3 rounded-lg'/>
        <input type='password' id='password' placeholder='password' className='border p-3 rounded-lg'/>
        <button className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
         <div className='flex justify-between mt-5'>
        <span
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      </form>
    </div>
  )
}
