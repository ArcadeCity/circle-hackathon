import React, { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { styles } from './styles'
import { useStore } from '../store'
import { State } from 'zustand'

export function Infobox() {
    const balance = useStore((state: State) => state.balance)
    const card = useStore((state: State) => state.card)
    const guild = useStore((state: State) => state.guild)
    const guilds = useStore((state: State) => state.guilds)
    const masterWallet = useStore((state: State) => state.masterWallet)
    const masterWalletId = useStore((state: State) => state.masterWalletId)
    const payment = useStore((state: State) => state.payment)
    const transfers = useStore((state: State) => state.transfers)
    const { fetchInitialData, formatBalance } = useStore((state: State) => state.actions)

    useEffect(() => {
        fetchInitialData()
    }, [fetchInitialData])

    const [show, setShow] = useState(true)

    return (
        <div style={{ position: 'absolute', top: 15, right: 15 }}>
            {show && (
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
                        Main wallet ID:{' '}
                        <span style={styles.highlight}>{masterWalletId}</span>
                    </p>
                    <p style={styles.info}>
                        Main wallet balance:{' '}
                        <span style={styles.highlight}>
                            {formatBalance(masterWallet, 'main')}
                        </span>
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
                        You created a guild?:{' '}
                        <span style={styles.highlight}>
                            {guild && guild === 'creating'
                                ? 'Creating...'
                                : guild && guild.name
                                ? `Yes - ${guild.name} ($${guild.dues}/mo)`
                                : 'No'}
                        </span>
                    </p>
                    <p style={styles.info}>
                        # Guilds created:{' '}
                        <span style={styles.highlight}>{guilds && guilds.length}</span>
                    </p>
                    <p style={styles.info}>
                        # Transfers sent:{' '}
                        <span style={styles.highlight}>
                            {transfers && transfers.length}
                        </span>
                    </p>
                </Box>
            )}
            <p
                style={{ ...styles.link, textAlign: 'right', fontSize: 12 }}
                onClick={() => setShow(!show)}
            >
                Show/Hide Infobox
            </p>
        </div>
    )
}
