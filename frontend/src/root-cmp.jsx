import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { HomePage } from './pages/home-page'
import { UserDetails } from './pages/user-details'
import { LoginSignup } from './pages/login-signup'
import { BoardIndex } from './pages/board-index'
import {Workspace} from './pages/workspace'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path='/' component={<HomePage />}></Route>
                    <Route path='/board/:boardId' component={<BoardIndex />}></Route>
                    <Route path='/workspace' component={<Workspace />}></Route>
                    <Route path='/login' component={<LoginSignup />}></Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


