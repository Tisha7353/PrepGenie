import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import moment from 'moment';
import RoleInfoHeader from './components/RoleInfoHeader';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import QuestionCard from '../../components/cards/QuestionCard';// Make sure this exists
import { AnimatePresence, motion } from 'framer-motion'; // Required for animations
import Drawer from '../../components/Drawer';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SkeletonLoader from '../../components/loaders/SkeletonLoader';
import AIResponsePreview from './components/AIResponsePreview';
import SpinnerLoader from '../../components/loaders/SpinnerLoader';
import toast from 'react-hot-toast';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {

        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) {
        // Normalize the response structure
        let normalized = response.data;

        // Handle nested explanation case
        if (normalized.explanation && typeof normalized.explanation === 'object') {
          normalized = {
            title: normalized.explanation.title || normalized.title,
            explanation: normalized.explanation.explanation
          };
        }

        setExplanation(normalized);
      }
    } catch (error) {
      // ... error handling
    } finally {
      setIsLoading(false);
    }
  };
  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );



      if (response.data && response.data.question) {
        toast.success('Question Pinned Successfully')
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      // 1. Indicate loading has started
      setIsUpdateLoader(true);

      // 2. Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10
        }
      );
      console.log("Response from backedn", aiResponse)
      // Should be array like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data.questions;

      // 3. Add the generated questions to the current session
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      // 4. Handle success
      if (response.data) {
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      // 5. Handle errors
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      // 6. Indicate loading has finished
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      {sessionData && (
        <RoleInfoHeader
          role={sessionData.role || ''}
          topicsToFocus={sessionData.topicsToFocus || ''}
          experience={sessionData.experience || '-'}
          questions={sessionData.questions?.length || '-'}
          description={sessionData.description || ''}
          lastUpdated={
            sessionData.updatedAt
              ? moment(sessionData.updatedAt).format('Do MMM YYYY')
              : ''
          }
        />
      )}

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-32">
        <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${openLeanMoreDrawer ? 'md:col-span-7' : 'md:col-span-8'
              }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (

                <motion.div
                  layout
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1,
                  }}

                  layoutId={`question-${data._id || index}`}
                >
                  <>
                    <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data.isPinned}
                      onTogglePin={() =>
                        toggleQuestionPinStatus(data._id)
                      }
                    />
                    {!isLoading &&
                      sessionData?.questions?.length == index + 1 && (
                        <div className="flex items-center justify-center mt-5">
                          <button
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                            disabled={isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )}
                            {" "}
                            Load More
                          </button>
                        </div>
                      )}
                  </>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={explanation?.title}
          >
            {errorMsg ? (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            ) : isLoading ? (
              <SkeletonLoader />
            ) : explanation ? (
              <AIResponsePreview content={explanation} />
            ) : null}
          </Drawer>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
