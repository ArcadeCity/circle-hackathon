import React, { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { Circle } from './circle'
import { Button, Screen, Text } from './components'

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
            <Box fill pad="medium" justify="center" align="center">
                <img
                    src="/logo.png"
                    style={{
                        height: 90,
                        width: 90,
                        marginBottom: 15,
                        objectFit: 'contain',
                    }}
                    alt="Arcade City logo"
                />

                <Text preset="title">Join Arcade City</Text>
                <Text preset="descriptionSlim">Are you a rider or driver?</Text>
                <div style={{ marginTop: 8 }} />
                <Button>Rider</Button>
                <Button>Driver</Button>

                {/* <div style={{ marginTop: 40 }}>
                    <p>{`Master wallet ID: ${masterWalletId}`}</p>
                    <p>{`Total balance (available): ${circle.formatBalance(
                        balance,
                        'available',
                    )}`}</p>
                    <p>{`Total balance (unsettled): ${circle.formatBalance(
                        balance,
                        'unsettled',
                    )}`}</p>
                </div> */}
            </Box>
        </Screen>
    )
}

export default App
