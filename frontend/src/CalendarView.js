import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const data = [
  {
    module: "Mathematics 101",
    classroom: "Room A1",
    start: "2024-08-01T09:00",
    end: "2024-08-03T10:30",
    day_of_week: "Monday",
    batch: "Batch A",
    faculty: "Dr. John Smith",
    user: "student_001",
  },
  {
    module: "Physics 201",
    classroom: "Room B2",
    start: "2024-08-01T09:00",
    end: "2024-08-03T10:30",
    day_of_week: "Wednesday",
    batch: "Batch B",
    faculty: "Prof. Jane Doe",
    user: "student_002",
  },
  {
    module: "Chemistry 101",
    classroom: "Room C3",
    start: "2024-08-05T09:00",
    end: "2024-08-05T10:30",
    day_of_week: "Friday",
    batch: "Batch A",
    faculty: "Dr. Alice Johnson",
    user: "student_003",
  },
  {
    module: "Biology 102",
    classroom: "Room D4",
    start: "2024-08-06T09:00",
    end: "2024-08-07T10:30",
    day_of_week: "Tuesday",
    batch: "Batch C",
    faculty: "Prof. Michael Brown",
    user: "student_004",
  },
  {
    module: "Computer Science 301",
    classroom: "Room E5",
    start: "2024-08-03T09:00",
    end: "2024-08-05T10:30",
    day_of_week: "Thursday",
    batch: "Batch D",
    faculty: "Dr. Emily Davis",
    user: "student_005",
  },
];

function CalendarView() {
  const [events, setEvents] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    module: "",
    classroom: "",
    start: new Date(),
    end: new Date(),
    day_of_week: "",
    batch: "",
    faculty: "",
    user: "",
  });

  useEffect(() => {}, []);

  const handleDateClick = (date) => {
    const overlappingEvent = events.find((event) =>
      moment(date).isBetween(event.start, event.end, null, "[)")
    );

    if (overlappingEvent) {
      alert(
        `The time slot has already an appointment scheduled for "${overlappingEvent.module}"`
      );
      return;
    }

    setFormData({
      id: null,
      module: "",
      classroom: "",
      start: date,
      end: date,
      day_of_week: "",
      batch: "",
      faculty: "",
      user: "",
    });
    setShowForm(true);
  };

  const handleEventClick = (event) => {
    setFormData({
      id: event.id,
      module: event.module,
      classroom: event.classroom,
      start: event.start,
      end: event.end,
      day_of_week: event.day_of_week,
      batch: event.batch,
      faculty: event.faculty,
      user: event.user,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newEvent = {
      ...formData,
      start: new Date(formData.start),
      end: new Date(formData.end),
      id: formData.id ?? new Date().getTime(),
    };

    const isExactOverlap = events.some(
      (event) =>
        moment(newEvent.start).isBetween(event.start, event.end, null, "[)") ||
        moment(newEvent.end).isBetween(event.start, event.end, null, "[)")
    );

    if (isExactOverlap && formData.id === null) {
      alert(
        `The time slot has already an appointment scheduled for "${
          events.find((event) =>
            moment(newEvent.start).isBetween(event.start, event.end, null, "[)")
          ).module
        }"`
      );
      return;
    }

    if (formData.id === null) {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } else {
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === formData.id ? newEvent : event))
      );
    }
    setShowForm(false);
  };

  const handleRemove = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== formData.id)
    );
    setShowForm(false);
  };

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
        onSelectEvent={(event) => handleEventClick(event)}
        selectable
      />
      {showForm && (
        <div className="event-form">
          <h3>{formData.id === null ? "Add Event" : "Edit Event"}</h3>
          <div style={{ display: "grid" }}>
            <div>
              <label>Module:</label>
              <input
                type="text"
                name="module"
                value={formData.module}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Classroom:</label>
              <input
                type="text"
                name="classroom"
                value={formData.classroom}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="datetime-local"
                name="start"
                value={moment(formData.start).format("YYYY-MM-DDTHH:mm")}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="datetime-local"
                name="end"
                value={moment(formData.end).format("YYYY-MM-DDTHH:mm")}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Day of Week:</label>
              <input
                type="text"
                name="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Batch:</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Faculty:</label>
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>User:</label>
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: "2rem" }}>
              <button onClick={handleSubmit}>
                {formData.id === null ? "Save" : "Update"}
              </button>
              {formData.id !== null && (
                <button
                  onClick={handleRemove}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Remove
                </button>
              )}
              <button
                onClick={() => setShowForm(false)}
                style={{ backgroundColor: "gray", color: "white" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;
