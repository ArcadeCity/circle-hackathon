import create from 'zustand'
import { Circle } from './circle'

export const [useStore] = create((set, get) => ({
    circle: new Circle(),
    class: '',
    pane: 'intro',
    card: null,
    actions: {
        async addDemoCard() {
            const card = await get().circle.addDemoCard()
            set({ card })
        },
        setRider() {
            set({ class: 'rider', pane: 'rider' })
        },
        setDriver() {
            set({ class: 'driver', pane: 'driver' })
        },
        setPane(pane: string) {
            set({ pane })
        },
    },
}))
