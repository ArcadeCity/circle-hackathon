import create from 'zustand'
import { Circle } from './circle'

export const [useStore] = create((set, get) => ({
    circle: new Circle(),
    class: '',
    pane: 'intro',
    balance: null,
    masterWalletId: null,
    card: null,
    payment: null,
    actions: {
        async fetchInitialData() {
            const { balance, masterWalletId } = await get().circle.fetchInitialData()
            set({ balance, masterWalletId })
        },
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
        formatBalance(balance: any, type: string) {
            // TODO: Move this to a util file that can be exported/imported w/o
            // pulling in Circle service or going through store
            return get().circle.formatBalance(balance, type)
        },
    },
}))
