
'use client'
import React, { useState } from 'react';
import Footer from './Footer';
import { NavbarComponent } from './Navbar';

interface Notification {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: 'Assignment',
    title: 'New Assignment: Math Homework',
    description: 'Complete the exercises on page 42.',
    timestamp: '2024-07-06T10:30:00',
    read: false
  },
  {
    id: 2,
    type: 'Grade',
    title: 'Grade Published: Physics Test',
    description: 'Your grade for the physics test is now available.',
    timestamp: '2024-07-05T15:20:00',
    read: true
  },
  {
    id: 3,
    type: 'Announcement',
    title: 'Campus Announcement: New Library Hours',
    description: 'The library will now be open until 8 PM on weekdays.',
    timestamp: '2024-07-04T09:45:00',
    read: false
  },
  {
    id: 4,
    type: 'Assignment',
    title: 'Reminder: English Essay Due',
    description: 'Submit your essay on the assigned topic by tomorrow.',
    timestamp: '2024-07-06T09:00:00',
    read: false
  },
  {
    id: 5,
    type: 'Grade',
    title: 'Grade Updated: History Quiz',
    description: 'Your grade for the history quiz has been updated.',
    timestamp: '2024-07-04T14:15:00',
    read: true
  },
  {
    id: 6,
    type: 'Announcement',
    title: 'Holiday Closure: Independence Day',
    description: 'The university will be closed on July 4th for Independence Day.',
    timestamp: '2024-07-01T17:30:00',
    read: false
  },
  {
    id: 7,
    type: 'Grade',
    title: 'Grade Updated: Biology Quiz',
    description: 'Your grade for the biology quiz has been updated.',
    timestamp: '2024-07-03T16:45:00',
    read: true
  },
  {
    id: 8,
    type: 'Assignment',
    title: 'New Assignment: Chemistry Lab Report',
    description: 'Complete the lab report for the chemistry experiment.',
    timestamp: '2024-07-02T11:00:00',
    read: false
  },
  {
    id: 9,
    type: 'Announcement',
    title: 'Campus Announcement: Summer Break',
    description: 'The university will be closed for summer break from July 15th to August 15th.',
    timestamp: '2024-07-01T09:30:00',
    read: false
  },
  {
    id: 10,
    type: 'Grade',
    title: 'Grade Published: Math Test',
    description: 'Your grade for the math test is now available.',
    timestamp: '2024-06-30T14:20:00',
    read: true
  },
  {
    id: 11,
    type: 'Announcement',
    title: 'Campus Announcement: New Student Orientation',
    description: 'New student orientation sessions will be held on July 10th and July 12th.',
    timestamp: '2024-06-29T16:00:00',
    read: false
  },
  {
    id: 12,
    type: 'Assignment',
    title: 'Reminder: History Essay Due',
    description: 'Submit your essay on the assigned topic by tomorrow.',
    timestamp: '2024-06-28T09:00:00',
    read: false
  },
  {
    id: 13,
    type: 'Grade',
    title: 'Grade Updated: English Presentation',
    description: 'Your grade for the English presentation has been updated.',
    timestamp: '2024-06-27T15:30:00',
    read: true
  },
  {
    id: 14,
    type: 'Announcement',
    title: 'Holiday Closure: Labor Day',
    description: 'The university will be closed on September 3rd for Labor Day.',
    timestamp: '2024-06-26T12:00:00',
    read: false
  },
  {
    id: 15,
    type: 'Grade',
    title: 'Grade Published: Chemistry Quiz',
    description: 'Your grade for the chemistry quiz is now available.',
    timestamp: '2024-06-25T11:45:00',
    read: true
  },
  {
    id: 16,
    type: 'Announcement',
    title: 'Campus Announcement: Library Closure',
    description: 'The library will be closed for renovations from July 10th to July 20th.',
    timestamp: '2024-06-24T14:30:00',
    read: false
  },
  {
    id: 17,
    type: 'Assignment',
    title: 'New Assignment: Physics Lab Report',
    description: 'Complete the lab report for the physics experiment.',
    timestamp: '2024-06-23T10:15:00',
    read: false
  },
  {
    id: 18,
    type: 'Grade',
    title: 'Grade Updated: History Essay',
    description: 'Your grade for the history essay has been updated.',
    timestamp: '2024-06-22T16:20:00',
    read: true
  },
  {
    id: 19,
    type: 'Announcement',
    title: 'Campus Announcement: Career Fair',
    description: 'The annual career fair will be held on July 20th in the main auditorium.',
    timestamp: '2024-06-21T08:45:00',
    read: false
  },
  {
    id: 20,
    type: 'Grade',
    title: 'Grade Published: Economics Test',
    description: 'Your grade for the economics test is now available.',
    timestamp: '2024-06-20T13:30:00',
    read: true
  },
  {
    id: 21,
    type: 'Announcement',
    title: 'Holiday Closure: Thanksgiving Day',
    description: 'The university will be closed on November 28th for Thanksgiving Day.',
    timestamp: '2024-06-19T11:00:00',
    read: false
  },
  {
    id: 22,
    type: 'Assignment',
    title: 'Reminder: Computer Science Project Proposal',
    description: 'Submit your project proposal for the computer science course by next week.',
    timestamp: '2024-06-18T09:30:00',
    read: false
  },
  {
    id: 23,
    type: 'Grade',
    title: 'Grade Updated: Psychology Quiz',
    description: 'Your grade for the psychology quiz has been updated.',
    timestamp: '2024-06-17T14:45:00',
    read: true
  },
  {
    id: 24,
    type: 'Announcement',
    title: 'Campus Announcement: New Parking Policy',
    description: 'New parking policy will be effective from next month. Please refer to the website for details.',
    timestamp: '2024-06-16T10:00:00',
    read: false
  },
  {
    id: 25,
    type: 'Grade',
    title: 'Grade Published: Geography Test',
    description: 'Your grade for the geography test is now available.',
    timestamp: '2024-06-15T15:20:00',
    read: true
  },
  {
    id: 26,
    type: 'Announcement',
    title: 'Campus Announcement: Summer Internship Opportunity',
    description: 'Apply for summer internship opportunities at leading companies. Visit the career center for more information.',
    timestamp: '2024-06-14T12:30:00',
    read: false
  },
  {
    id: 27,
    type: 'Assignment',
    title: 'New Assignment: Literature Book Review',
    description: 'Complete the book review on the assigned literature book by next week.',
    timestamp: '2024-06-13T11:15:00',
    read: false
  }
];

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [filter, setFilter] = useState<string>('All'); // Default filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification =>
      notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'All') {
      return true;
    } else {
      return notification.type === filter;
    }
  }).filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase())
    || notification.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sample data for the third section
  const recentActivities = [
    { id: 1, title: 'Completed: Math Homework', timestamp: '2024-07-06T12:00:00' },
    { id: 2, title: 'Submitted: English Essay', timestamp: '2024-07-04T11:30:00' },
    { id: 3, title: 'Read: New Library Hours', timestamp: '2024-07-04T11:30:00' }
  ];

  const quickLinks = [
    { id: 1, title: 'Class Schedule', url: '/schedule' },
    { id: 2, title: 'Grades Overview', url: '/grades' },
    { id: 3, title: 'Library Resources', url: '/library' }
  ];

  return (
    <>
    <NavbarComponent />
    <div className="container mx-auto p-4 flex flex-col md:flex-row h-screen">
      {/* Summary and Filter Section (Left) */}
      <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Notifications Summary</h2>
          <p className="text-gray-600">You have {notifications.length} notifications.</p>
          <p className="text-gray-600">Filtered: {filteredNotifications.length}</p>
        </div>
        {/* Filter and Search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Filter Notifications</h2>
          <div className="flex mb-4 space-x-4">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white flex-1"
            >
              <option value="All">All</option>
              <option value="Assignment">Assignment</option>
              <option value="Grade">Grade</option>
              <option value="Announcement">Announcement</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="px-3 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white flex-1"
            />
          </div>
        </div>
      </div>
      {/* Notification List Section (Centered and Scrollable) */}
      <div className="w-full md:w-1/2 mx-auto overflow-y-auto h-full max-h-full">
        {filteredNotifications.map(notification => (
          <div key={notification.id} className={`p-4 border rounded-lg ${notification.read ? 'bg-gray-200' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.description}</p>
              </div>
              <div className="flex space-x-2">
                <span className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</span>
                {!notification.read && (
                  <button onClick={() => markAsRead(notification.id)} className="text-xs text-blue-500 hover:text-blue-700 focus:outline-none">Mark as Read</button>
                )}
                <button onClick={() => deleteNotification(notification.id)} className="text-xs text-red-500 hover:text-red-700 focus:outline-none">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Section (Right) */}
      <div className="w-full md:w-1/3 md:ml-4 mt-4 md:mt-0">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
          <ul className="list-disc list-inside">
            {/* Sample recent activities */}
            <li className="text-gray-600">Completed: Math Homework - {new Date('2024-07-06T12:00:00').toLocaleString()}</li>
            <li className="text-gray-600">Submitted: English Essay - {new Date('2024-07-06T10:00:00').toLocaleString()}</li>
            <li className="text-gray-600">Read: New Library Hours - {new Date('2024-07-04T11:30:00').toLocaleString()}</li>
            {/* Add more recent activities here */}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul className="list-disc list-inside">
            {/* Sample quick links */}
            <li><a href="/schedule" className="text-blue-500 hover:text-blue-700">Class Schedule</a></li>
            <li><a href="/grades" className="text-blue-500 hover:text-blue-700">Grades Overview</a></li>
            <li><a href="/library" className="text-blue-500 hover:text-blue-700">Library Resources</a></li>
            {/* Add more quick links here */}
          </ul>
        </div>
      </div>
    </div>
    <Footer />
            </>
  );
};

export default NotificationPage;




  