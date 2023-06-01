import { useState } from "react";
import { useDispatch } from 'react-redux';

export function AddTask({ groups }) {
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false)
    const [cardTitle, setCardTitle] = useState('Enter a title for this card...')

    function handleInputChange(ev) {
        ev.preventdefault()
        setCardTitle(ev.target.value)
    }

    async function handleSubmit(ev) {
        ev.preventdefault()

    }

    return (
        <>
            {
                isEditable ? (
                    <div className="add-task-opened">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter the card title"
                                value={cardTitle}
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>
                ) : (

                    <button onClick={() => setIsEditable(true)}>Add a card</button>
                )
            }
        </>
    )

}

