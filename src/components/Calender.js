import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  differenceInCalendarWeeks,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../app/features/attendance/attendanceSlice";
import { useState } from "react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  const records = useSelector((state) => state.attendance.records);
  const currentMonth = format(currentDate, "yyyy-MM");
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const monthRecords = Object.entries(records).filter(([date]) =>
    date.startsWith(currentMonth),
  );

  const summary = {
    WFO: 0,
    WFH: 0,
    Leave: 0,
  };

  monthRecords.forEach(([_, status]) => {
    if (summary[status] !== undefined) {
      summary[status]++;
    }
  });

  const totalWeeks = differenceInCalendarWeeks(monthEnd, monthStart) + 1;

  const requiredWFO = totalWeeks * 3;

  const wfoPercentage =
    requiredWFO > 0
      ? Math.min(100, Math.round((summary.WFO / requiredWFO) * 100))
      : 0;

  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const startDayIndex = getDay(monthStart);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const handleStatusSelect = (status) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    dispatch(
      setStatus({
        date: formattedDate,
        status,
      }),
    );

    setSelectedDate(null);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-layout">
        <div className="calendar-grid-wrapper">
          <div className="calendar-header">
            <button onClick={handlePrevMonth}>⬅</button>
            <h2>{format(currentDate, "MMMM yyyy")}</h2>
            <button onClick={handleNextMonth}>➡</button>
          </div>
          <div className="calendar-grid">
            {weekDays.map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}

            {Array.from({ length: startDayIndex }).map((_, index) => (
              <div key={"empty-" + index}></div>
            ))}

            {days.map((day) => {
              const formattedDate = format(day, "yyyy-MM-dd");
              const status = records[formattedDate];

              const dayIndex = getDay(day);
              const isWeekend = dayIndex === 0 || dayIndex === 6;

              return (
                <div
                  key={formattedDate}
                  className={`day-cell 
                  ${status ? status.toLowerCase() : ""} 
                  ${isWeekend ? "weekend" : ""}
                `}
                  onClick={() => {
                    if (!isWeekend) {
                      handleDayClick(day);
                    }
                  }}
                >
                  {format(day, "d")}
                </div>
              );
            })}
          </div>
        </div>
        <div className="summary-card">
          <h3>Monthly Summary</h3>

          <div className="stat wfo-stat">
            <span>WFO: </span>
            <strong>{summary.WFO}</strong>
          </div>

          <div className="stat wfh-stat">
            <span>WFH: </span>
            <strong>{summary.WFH}</strong>
          </div>

          <div className="stat leave-stat">
            <span>Leave: </span>
            <strong>{summary.Leave}</strong>
          </div>

          <div className="progress-section">
            <p>WFO Compliance</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${wfoPercentage}%` }}
              ></div>
            </div>
            <small>{wfoPercentage}%</small>
          </div>
        </div>
      </div>
      {selectedDate && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{format(selectedDate, "dd MMMM yyyy")}</h3>
            <p>Select Status:</p>

            <div className="modal-buttons">
              <button onClick={() => handleStatusSelect("WFO")}>WFO</button>
              <button onClick={() => handleStatusSelect("WFH")}>WFH</button>
              <button onClick={() => handleStatusSelect("Leave")}>Leave</button>
            </div>

            <button className="close-btn" onClick={() => setSelectedDate(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
