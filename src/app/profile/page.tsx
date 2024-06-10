// 'use client'
// import { useEffect ,useState} from "react";
// import UserDetails from "@/components/UserProfile/UserDetails";
// import { useDispatch } from "react-redux";
// import { getProfile } from "@/actions/Profile";
// import Achievements from "@/components/UserProfile/Achievements";
// import Certificates from "@/components/UserProfile/Certificates";
// import MyCommunities from "@/components/UserProfile/MyCommunities";
// import MyLearning from "@/components/UserProfile/MyLearning";
// import StudyStatistics from "@/components/StudyStatistics";
// import MyContent from "@/components/UserProfile/MyContent";
// import { NavbarComponent } from "@/components/Navbar";
// import Footer from "@/components/Footer";
// interface User {
//   user: {
//     userId: string;
//     // add other properties if needed
//   };
// }


// const Profile = () => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const profile = localStorage.getItem("profile");
//     if (profile) {
//       setUser(JSON.parse(profile));
//     }
//   }, []);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch<any>(getProfile(user?.user?.userId));
//   }, [user?.user?.userId]);
//   return (
//     <>
//       <NavbarComponent />
//     <div className="mx-[5%]">
//       <UserDetails />
//       <Achievements />
//       <Certificates />
//       <MyCommunities />
//       <MyLearning />
//       <StudyStatistics />
//       <MyContent />
//     </div>
//       <Footer />
//     </>
//   );
// };

// export default Profile;


'use client'
import { useEffect, useState } from "react";
import UserDetails from "@/components/UserProfile/UserDetails";
import { useDispatch } from "react-redux";
import { getProfile } from "@/actions/Profile";
import Achievements from "@/components/UserProfile/Achievements";
import Certificates from "@/components/UserProfile/Certificates";
import MyCommunities from "@/components/UserProfile/MyCommunities";
import MyLearning from "@/components/UserProfile/MyLearning";
import StudyStatistics from "@/components/StudyStatistics";
import MyContent from "@/components/UserProfile/MyContent";
import { NavbarComponent } from "@/components/Navbar";
import Footer from "@/components/Footer";

interface User {
  user: {
    userId: string;
    // add other properties if needed
  };
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      const parsedUser = JSON.parse(profile);
      setUser(parsedUser);

      if (parsedUser?.user?.userId) {
        dispatch<any>(getProfile(parsedUser.user.userId));
      }
    }
  }, [dispatch]);

  return (
    <>
      <NavbarComponent />
      <div className="mx-[5%]">
        <UserDetails />
        <Achievements />
        <Certificates />
        <MyCommunities />
        <MyLearning />
        <StudyStatistics />
        <MyContent />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
