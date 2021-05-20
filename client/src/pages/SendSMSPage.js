import React, { useState, useEffect, useContext } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const SendSMSPage = () => {
    const history = useHistory()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const { request, error, clearError} = useHttp()
    const receiverPhoneNumber = useParams().phoneNumber
    const [form, setForm] = useState({
        phoneNumber: receiverPhoneNumber, 
        sms: ''
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const sendHandler = async () => {
        try {
            const data = await request('/api/receiver/smssend', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log('data: ', data)
            //history.push('/receiverslist')
        } catch (e) {}
    }    

    useEffect( () => {
        window.M.updateTextFields()
    })

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h4>Отправка SMS выбранному получателю</h4>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title"><h4>Введите текст SMS</h4></span>
                        <span className="receiverNumber"><i className="material-icons prefix">phone</i><strong>Номер получателя SMS: +(380) {receiverPhoneNumber}</strong></span>
                        <div>
                            <div className="input-field">
                                <textarea  className="yellow-input"
                                    //className='input'
                                    rows='5'
                                    placeholder="Tекст SMS"
                                    id="sms"
                                    type="text"
                                    name="sms"
                                    value={form.sms}
                                    onChange={changeHandler}
                                />                             
                            </div>
                        </div>
                    </div>
                    <div className="card-action"> 
                        <button
                            className="btn waves-effect waves-light grey lighten-1 black-text"
                            style={{marginRight: 50}}
                            onClick={() => history.push('/sendmessage')}
                        >
                            Назад
                        </button>
                        <button
                            className="btn waves-effect waves-light yellow darken-4"
                            onClick={sendHandler}
                        >
                            Отправить 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

///smssend/:id