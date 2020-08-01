import React, { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { Circle } from '../circle'

const circle = new Circle()

export function Infobox() {
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
        <div style={{ position: 'absolute', top: 15, right: 15 }}>
            <Box
                pad="medium"
                round="medium"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', minWidth: 350 }}
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
                <p style={infoText}>{`Total balance (available): ${circle.formatBalance(
                    balance,
                    'available',
                )}`}</p>
                <p style={infoText}>{`Total balance (unsettled): ${circle.formatBalance(
                    balance,
                    'unsettled',
                )}`}</p>
            </Box>
        </div>
    )
}

const infoText = {
    margin: '5px 0',
}
