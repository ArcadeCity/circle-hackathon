import create from 'zustand'

export const [useStore] = create((set) => ({
    class: '',
    pane: 'intro',
    actions: {
        setRider() {
            set({ class: 'rider' })
        },
        setDriver() {
            set({ class: 'driver' })
        },
    },
}))
