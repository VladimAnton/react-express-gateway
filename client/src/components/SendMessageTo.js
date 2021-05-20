import React from 'react'
import {useHistory} from 'react-router-dom'

export const SendMessageTo = ({ receivers }) => {
    const history = useHistory()

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
              <th>Отправить SMS</th>
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
                            className="btn waves-effect waves-light blue darken-2"
                            value={receiver._id}
                            onClick={() => history.push(`/sendsms/${receiver.phoneNumber}`)}
                        >
                            Отправить SMS<i className="material-icons right">send</i>
                        </button>
                    </td>
                </tr>
              )
          })}
        </tbody>
      </table>
    )
}