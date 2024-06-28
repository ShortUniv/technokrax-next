'use client'
import React from 'react'
import { NavbarComponent } from '../Navbar'
import UserDetails from './UserDetails'
import Achievements from './Achievements'
import Certificates from './Certificates'
import MyCommunities from './MyCommunities'
import MyLearning from './MyLearning'
import MyContent from './MyContent'
import Footer from '../Footer'

const PublicProfile = ({userId}:any) => {
  return (
    <>
    <NavbarComponent />
    <div className="mx-[5%]">
        <UserDetails userId={userId}/>
        <Achievements />
        <Certificates />
        <MyCommunities />
        <MyLearning />
        <MyContent />
      </div>
      <Footer />
    </>
  )
}

export default PublicProfile