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

                <div style={{ position: 'absolute', top: 15, left: 15 }}>
                    <Box
                        pad="medium"
                        round="medium"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)', minWidth: 400 }}
                    >
                        <p style={{ ...infoText, fontWeight: 'bold' }}>
                            Circle Demo for MoneyHacks 2020
                        </p>
                        <p style={infoText}>
                            Code available on{' '}
                            <a
                                href="https://github.com/ArcadeCity/circle-hackathon"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#AE30FF' }}
                            >
                                GitHub
                            </a>
                        </p>
                        <p style={infoText}>{`Master wallet ID: ${masterWalletId}`}</p>
                        <p
                            style={infoText}
                        >{`Total balance (available): ${circle.formatBalance(
                            balance,
                            'available',
                        )}`}</p>
                        <p
                            style={infoText}
                        >{`Total balance (unsettled): ${circle.formatBalance(
                            balance,
                            'unsettled',
                        )}`}</p>
                    </Box>
                </div>
            </Box>
        </Screen>
    )
}

export default App

const infoText = {
    margin: '5px 0',
}
