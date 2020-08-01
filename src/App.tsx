import React from 'react'
import { Box } from 'grommet'
import { Infobox, Screen, styles } from './components'
import { CreateGuild, Driver, Intro, JoinGuild, Rider } from './panes'
import { useStore } from './store'
import { State } from 'zustand'

function App() {
    const pane = useStore((state: State) => state.pane)
    return (
        <Screen>
            <Box
                fill
                pad="medium"
                justify="center"
                align="center"
                style={styles.container}
            >
                <Infobox />
                {pane === 'intro' && <Intro />}
                {pane === 'rider' && <Rider />}
                {pane === 'driver' && <Driver />}
                {pane === 'joinGuild' && <JoinGuild />}
                {pane === 'createGuild' && <CreateGuild />}
            </Box>
        </Screen>
    )
}

export default App
