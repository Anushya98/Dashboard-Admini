import React from 'react';

function AnnouncementTable({ announcements }) {
  return (
    <section className="border bg-white rounded-2xl">
      <div className="py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
        <p className="text-white font-medium">Announcement</p>
      </div>
      <div className="p-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{announcement.heading}</h3>
              <p className="text-sm mt-1">{announcement.description}</p>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(announcement.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnnouncementTable;
