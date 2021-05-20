import React from 'react'

export const ReceiverCard = ({ receiver }) => {
    return (
        <>  
            <h2>Данные получателя SMS сообщения:</h2>

            <p>Имя и фамилия получателя:   <strong>{receiver.name}</strong></p>
            <p>Номер телефона получателя:    <strong>+(380)  {receiver.phoneNumber}</strong></p>
            <p>Дата добавления получателя:   <strong>{new Date(receiver.date).toLocaleDateString()}</strong></p>
            <p>ID получателя:   <strong>{receiver._id}</strong></p>                   
        </>
    )
}