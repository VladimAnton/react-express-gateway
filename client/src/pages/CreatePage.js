import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        name: '', phoneNumber: ''
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const addHandler = async () => {
        try {
            const data = await request('/api/receiver/make', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log('data: ', data)
            history.push(`/receivers/${data.receiver._id}`)
        } catch (e) {}
    }

    useEffect( () => {
        window.M.updateTextFields()
    })

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Добавление получателя SMS</h3>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Данные получателя</span>
                        <div>
                            <div className="input-field">
                                <i className="material-icons prefix">account_circle</i>
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
                                <i className="material-icons prefix">phone</i>
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
                            className="btn waves-effect waves-light yellow darken-4"
                            style={{marginRight: 50}}
                            onClick={addHandler}
                        >
                            Добавить
                        </button>
                        <button
                            type="reset"
                            className="btn waves-effect waves-light grey lighten-1 black-text"
                        >
                            Сбросить 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}