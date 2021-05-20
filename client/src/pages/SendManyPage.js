import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'
import { SendManyTo } from '../components/SendManyTo'

export const SendManyPage = () => {
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
            {!loading && <SendManyTo receivers={ receivers }/>}
        </>
    )
}