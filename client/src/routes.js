import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ReceiversPage} from './pages/ReceiversPage'
import {CreatePage} from './pages/CreatePage'
import {SendMessagePage} from './pages/SendMessagePage'
import {AuthPage} from './pages/AuthPage'
import {ReceiversListPage} from './pages/ReceiversListPage'
import {UpdateReceiverPage} from './pages/UpdateReceiverPage'
import {SendSMSPage} from './pages/SendSMSPage'
import {SendManyPage} from './pages/SendManyPage'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/receivers/:id"> 
                    <ReceiversPage />
                </Route>
                <Route path="/create" exact> 
                    <CreatePage />
                </Route>
                <Route path="/receiverslist" exact> 
                    <ReceiversListPage />
                </Route>
                <Route path="/sendmessage" exact> 
                    <SendMessagePage />
                </Route>
                <Route path="/updatereceiver/:id">
                    <UpdateReceiverPage />
                </Route>
                <Route path="/sendmany">
                    <SendManyPage />
                </Route>
                <Route path="/sendsms/:phoneNumber">  
                    <SendSMSPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}    