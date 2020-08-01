import React from 'react'
import { Box } from 'grommet'
import { Button, Infobox, Screen, styles, Text } from './components'

function App() {
    return (
        <Screen>
            <Box fill pad="medium" justify="center" align="center">
                <img src="/logo.png" style={styles.logo} alt="Arcade City logo" />

                <Text preset="title">Join Arcade City</Text>
                <Text preset="description">Are you a rider or driver?</Text>

                <Button>Rider</Button>
                <Button>Driver</Button>

                <Infobox />
            </Box>
        </Screen>
    )
}

export default App
