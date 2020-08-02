import React from 'react'
import { Button, styles, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const Intro = () => {
    const { setDriver, setPane, setRider } = useStore((state: State) => state.actions)
    return (
        <>
            <img src="/logo.png" style={styles.logo} alt="Arcade City logo" />

            <Text preset="title">Join Arcade City</Text>
            <Text preset="description">Are you a rider or driver?</Text>

            <Button onClick={setRider}>Rider</Button>
            <Button onClick={setDriver}>Driver</Button>

            <Text preset="description">or</Text>
            <Button secondary onClick={() => setPane('viewGuilds')}>
                View Guilds
            </Button>
            <Button secondary onClick={() => setPane('viewTransfers')}>
                View Transfers
            </Button>
        </>
    )
}
