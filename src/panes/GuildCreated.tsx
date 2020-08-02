import React from 'react'
import { Button, styles, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const GuildCreated = () => {
    const { setPane } = useStore((state: State) => state.actions)
    return (
        <div style={{ maxWidth: 400, textAlign: 'center' }}>
            <Text preset="title">Guild created!</Text>
            <Text preset="description">Congrats - you can start recruiting!</Text>
            <Text preset="description">
                <span style={{ fontWeight: 700 }}>Invite code:</span>{' '}
                <span style={styles.highlight}>NOTAREALCODE</span>
            </Text>
            <Text preset="description">
                This is just a quick demo integrating Circle APIs. If you're interested in
                making a real guild when this goes live, email us{' '}
                <a href="mailto:cityhall@arcade.city" style={styles.link}>
                    cityhall@arcade.city
                </a>
            </Text>
            <Button onClick={() => setPane('viewGuilds')}>View Guilds</Button>
            <Button secondary onClick={() => setPane('intro')}>
                Back to the beginning
            </Button>
        </div>
    )
}
