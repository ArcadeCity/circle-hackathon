import React, { useEffect, useState } from 'react'
import { Circle } from './circle'

const circle = new Circle()

function App() {
    const [masterWalletId, setMasterWalletId] = useState('')

    const fetchInitialData = async () => {
        setMasterWalletId(await circle.fetchMasterWalletId())
    }

    useEffect(() => {
        fetchInitialData()
    }, [])

    return <p>{`Master wallet ID: ${masterWalletId}`}</p>
}

export default App
