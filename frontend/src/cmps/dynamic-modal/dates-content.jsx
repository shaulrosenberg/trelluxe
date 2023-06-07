import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import { parseISO, format, isValid } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"

export function DatesContent({ task, boardId, groupId, updateTask }) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dueDate, setDueDate] = useState("")
    const [dueCheckbox, setDueCheckbox] = useState(false)
    const [reminder, setReminder] = useState('None')

    useEffect(() => {
        if(task?.dueDate && isValid(parseISO(task.dueDate))) {
            setSelectedDate(parseISO(task.dueDate))
        } else {
            setSelectedDate(new Date())
        }
    }, [task])

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleDueChange = (event) => {
        setDueDate(event.target.value)
        // update due date in your task
    }

    const handleDueCheckboxChange = (event) => {
        setDueCheckbox(event.target.checked)
        // perform action when due checkbox is changed
    }

    const handleReminderChange = (event) => {
        setReminder(event.target.value)
        // perform action when reminder is changed
    }

    async function handleSave() {
        // Save changes
        const updatedTask = JSON.parse(JSON.stringify(task))
        updatedTask.dueDate = selectedDate

        await updateTask(updatedTask, boardId, groupId)
    }

    async function handleRemove() {
        // Remove due date
        await updateTask({ ...task, dueDate: null }, boardId, groupId)
    }

    return (
        <section className="dates-content">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
                inline
                minDate={new Date()}
                highlightDates={[new Date()]}
                className="date-picker"
            />
            <div className="date-inputs">
                <div className="date-input-group">
                    <label className="date-checkbox-label">
                        Due Date
                    </label>
                    <div className="checkbox-input-wrapper">
                        <input
                            type="checkbox"
                            checked={dueCheckbox}
                            onChange={handleDueCheckboxChange}
                            className="date-checkbox-input"
                        />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={handleDueChange}
                            disabled={!dueCheckbox}
                            className="date-input"
                        />
                    </div>
                </div>
                <div className="reminder-input-group">
                    <label className="reminder-label">Set due date reminder</label>
                    <select value={reminder} onChange={handleReminderChange} className="reminder-select">
                        <option value="None">None</option>
                        <option value="At time of due date">At time of due date</option>
                        <option value="1 Hour before">1 Hour before</option>
                        <option value="1 Day before">1 Day before</option>
                        <option value="2 Days before">2 Days before</option>
                    </select>
                    <p className="reminder-description">Reminders will be sent to all members and watchers of this card.</p>
                </div>
                <div className="buttons-group">
                    <button onClick={handleSave} className="save-button">Save</button>
                    <button onClick={handleRemove} className="remove-button">Remove</button>
                </div>
            </div>
        </section>
    )
}
