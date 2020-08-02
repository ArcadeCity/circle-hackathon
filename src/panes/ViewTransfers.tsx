import React from 'react'
import { Button, styles, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const ViewTransfers = () => {
    const { formatWalletId, setPane } = useStore((state: State) => state.actions)
    const transfers = useStore((state: State) => state.transfers)
    return (
        <>
            <Text preset="title">View Transfers</Text>
            <Text preset="description">See a list of transfers.</Text>

            {transfers.map((transfer: any) => {
                return (
                    <p key={transfer.id} style={styles.guildList}>
                        <span style={styles.highlight}>
                            ${transfer.amount.amount} {transfer.amount.currency}
                        </span>{' '}
                        from {formatWalletId(transfer.source.id)} to{' '}
                        {formatWalletId(transfer.destination.id)} - {transfer.status}
                    </p>
                )
            })}

            <Button secondary onClick={() => setPane('intro')}>
                Back to the beginning
            </Button>
        </>
    )
}
