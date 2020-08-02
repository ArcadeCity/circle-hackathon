import React from 'react'
import { Button, Text, TextField } from '../components'
import { useForm } from 'react-hook-form'
import { useStore } from '../store'
import { State } from 'zustand'

export const CreateGuild = () => {
    const { register, handleSubmit } = useForm()
    const { setPane } = useStore((state: State) => state.actions)
    const onSubmit = (wat: any) => console.log(wat)
    return (
        <>
            <Text preset="title">Create Guild</Text>
            <Text preset="description">Name your guild. Charge monthly dues?</Text>
            <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>
                <TextField name="name" ref={register} placeholder="Guild name" />
                <br />
                <TextField name="dues" ref={register} placeholder="Monthly dues (USD)" />
                <br />
                <Button type="submit">Create Guild</Button>
            </form>
            <Button secondary onClick={() => setPane('driver')}>
                Back
            </Button>
        </>
    )
}
