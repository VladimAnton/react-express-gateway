import React, { useState, useEffect, useContext } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const UpdateReceiverPage = () => {
    const history = useHistory()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const { request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        name: '', phoneNumber: ''
    })
    const receiverId = useParams().id

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const updateHandler = async () => {
        try {
            const data = await request(`/api/receiver/update/${receiverId}`, 'PUT', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log('data: ', data)
            history.push('/receiverslist')
        } catch (e) {
            //надо написать обработчик ошибок на ввод
        }
        //console.log("key:", receivers[index])
    }    

    useEffect( () => {
        window.M.updateTextFields()
    })

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h4>Обновление информации о получатели SMS</h4>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Новые данные получателя</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите имя и фамилию"
                                    id="name"
                                    type="text"
                                    className="yellow-input"
                                    name="name"
                                    value={form.name}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="name">Имя и фамилия</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите номер телефона"
                                    id="phonenumber"
                                    type="tel"
                                    pattern="[0-9]{9}"
                                    className="yellow-input"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="phonenumber">Номер телефона (9 чисел)</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action"> 
                        <button
                            className="btn waves-effect waves-light grey lighten-1 black-text"
                            style={{marginRight: 50}}
                            onClick={() => history.push('/receiverslist')}
                        >
                            Назад
                        </button>
                        <button
                            className="btn waves-effect waves-light yellow darken-4"
                            onClick={updateHandler}
                        >
                            Обновить 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}