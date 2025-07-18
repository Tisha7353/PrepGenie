import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl w-full max-w-xl shadow-sm hover:shadow-md transition cursor-pointer relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-t-xl p-5"
        style={{
          background: colors?.bgcolor || '#f9fafb',
        }}
      >
        <div className="flex items-start">
          {/* Initials badge */}
          <div className="flex w-12 h-12 bg-white text-black rounded-md items-center justify-center font-semibold text-base mr-4">
            {getInitials(role)}
          </div>

          {/* Role and Skills */}
          <div className="flex flex-col">
            <h2 className="text-base font-semibold text-black">{role}</h2>
            <p className="text-[13px] text-gray-700">{topicsToFocus}</p>
          </div>

          {/* Delete button */}
          <button
            className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center p-1 rounded border border-rose-100 bg-rose-50 hover:border-rose-200 text-rose-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <LuTrash2 size={14} />
          </button>
        </div>
      </div>

      {/* Metadata Pills */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-[11px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
          </span>
          <span className="text-[11px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            {questions} Q&A
          </span>
          <span className="text-[11px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Footer description */}
        <p className="text-[13px] text-gray-600 font-medium mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
