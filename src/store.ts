import create from 'zustand'
import { Circle } from './circle'

export const [useStore] = create((set, get) => ({
    circle: new Circle(),
    class: '',
    pane: 'intro',
    card: null,
    payment: null,
    actions: {
        async addDemoCard() {
            set({ card: 'connecting' })
            const card = await get().circle.addDemoCard()
            set({ card })
        },
        async demoPayDriver() {
            set({ payment: 'paying' })
            const cardSourceId = get().card.id
            const payment = await get().circle.demoPayDriver(cardSourceId)
            set({ payment })
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
