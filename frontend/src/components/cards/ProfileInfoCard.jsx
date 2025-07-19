import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false); // Track image load failure

  const handellogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return parts.map(p => p[0].toUpperCase()).slice(0, 2).join('');
  };

  const showInitials = !user?.profileImageUrl || imgError;

  return (
    user && (
      <div className="flex items-center gap-3">
        {showInitials ? (
          <div className="w-11 h-11 rounded-full bg-orange-300 text-white flex items-center justify-center font-bold text-sm">
            {getInitials(user.name)}
          </div>
        ) : (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            onError={() => setImgError(true)} 
            className="w-11 h-11 bg-gray-300 rounded-full object-cover"
          />
        )}
        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user.name || ''}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer"
            onClick={handellogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
