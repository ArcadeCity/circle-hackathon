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
    const paid = payment && payment.id

    if (paid) {
        return (
            <>
                <Text preset="title">Success!</Text>
                <Text preset="descriptionSlim">{`Payment ID: ${payment.id}`}</Text>
                <Text preset="descriptionSlim">
                    You should see the updated (unsettled) balance in the info box.
                </Text>
                <Text preset="description">
                    Now you can go back and use this same card to join a driver guild.
                </Text>
                <Button secondary onClick={() => setPane('intro')}>
                    Back to beginning
                </Button>
            </>
        )
    }
    if (cardConnected) {
        return (
            <>
                <Text preset="title">Pay driver for service</Text>
                <Text preset="description">Card ending in {card.last4} connected!</Text>
                <Button onClick={demoPayDriver} disabled={paying}>
                    {paying ? 'Paying...' : 'Pay driver $20'}
                </Button>
                <Button secondary onClick={() => setPane('intro')}>
                    Back to beginning
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
