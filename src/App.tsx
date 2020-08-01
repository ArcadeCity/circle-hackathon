import React from 'react'
import { Box } from 'grommet'
import { Button, Infobox, Screen, styles, Text } from './components'
import { useStore } from './store'
import { State } from 'zustand'

function App() {
    const { setDriver, setRider } = useStore((state: State) => state.actions)
    const chosenClass = useStore((state: State) => state.class)
    return (
        <Screen>
            <Box
                fill
                pad="medium"
                justify="center"
                align="center"
                style={styles.container}
            >
                <img src="/logo.png" style={styles.logo} alt="Arcade City logo" />

                <Text preset="title">Join Arcade City</Text>
                <Text preset="description">Are you a rider or driver?</Text>

                <Button onClick={setRider}>Rider</Button>
                <Button onClick={setDriver}>Driver</Button>

                <Text preset="description">{`Selected class: ${chosenClass}`}</Text>

                <Infobox />
            </Box>
        </Screen>
    )
}

export default App
