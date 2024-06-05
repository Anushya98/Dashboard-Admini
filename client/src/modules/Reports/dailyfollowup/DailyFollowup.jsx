import React, { useState } from 'react';
import ReportCard from '@/components/reportcard';
import NotificationItem from '@/components/notification';
import ArrowLeftIcon from '@/assets/icons/ArrowLeft.svg';
import ArrowRightIcon from '@/assets/icons/ArrowRight.svg';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/search-input';
import CalendarComponent from '@/components/calendar-date';

const ReportDailyFollowUp = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const reports = [
    [
      { type: 'Daily Report', date: '2023-05-23' },
      { type: 'Weekly Report', date: '2023-05-20' },
      { type: 'Monthly Report', date: '2023-05-01' },
      { type: 'Annual Report', date: '2023-01-01' }
    ],
    [
      { type: 'Password Update', date: '3 days ago' },
      { type: 'System Check', date: '2023-05-21' },
      { type: 'Security Update', date: '2023-05-19' },
      { type: 'Maintenance', date: '2023-05-15' }
    ],
    // Add more report sections as needed
  ];

  const notifications = [
    {
      message: 'System Maintenance Scheduled',
      explain: 'The system will be down for maintenance on Saturday from 1 AM to 3 AM.',
      time: '2 hours ago'
    },
    {
      message: 'Weekly Report Ready',
      explain: 'Your weekly report is ready to view. Please check the reports section.',
      time: '5 days ago'
    },
    {
      message: 'Security Alert',
      explain: 'Suspicious activity detected on your account. Please review your recent activity.',
      time: '1 week ago'
    }
  ];

  const prevSection = () => {
    setCurrentSectionIndex((prevIndex) =>
      prevIndex === 0 ? reports.length - 1 : prevIndex - 1
    );
  };

  const nextSection = () => {
    setCurrentSectionIndex((prevIndex) =>
      prevIndex === reports.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date: ", date);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-4 w-full md:w-2/3">
        <div className="cardcontainer relative rounded-2xl overflow-hidden shadow-lg bg-white">
          <div className="flex items-center justify-between py-3 px-8 bg-darkBlue rounded-2xl rounded-b-none">
            <p className="text-white font-medium">Reports</p>
            <div className='flex gap-2'>
              <SearchInput />
              <CalendarComponent onChange={handleDateChange} />
            </div>
          </div>

          <div className="space-y-8 pb-8">
            {['Most Recent Report', 'Special Reports', 'Daily Reports', 'Weekly Report', 'Favorites'].map((sectionTitle, idx) => (
              <div key={idx}>
                <div className="bg-customBlue text-darkBlue p-2 text-sm font-semibold mb-4 rounded-t-lg">{sectionTitle}</div>
                <div className="flex items-center justify-center gap-8">
                  <Button variant="ghost" size="icon" onClick={prevSection}>
                    <img src={ArrowLeftIcon} alt="arrowleft" className="w-6 h-6 hover-stroke-darkBlue stroke-darkblue" />
                  </Button>

                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
                    {reports[currentSectionIndex].map((report, index) => (
                      <ReportCard key={index} type={report.type} date={report.date} className="mt-4" />
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" onClick={nextSection}>
                    <img src={ArrowRightIcon} alt="arrowright" className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 w-full md:w-1/3 bg-gray">
        <div className="cardcontainer relative rounded-2xl overflow-hidden shadow-lg bg-white">
          <div className="flex items-center justify-between py-3 px-8 bg-darkBlue rounded-2xl rounded-b-none">
            <p className="text-white font-medium">Notification</p>
          </div>
          <div className="space-y-8">
            {['Today', 'Weekly', 'Older'].map((sectionTitle, idx) => (
              <div key={idx}>
                <div className="bg-customBlue text-darkBlue  p-2 text-sm font-semibold mb-4 rounded-t-lg">{sectionTitle}</div>
                {notifications.map((notification, index) => (
                  <NotificationItem key={index} message={notification.message} explain={notification.explain} time={notification.time} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDailyFollowUp;
