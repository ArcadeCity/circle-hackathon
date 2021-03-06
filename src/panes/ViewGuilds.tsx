import React from 'react'
import { Button, styles, Text } from '../components'
import { useStore } from '../store'
import { State } from 'zustand'

export const ViewGuilds = () => {
    const { setPane } = useStore((state: State) => state.actions)
    const guilds = useStore((state: State) => state.guilds)
    return (
        <>
            <Text preset="title">View Guilds</Text>
            <Text preset="description">See a list of guilds accepting new members.</Text>

            {guilds.map((guild: any) => {
                return (
                    <p key={guild.walletId} style={styles.guildList}>
                        <span style={styles.bold}>{guild.name}</span> -{' '}
                        <span
                            style={styles.link}
                            onClick={() =>
                                alert(
                                    'Thanks for your interest! For now you can make demo dues payments on the View Transfers screen.',
                                )
                            }
                        >{`Join for $${guild.dues}/mo`}</span>
                    </p>
                )
            })}
            <Button
                primary
                onClick={() => setPane('viewTransfers')}
                style={{ marginTop: 25 }}
            >
                View Transfers
            </Button>
            <Button secondary onClick={() => setPane('intro')} style={{ marginTop: 25 }}>
                Back
            </Button>
        </>
    )
}
