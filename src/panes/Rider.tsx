import React from 'react'
import { Button, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const Rider = () => {
    const { addDemoCard, setPane } = useStore((state: State) => state.actions)
    return (
        <>
            <Text preset="title">Add payment card</Text>
            <Text preset="description">To pay for rides or delivery service</Text>
            <Button onClick={addDemoCard}>Add Demo Card</Button>
            <Button secondary onClick={() => setPane('intro')}>
                Back
            </Button>
        </>
    )
}
