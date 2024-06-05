// src/components/NotificationItem.jsx

const NotificationItem = ({ message, explain, time }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg ">{message}</h3>
          <p className="text-sm mt-1 text-gray-700">{explain}</p>
        </div>
        <span className="text-xs text-gray-500">
          {time}
        </span>
      </div>
    </div>
  );
};

export default NotificationItem;
