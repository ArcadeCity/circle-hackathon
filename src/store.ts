import create from 'zustand'

export const [useStore] = create((set) => ({
    class: '',
    pane: 'intro',
    actions: {
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
