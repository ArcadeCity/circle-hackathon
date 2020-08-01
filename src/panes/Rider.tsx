import React from 'react'
import { Button } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const Rider = () => {
    const { setPane } = useStore((state: State) => state.actions)
    return (
        <>
            <p>Rider</p>
            <Button secondary onClick={() => setPane('intro')}>
                Back
            </Button>
        </>
    )
}
