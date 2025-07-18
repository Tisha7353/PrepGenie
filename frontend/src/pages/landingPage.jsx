import React, { useContext, useState } from 'react';
import heroImg from '../assets/heroImg.png';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';
import { APP_FEATURES } from '../utils/data';
import Modal from '../components/Modal';
import Login from "./auth/login"
import Signup from "./auth/Signup"
import { UserContext } from '../context/UserContext';
import ProfileInfoCard from '../components/cards/ProfileInfoCard';
const LandingPage = () => {
  const {user}=useContext(UserContext)
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

 const handleCTA = () => {
  if (!user) {
    setOpenAuthModal(true);
  } else {
    navigate("/dashboard");
  }
};

  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF] relative overflow-hidden">
        {/* Background Blur */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 z-0" />

        <div className="container mx-auto px-8 md:px-32 pt-6 pb-[100px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">PrepGenie</div>
           {user?(<ProfileInfoCard/>):( <button
              onClick={() => setOpenAuthModal(true)}
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
            >
              Login / Sign Up
            </button>)}
          </header>

          {/* AI Badge */}
          <div className="flex items-center justify-start mb-4">
            <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-100">
              <LuSparkles /> AI Powered
            </div>
          </div>

          {/* Text Section (Heading + Description) */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12 w-full">
            {/* Heading */}
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl md:text-5xl text-black font-medium leading-tight mb-4">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] animate-text-shine font-semibold">
                  AI Powered
                </span>{' '}
                Learning
              </h1>
            </div>

            {/* Description + CTA */}
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mb-6">
                Get role specific questions, expand answers when you need them,
                dive deeper into concepts and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is here.
              </p>
              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full 2 flex items-center justify-center  mx-auto">
            <img src={heroImg} alt="Hero" className="w-[90vw] border-amber-400 border-2 rounded-2xl md:w-[80vw] " />
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-[#FFFCEF]">
          <div className="container mx-auto px-8 md:px-32 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features that make you shine
              </h2>
              <div className="flex flex-col items-center gap-8">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm bg-gray-50 text-gray-700 text-center p-5 mt-5">
        Made with ❤️ — Happy coding!
      </div>
     <Modal
  isOpen={openAuthModal}
  onClose={() => {
    setOpenAuthModal(false);
    setCurrentPage("login");
  }}
  hideHeader={true} 
>
  <div>
    {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
    {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
  </div>
</Modal>

      </>
      );
};

      export default LandingPage;
