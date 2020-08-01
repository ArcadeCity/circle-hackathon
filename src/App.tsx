import React, { useEffect, useState } from 'react'
import { Circle } from './circle'
import { Screen } from './components'

const circle = new Circle()

function App() {
    const [masterWalletId, setMasterWalletId] = useState('')
    const [balance, setBalance] = useState()

    const fetchInitialData = async () => {
        setMasterWalletId(await circle.fetchMasterWalletId())
        setBalance(await circle.fetchBalance())
    }

    useEffect(() => {
        fetchInitialData()
    }, [])

    return (
        <Screen>
            <p>{`Master wallet ID: ${masterWalletId}`}</p>
            <p>{`Total balance (available): ${circle.formatBalance(
                balance,
                'available',
            )}`}</p>
            <p>{`Total balance (unsettled): ${circle.formatBalance(
                balance,
                'unsettled',
            )}`}</p>
        </Screen>
    )
}

export default App
