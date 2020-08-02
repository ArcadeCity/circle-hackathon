import React from 'react'
import { Button, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const ViewGuilds = () => {
    const { setPane } = useStore((state: State) => state.actions)
    return (
        <>
            <Text preset="title">View Guilds</Text>
            <Text preset="description">See a list of guilds accepting new members.</Text>

            <Button secondary onClick={() => setPane('driver')}>
                Back
            </Button>
        </>
    )
}
