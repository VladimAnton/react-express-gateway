import React, {useContext, useEffect} from 'react'
import { useHttp } from '../hooks/http.hook'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import { useMessage } from '../hooks/message.hook'

export const SendManyTo = ({ receivers }) => {
    const {request, error, clearError} = useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)

    let phoneNumbers = []

    const removeHandler = (NumberPhone, id) => {
        var notExisting = true
        NumberPhone = '380' + NumberPhone
        if (phoneNumbers.length > 0) {
            for(let i = 0; i < phoneNumbers.length; i++) {
                if (NumberPhone === phoneNumbers[i]) {
                    var arrayPhoneNumbers = phoneNumbers.filter(item => item!== NumberPhone)
                    var choosenRow = document.getElementById(`${id}`)
                    choosenRow.style.backgroundColor = '#fff'
                    phoneNumbers = arrayPhoneNumbers
                    notExisting = false
                }
            }
            if (notExisting) {
                alert ('Действие не возможно')
                notExisting = false
            }
        }
        else  {
            alert('Действие не возможно')
        }
    }

    //добавление получателя в рассылку 
    const phoneNumberHandler = (NumberPhone, id) => {

        var choosenRow = document.getElementById(`${id}`)
        choosenRow.style.backgroundColor = '#64ffda'
        
        NumberPhone = '380' + NumberPhone
        for(let j = 0; j < phoneNumbers.length; j++) {
            if( NumberPhone === phoneNumbers[j]){
                alert('Этот номер уже добавлен в рассылку')
                var existing = true
            }
        }
        if (!existing) {
            phoneNumbers.push(NumberPhone)
        }
        existing = false
        console.log('Добавление', phoneNumbers)
    }

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    
    const sendManyHandler = async (id, index) => {
       try {
            let smsText = document.getElementById("sms").value
            const data = await request(`/api/receiver/smsmanysend`, 'POST', {sms: smsText, from: phoneNumbers}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log('data: ', data)
        } catch (e) {
        }
        //console.log("FORM:", phoneNumbers)
        //console.log("I:", i)
    }

    if (!receivers.length) {
        return <p className="center">Пользователей пока нет</p>
    }

    return (
        <>
            <h3>Введите текст SMS</h3>
            <div className='TextInput'>
                <div className="input-field">
                    <textarea  className="yellow-input"
                    rows='5'
                    placeholder="Tекст SMS"
                    id="sms"
                    type="text"
                    name="sms"
                />                             
                </div>
                <button
                    className="btn-large waves-effect waves-light yellow darken-4"
                    onClick={sendManyHandler}
                ><i className="material-icons right">send</i>
                    Отправить 
                </button>
            </div>

            <h2>Список зарегестрированных получателей</h2>
            <table className="highlight centered">
            <thead>
            <tr>
                <th>№</th>
                <th>Имя</th>
                <th>Номер телефона</th>
                <th>Добавить в рассылку</th>
                <th>Удалить из расслыки</th>
                <th>Инфо</th>
            </tr>
            </thead>

            <tbody>
            {receivers.map((receiver, index) => {
                return (
                <tr key={receiver._id} id={receiver._id}>
                    <td>{index + 1}</td>
                    <td>{receiver.name}</td>
                    <td>+(380) {receiver.phoneNumber}</td>
                    <td>
                        <button
                            className="btn-floating waves-effect waves-light blue darken-1"
                            onClick={() => phoneNumberHandler(receiver.phoneNumber, receiver._id)}
                        >
                            <i className="material-icons right">add</i>
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn-floating waves-effect waves-light red darken-1"
                            onClick={() => removeHandler(receiver.phoneNumber, receiver._id)}
                        >
                            <i className="material-icons right">remove</i>
                        </button>
                    </td>
                    <td>
                        <Link to={`/receivers/${receiver._id}`}>Открыть</Link>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </table>
      </>
    )
}