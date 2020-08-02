import React from 'react'
import { Button, styles, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'
import moment from 'moment'

export const ViewTransfers = () => {
    const { demoTransferDriver, demoTransferDues, formatWalletId, setPane } = useStore(
        (state: State) => state.actions,
    )
    const transfers = useStore((state: State) => state.transfers)
    return (
        <>
            <Text preset="title">View Transfers</Text>
            <Text preset="description">
                See all transfers and make demo transfers manually.
            </Text>

            {transfers.map((transfer: any) => {
                return (
                    <p key={transfer.id} style={styles.guildList}>
                        <span style={styles.highlight}>
                            ${transfer.amount.amount} {transfer.amount.currency}
                        </span>{' '}
                        from {formatWalletId(transfer.source.id)} to{' '}
                        {formatWalletId(transfer.destination.id)} - {transfer.status} -{' '}
                        {moment(transfer.createDate).fromNow()}
                    </p>
                )
            })}

            <div style={{ width: 450, textAlign: 'center', marginTop: 20 }}>
                <Text preset="description">
                    In a real application we'd listen via webhook for transactions
                    settling after 3-4 days, then send the transfer automatically on the
                    backend. Here you can manually send transfers to random
                    drivers+guilds.
                </Text>

                <Button onClick={demoTransferDriver}>Example driver transfer</Button>
                <Text preset="description">
                    Remember that $20 ride payment?{' '}
                    <span role="img" aria-label="Up arrow">
                        ⬆️
                    </span>
                    Here we'll send 80% to the driver and 10% to their guild (for now
                    chosen at random).
                </Text>
                <Button onClick={demoTransferDues}>Example dues transfer</Button>
                <Text preset="description">
                    <span role="img" aria-label="Up arrow">
                        ⬆️
                    </span>
                    We'll pick a random guild and send them 90% of their dues amount,
                    assuming we have enough in the main balance.
                </Text>
                <Button secondary onClick={() => setPane('intro')}>
                    Back to the beginning
                </Button>
            </div>
        </>
    )
}
