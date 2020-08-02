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
            >
                Join Guild
            </Button>
            <Button secondary onClick={() => setPane('driver')}>
                Back
            </Button>
        </>
    )
}
