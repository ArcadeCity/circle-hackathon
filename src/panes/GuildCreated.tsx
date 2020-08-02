import React from 'react'
import { Button, styles, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const GuildCreated = () => {
    const { setPane } = useStore((state: State) => state.actions)
    return (
        <>
            <Text preset="title">Guild created!</Text>
            <Text preset="descriptionSlim">Congrats - you can start recruiting!</Text>
            <Text preset="description">
                <span style={{ fontWeight: 700 }}>Invite code:</span>{' '}
                <span style={styles.highlight}>NOTAREALCODE</span>
            </Text>

            <Button onClick={() => setPane('viewGuilds')}>View Guilds</Button>
            <Button secondary onClick={() => setPane('intro')}>
                Back to the beginning
            </Button>
        </>
    )
}
