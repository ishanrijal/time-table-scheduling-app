import React, { useState } from "react";

const EventForm = ({ addEvent, users }) => {
  console.log("rendered");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUser = users.find((user) => user.id === parseInt(userId));
    addEvent({ title, startTime, endTime, user: selectedUser });
    setTitle("");
    setStartTime("");
    setEndTime("");
    setUserId("");
  };

  return (
    <>
      <form className="event-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <label>User</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Event</button>
      </form>
    </>
  );
};

export default EventForm;
