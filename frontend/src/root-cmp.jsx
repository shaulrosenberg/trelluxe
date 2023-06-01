import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { HomePage } from './pages/home-page'
import { UserDetails } from './pages/user-details'
import { LoginSignup } from './pages/login-signup'
import { BoardIndex } from './pages/board-index'
import { Workspace } from './pages/workspace'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/board/:boardId' element={<BoardIndex />} />
                    <Route path='/workspace' element={<Workspace />} />
                    <Route path='/login' element={<LoginSignup />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}
