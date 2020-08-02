import React from 'react'
import { Button, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const GuildCreated = () => {
    const { setPane } = useStore((state: State) => state.actions)
    return (
        <>
            <Text preset="title">Guild created!</Text>
            <Text preset="description">Congrats - you can start recruiting!</Text>
            <Text preset="description">Invite code: NOTAREALCODE</Text>

            <Button secondary onClick={() => setPane('intro')}>
                Done!
            </Button>
        </>
    )
}
