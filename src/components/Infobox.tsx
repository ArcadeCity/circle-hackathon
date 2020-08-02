import React, { useEffect } from 'react'
import { Box } from 'grommet'
import { styles } from './styles'
import { useStore } from '../store'
import { State } from 'zustand'

export function Infobox() {
    const balance = useStore((state: State) => state.balance)
    const card = useStore((state: State) => state.card)
    const guild = useStore((state: State) => state.guild)
    const masterWalletId = useStore((state: State) => state.masterWalletId)
    const payment = useStore((state: State) => state.payment)
    const { fetchInitialData, formatBalance } = useStore((state: State) => state.actions)

    useEffect(() => {
        fetchInitialData()
    }, [fetchInitialData])

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
                        {formatBalance(balance, 'available')}
                    </span>
                </p>
                <p style={styles.info}>
                    Total balance (unsettled):{' '}
                    <span style={styles.highlight}>
                        {formatBalance(balance, 'unsettled')}
                    </span>
                </p>
                <p style={styles.info}>
                    Demo card connected?:{' '}
                    <span style={styles.highlight}>
                        {card && card === 'connecting'
                            ? 'Connecting...'
                            : card && card.last4
                            ? `Yes - Last4: ${card.last4}`
                            : 'No'}
                    </span>
                </p>
                <p style={styles.info}>
                    Demo driver payment?:{' '}
                    <span style={styles.highlight}>
                        {payment && payment === 'paying'
                            ? 'Paying...'
                            : payment && payment.status
                            ? `Yes - ${payment.status}`
                            : 'No'}
                    </span>
                </p>
                <p style={styles.info}>
                    Guild created?:{' '}
                    <span style={styles.highlight}>
                        {guild && guild === 'creating'
                            ? 'Creating...'
                            : guild && guild.name
                            ? `Yes - ${guild.name} ($${guild.dues}/mo)`
                            : 'No'}
                    </span>
                </p>
            </Box>
        </div>
    )
}
