import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatesContent({ task, updateTask }) {
  const [selectedDate, setSelectedDate] = useState(task?.dueDate);

  useEffect(() => {
    setSelectedDate(task?.dueDate ? new Date(task.dueDate) : new Date());
  }, [task]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateTask({ ...task, dueDate: date });
  };

  return (
    <section className="dates-content">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        inline
        minDate={new Date()}
        highlightDates={[new Date()]}
      />
    </section>
  );
}
