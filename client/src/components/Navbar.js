import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')  
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem'}}>
                <span className="brand-logo"><i className="material-icons prefix" style={{ fontSize: ' 3rem '}}>email</i>Рассылка SMS сообщений</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create"><i className="material-icons left">person_add</i>Добавить получателя</NavLink></li>
                    <li><NavLink to="/receiverslist"><i className="material-icons left">view_list</i>Список получателей</NavLink></li>
                    <li><NavLink to="/sendmessage"><i className="material-icons left">send</i>Отправить SMS</NavLink></li>
                    <li><NavLink to="/sendmany"><i className="material-icons left">sms</i>Массовая рассылка</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}> <i className="material-icons right">exit_to_app</i>Выйти</a></li>
                </ul>
            </div>
        </nav>  
    )
}