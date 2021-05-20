import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'
import { SendMessageTo } from '../components/SendMessageTo'

export const SendMessagePage = () => {
    const [receivers, setReceivers] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchReceivers = useCallback(async () => {
        try{    
            const fetched = await request('/api/receiver', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setReceivers(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchReceivers()
    }, [fetchReceivers])

    if(loading) {
        return <Loader />
    }

    return (
       <>
            {!loading && <SendMessageTo receivers={ receivers }/>}
        </>
    )
}