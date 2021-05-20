import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'
import { ReceiverCard} from '../components/ReceiverCard'

export const ReceiversPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [receiver, setReceiver] = useState(null)
    const receiverId = useParams().id
    
    const getReceiver = useCallback( async () => {
        try {
            const fetched = await request(`/api/receiver/${receiverId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setReceiver(fetched)
        } catch (e) {}
    }, [token, receiverId, request])

    useEffect( () => {
        getReceiver()
    }, [getReceiver])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && receiver && <ReceiverCard receiver={receiver}/>}
        </>
    )
}