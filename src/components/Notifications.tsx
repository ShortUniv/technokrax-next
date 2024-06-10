'use client'
import { useState } from "react";

const Notifications = () => {
  const notifications = [
    {
      title: "New Message",
      message: "You have received a new message.",
      read: false,
    },
    {
      title: "Badge Awarded",
      message: "Congratulations! You have earned a new badge.",
      read: false,
    },
    {
      title: "Reminder",
      message: "Don't forget to complete your daily tasks.",
      read: false,
    },
    {
      title: "New Message",
      message: "You have received a new message.",
      read: false,
    },
    {
      title: "Badge Awarded",
      message: "Congratulations! You have earned a new badge.",
      read: false,
    },
    {
      title: "Reminder",
      message: "Don't forget to complete your daily tasks.",
      read: false,
    },
  ];

  const [tab, setTab] = useState("unread");

  const filteredNotifications =
    tab === "unread"
      ? notifications.filter((notification) => !notification.read)
      : notifications.filter((notification) => notification.read);

  return (
    <div className="fixed bottom-0 right-6 top-20 h-screen overflow-y-auto flex flex-col items-end">
      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white p-6 rounded-lg shadow-lg max-w-lg transform transition-all duration-300 ease-out">
        <div className="flex justify-end mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${tab === "unread" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-800"}`}
            onClick={() => setTab("unread")}
          >
            Unread
          </button>
          <button
            className={`px-4 py-2 rounded ${tab === "read" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-800"}`}
            onClick={() => setTab("read")}
          >
            Read
          </button>
        </div>
        {filteredNotifications.map((notification, index) => (
          <div key={index} className="mb-4">
            <span className="font-bold">{notification.title}</span>
            <p className="text-sm">{notification.message}</p>
            {index !== filteredNotifications.length - 1 && (
              <div className="border-b border-purple-300 my-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
