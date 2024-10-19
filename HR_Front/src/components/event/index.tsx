import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description }) => {
  return (
    <div className="event-card">
      <div className="card-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="card-icon"
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-date">{date}</p>
        </div>
      </div>
      <div className="card-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
