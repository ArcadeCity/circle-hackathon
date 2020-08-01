import React from 'react'
import { Button, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const Rider = () => {
    const { addDemoCard, demoPayDriver, setPane } = useStore(
        (state: State) => state.actions,
    )

    // State for adding card
    const card = useStore((state: State) => state.card)
    const connecting = card && card === 'connecting'
    const cardConnected = card && !!card.last4

    // State for paying driver
    const payment = useStore((state: State) => state.payment)
    const paying = payment && payment === 'paying'

    if (cardConnected) {
        return (
            <>
                <Text preset="title">Pay driver for service</Text>
                <Button onClick={demoPayDriver} disabled={paying}>
                    {paying ? 'Paying...' : 'Pay driver $20'}
                </Button>
            </>
        )
    } else
        return (
            <>
                <Text preset="title">Add payment card</Text>
                <Text preset="description">To pay for rides or delivery service</Text>
                <Button onClick={addDemoCard} disabled={connecting}>
                    {connecting ? 'Connecting...' : 'Add Demo Card'}
                </Button>
                <Button secondary onClick={() => setPane('intro')}>
                    Back
                </Button>
            </>
        )
}
