import React from 'react'
import { Button, Text, TextField } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const JoinGuild = () => {
    const { setPane } = useStore((state: State) => state.actions)
    return (
        <>
            <Text preset="title">Join Guild</Text>
            <Text preset="description">
                Were you invited to join a guild? Enter the invite code here.
            </Text>
            <TextField />
            <Button
                onClick={() =>
                    alert('Code not found! (Because this is not yet implemented!)')
                }
                style={{ marginBottom: 25 }}
            >
                Join Guild
            </Button>
            <Text preset="description">
                Or view a list of guilds accepting new members:
            </Text>
            <Button onClick={() => setPane('viewGuilds')}>View Guilds</Button>
            <Button secondary onClick={() => setPane('driver')}>
                Back
            </Button>
        </>
    )
}
