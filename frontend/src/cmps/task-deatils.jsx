import { useEffect } from "react"
import { useParams } from "react-router"
import {boardService} from '../services/board.service'

export function TaskDetails(){

    const { taskId } = useParams()

    useEffect(() => {
        console.log(taskId)
        console.log(currTask())
   }, [])

   async function currTask(taskId){
    return await boardService.getById(taskId)
   }

    return <section>
        <h1>hello task</h1>
    </section>
}