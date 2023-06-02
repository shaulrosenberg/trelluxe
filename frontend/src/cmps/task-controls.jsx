import { useEffect, useState } from 'react'

// icons
import { AiOutlineTags, AiOutlineMinus, AiOutlineCheckSquare, AiOutlineFieldTime, AiOutlineCopy } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { BsPersonPlus, BsArrowRight, BsArchive, BsSquareHalf } from "react-icons/bs";
import { MdOutlineAttachment } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";


// props: task/Id, group/Id, board/Id ?
export function TaskControls() {

    function onToggleModal() {

    }

    function onTaskRemove() {

    }

    // 
    function onTaskAddMember() {

    }

    return (
        <section className='task-controls'>
            <section className='add-to-card'>
                <h3 className="controls-title">Add to card</h3>
                <section className='btn-container'>
                    <button className='btn-task-control'><BsPersonPlus />Members</button>
                    <button className='btn-task-control'><AiOutlineTags />Labels</button>
                    <button className='btn-task-control'><AiOutlineCheckSquare />Checklist</button>
                    <button className='btn-task-control'><AiOutlineFieldTime />Dates</button>
                    <button className='btn-task-control'><MdOutlineAttachment />Attachment</button>
                    {/* Cover */}
                    <button className='btn-task-control'><BsArchive />Archive</button>
                </section>
            </section>
        </section>
    )
}