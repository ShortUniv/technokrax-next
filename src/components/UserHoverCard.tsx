import React from 'react';

const UserHoverCard = ({ user, position }:any) => {
  if (!user) return null;


  const truncateText = (text: string, limit: number) => {
    if (text?.length > limit) return text.slice(0, limit) + "...";
    return text;
  };


  
  const getInitials = (name:any) => {
    if (!name) return '';
  
    const names = name.split(' ');
    return names.map((name:any)=> name.charAt(0)).join('').toUpperCase();
  };

  return (
    <div
      className="absolute bg-white shadow-lg p-4 rounded-md z-50"
      style={{ top: position.top, left: position.left, width: '320px' }}
    >
      <div className="flex items-center mb-2">
        {
            user.photo ?(

                <img className="w-12 h-12 rounded-full" src={user.photo} alt={user.name} />
            ):(
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white text-sm font-bold">
      {user?.name ? getInitials(user?.name) : ''}
      </div>
            )
        }
        <div className="ml-3">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user?.followers ||"2K"} followers</p>
        </div>
      </div>
      <p className="text-sm text-gray-700   overflow-hidden">
        {truncateText(user.bio,160)}
      </p>
      <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Follow</button>
    </div>
  );
};

export default UserHoverCard;
