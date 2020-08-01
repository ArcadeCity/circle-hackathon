import create from 'zustand'

export const [useStore] = create((set) => ({
    class: '',
    actions: {
        setRider() {
            set({ class: 'rider' })
        },
        setDriver() {
            set({ class: 'driver' })
        },
    },
}))
