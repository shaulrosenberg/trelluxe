import { useState } from "react"
// import MuiDatePicker
import { updateTask } from "../../store/board.actions"

export function DatesContent() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return(
        <section>
            <p>Date1</p>
            <p>Date2</p>
            <p>Date3</p>
            <p>Date4</p>
        </section>
    )
}