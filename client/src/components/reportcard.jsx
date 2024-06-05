import React from 'react';
import ReportIcon from '@/assets/icons/reports.svg';

const ReportCard = ({ type, date, className = '' }) => {
  return (
    <div className={`flex items-center justify-center w-[120px] h-[120px] p-2 border border-blue-300 border-solid rounded-lg shadow-md hover:shadow-lg transition bg-white ${className}`}>
      <div>
        <div className="flex justify-center mb-1">
          <img src={ReportIcon} alt="report" className="w-6 h-6" />
        </div>
        <div className="font-semibold text-sm text-center text-darkBlue">{type}</div>
        <div className="text-xs text-center text-darkBlue">{date}</div>
      </div>
    </div>
  );
};

export default ReportCard;

