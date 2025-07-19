import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/cards/SummaryCard';
import moment from 'moment';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });
  
  useEffect(() => {
  document.title = " Dashboard | PrepGenie";
  }, []);

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

const deleteSession = async (sessionData) => {
  try {
    await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

    toast.success("Session Deleted Successfully");
    setOpenDeleteAlert({
      open: false,
      data: null,
    });
    fetchAllSessions();
  } catch (error) {
    console.error("Error deleting session data:", error);
  }
};

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-6 px-4 md:px-32 relative">
        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ''}
              topicsToFocus={data?.topicsToFocus || ''}
              experience={data?.experience || '-'}
              questions={data?.questions?.length || '-'}
              description={data?.description || ''}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format('Do MMM YYYY')
                  : ''
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* Floating Add New Button */}
        <button
          className="h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-6 md:right-20 z-50"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>

        {/* Create Session Modal */}
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
        >
          <CreateSessionForm />
        </Modal>

      
        <Modal
  isOpen={openDeleteAlert?.open}
  onClose={() => {
    setOpenDeleteAlert({ open: false, data: null });
  }}
  title="Delete Alert"
>
  <div className="w-[30vw]">
    <DeleteAlertContent
      content="Are you sure you want to delete this session detail?"
      onDelete={() => deleteSession(openDeleteAlert.data)}
    />
  </div>
</Modal>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
