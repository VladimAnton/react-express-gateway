import React, {useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import {Link, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'

export const ReceiversList = ({ receivers }) => {
    const history = useHistory()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    
    //запрос на удаление данных
    const deleteHandler = async (id, index) => {
       try {
            const data = await request(`/api/receiver/delete/${id}`, 'DELETE', {from: receivers[index]}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log('data: ', data)
            window.location.reload()
        } catch (e) {
        }
        console.log("key:", receivers[index])
    }

    if (!receivers.length) {
        return <p className="center">Пользователей пока нет</p>
    }

    return (
        <table className="highlight centered">
        <thead>
          <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Номер телефона</th>
              <th>Редактировать</th>
              <th>Удалить</th>
              <th>Инфо</th>
          </tr>
        </thead>

        <tbody>
          {receivers.map((receiver, index) => {
            return (
            <tr key={receiver._id}>
                <td>{index + 1}</td>
                <td>{receiver.name}</td>
                <td>+(380) {receiver.phoneNumber}</td>
                <td>
                    <button
                        className="btn waves-effect waves-light green darken-2"
                        value={receiver._id}
                        onClick={() => history.push(`/updatereceiver/${receiver._id}`)}
                    >
                        Редактировать<i className="material-icons right">edit</i>
                    </button>
                </td>
                <td>
                    <button
                        className="btn waves-effect waves-light red darken-2"
                        value={receiver._id}
                        onClick={() => deleteHandler(receiver._id, index)}
                    >
                        Удалить<i className="material-icons right">delete</i>
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
    )
}