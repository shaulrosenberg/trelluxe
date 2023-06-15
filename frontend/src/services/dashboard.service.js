export const dashboardService = {
    getTasksByStatus,
    getTasksByGroups,
    getTasksByMember,
    getNumberOfTasks
}

function getTasksByStatus(groups) {
    const labels = ['Overdue', 'Due soon', 'On time', 'No due date', 'Completed']
    const data = { overdue: 0, dueSoon: 0, onTime: 0, noDueDate: 0, completed: 0 }
    groups.forEach((group) => {
        group.tasks.forEach((task) => {
            if (!task.dueDate) data.noDueDate += 1
            else if (task.dueDate.isDone) data.completed += 1
            else data[calcDueStatus(task.dueDate.date)] += 1
        })
    })
    const dataValues = Object.values(data)

    return {
        labels: labels,
        datasets: [
            {
                label: 'Tasks Per Status',
                backgroundColor: ['#EB5B46', '#EDD747', '#288fca', '#A0C2F6', '#78BB5d'],
                borderColor: ['#F9FAFC'],
                data: dataValues,
            },
        ],
    }
}

function getTasksByGroups(groups) {
    const labels = groups.map((group) => group.title)
    const taskCounter = groups.map((group) => group.tasks.length)

    return {
        labels: labels,
        datasets: [
            {
                label: 'Tasks Per Groups',
                backgroundColor: ['#EB5B46', '#EDD747', '#288fca', '#A0C2F6', '#78BB5d'],
                borderColor: ['#F9FAFC'],
                data: taskCounter,
            },
        ],
    }
}

function calcDueStatus(dueDate) {
    const then = new Date(dueDate)
    const now = new Date()
    const msBetweenDates = then.getTime() - now.getTime()
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)

    if (hoursBetweenDates < 0) return 'overdue'
    else if (hoursBetweenDates < 24) return 'dueSoon'
    else return 'onTime'
}

function getTasksByMember(groups, boardMembers) {
    const data = { noMember: 0 }
    groups.forEach((group) => {
        group.tasks.forEach((task) => {
            if (!task.memberIds || !task.memberIds.length) data.noMember += 1
            else {
                task.memberIds.forEach((memberId) => {
                    if (!data[memberId]) data[memberId] = 0
                    data[memberId] += 1
                })
            }
        })
    })
    let labels = Object.keys(data)
    labels = labels.map((label) => {
        if (label === 'noMember') return 'No member'
        else {
            const memberIdx = boardMembers.findIndex((member) => member._id === label)
            return boardMembers[memberIdx]?.fullname
        }
    })
    let dataValues = Object.values(data)

    return {
        labels: labels,
        datasets: [
            {
                label: 'Tasks Per Member',
                backgroundColor: ['#EB5B46', '#EDD747', '#288fca', '#A0C2F6', '#78BB5d', '#02aecb', '#e79216', '#e668ae', '#a86cc1', '#535f77'],
                borderColor: ['#F9FAFC'],
                data: dataValues,
            },
        ],
    }
}

function getNumberOfTasks(groups) {
   let tasksLength = 0
   groups.forEach(group => group.tasks.forEach(task => tasksLength++))
   return tasksLength
}