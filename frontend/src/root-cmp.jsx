import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { HomePage } from './pages/home-page'
import { UserDetails } from './pages/user-details'
import { LoginSignup } from './pages/login-signup'
import { BoardIndex } from './pages/board-index'
import { Workspace } from './pages/workspace'
import { TaskDetails } from './pages/task-details'

export function RootCmp() {

    return (
        <div className='main-component'>
            <AppHeader />
            <main className='main-container'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/board/:boardId' element={<BoardIndex />}>
                        <Route path='group/:groupId/task/:taskId' element={<TaskDetails />} />
                    </Route>
                    <Route path='/workspace' element={<Workspace />} />
                    <Route path='/login' element={<LoginSignup />} />
                    <Route path="user/:id" element={<UserDetails />} />

                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}
