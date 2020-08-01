import React, { useEffect } from 'react'
import { Circle } from './circle'

const circle = new Circle()

function App() {
    useEffect(() => {
        circle.fetchMasterWallet()
    }, [])
    return <div className="App">Yo</div>
}

export default App
