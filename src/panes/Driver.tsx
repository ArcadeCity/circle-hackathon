import React from 'react'
import { Button, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const Driver = () => {
    const { setPane } = useStore((state: State) => state.actions)
    return (
        <>
            <Text preset="title">Join or create guild?</Text>
            <Text preset="description">
                Drivers must be in a guild before providing rides or delivery service.
            </Text>
            <Button onClick={() => setPane('joinGuild')}>Join Guild</Button>
            <Button onClick={() => setPane('createGuild')}>Create Guild</Button>
            <Button secondary onClick={() => setPane('intro')}>
                Back
            </Button>
        </>
    )
}
