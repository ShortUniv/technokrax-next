'use client'
import CommunityDetails from '@/components/Community/CommunityDetails';
import React from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const { communities } = useSelector((state: any) => state?.communities);
//   const community = [communities]

  return (
   <>
   <CommunityDetails />
   </>
  );
}

export default Page;
