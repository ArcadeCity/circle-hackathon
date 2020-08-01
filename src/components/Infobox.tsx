import React, { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { Circle } from '../circle'
import { styles } from './styles'

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
                <p style={styles.circleTitle}>Circle Demo &mdash; MoneyHacks 2020</p>
                <p style={{ ...styles.info, marginBottom: 20, textAlign: 'center' }}>
                    Code available on{' '}
                    <a
                        href="https://github.com/ArcadeCity/circle-hackathon"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                    >
                        GitHub
                    </a>
                </p>
                <p style={styles.info}>
                    Master wallet ID:{' '}
                    <span style={styles.highlight}>{masterWalletId}</span>
                </p>
                <p style={styles.info}>
                    Total balance (available):{' '}
                    <span style={styles.highlight}>
                        {circle.formatBalance(balance, 'available')}
                    </span>
                </p>
                <p style={styles.info}>
                    Total balance (unsettled):{' '}
                    <span style={styles.highlight}>
                        {circle.formatBalance(balance, 'unsettled')}
                    </span>
                </p>
            </Box>
        </div>
    )
}
