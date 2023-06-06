import { useState } from "react";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export function DatesContent({ task, boardId, groupId, updateTask }) {
    const [selectedDate, setSelectedDate] = useState(task?.dueDate || new Date())

    const handleDateChange = (date) => {
        setSelectedDate(date);
        updateTask({ ...task, dueDate: date })
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <section className="dates-content">
                <DatePicker
                    label="Due date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    disablePast
                    format="MM/dd/yyyy"
                    inputVariant="outlined"
                    fullWidth
                />
            </section>
        </MuiPickersUtilsProvider>
    )
}
