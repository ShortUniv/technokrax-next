'use client'

import { useSelector } from "react-redux";
import Image from "next/image";

const Certificates = () => {
  const { profile } = useSelector((state: any) => state.profile);

  const certificateCount = profile?.achievements?.certificates?.length || 0;

  return (
    <div className="mt-16 flex flex-col gap-8">
      <h2 className="font-alegreya text-[35px] font-medium">
        My Certificates ({certificateCount})
      </h2>

      <div>

          {
            profile?.achievements?.certificates?.length === 0 ? (
              <div className="col-span-2 md:col-span-2 lg:col-span-3 flex justify-center items-center text-center h-32">
              <p className="px-1">
                No certificates to show - Continue 
                <span className="text-blue-500 underline mx-1">
                  <a href="/learn">Learning</a>
                </span> 
                to earn certificates.
              </p>
            </div>
            ):(
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
              <Image
              width="300"
              height="168"
            src="https://i.postimg.cc/hPFgkY4y/White-and-Gold-Certificate-of-Appreciation.png"
            alt="img"
            className="w-[300px] h-[168.75px]"
            />
        </div>
          
          
        )}
        </div>
      <button
      className="flex justify-center mx-auto mt-10"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s ease,",
          width: "200px",
          alignItems: "center",
        }}
      >
        View All Certificates
      </button>
    </div>
  );
};

export default Certificates;
