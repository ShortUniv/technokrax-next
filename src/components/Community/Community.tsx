'use client'
import React, { useEffect } from 'react'
import { NavbarComponent } from '../Navbar'
import Footer from '../Footer'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {  useDispatch } from 'react-redux';
import { getCommunities } from '@/actions/Community';
import Link from 'next/link';
import CommunitySlides from './CommunitySlides';


const Community = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(getCommunities());
    },[dispatch])



  return (
      <>
   <NavbarComponent />
   <div className='pl-[6%] mt-6'>
   <div className='flex justify-between pr-[6%]'>
    <h1 className='font-semibold text-[40px] font-sans'>Community</h1>
    <Link href={"/community/create-community"}>
    <button className='hover:bg-gray-200 hover:text-gray-800 rounded-lg p-2'>
        <AddIcon  style={{fontSize:"40px"}}/>
    </button>
    </Link>
   </div>
   <div className='relative my-6 pr-[6%]'>
          <button className='absolute  right-10 pl-3 pt-4 flex items-center  hover:text-black cursor-pointer pr-[6%]'>
            <SearchIcon style={{fontSize:"30px",color:"grey"}}/>
          </button>
          <input type="text" placeholder='Search community' className=' w-full border-[2px] border-gray-400 py-4 text-center focus:outline-none rounded-3xl ' />
        </div>
        <div className="flex ">
     <CommunitySlides />
      </div>
    </div>

   <Footer />
   </>
  )
}

export default Community