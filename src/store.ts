import create from 'zustand'
import { Circle } from './circle'

export const [useStore] = create((set, get) => ({
    circle: new Circle(),
    class: '',
    pane: 'intro',
    balance: null,
    card: null,
    guild: null,
    masterWalletId: null,
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
        async submitCreateGuild(values: any) {
            set({ guild: 'creating' })
            console.log('submitCreateGuild with:', values)
            let dues, guildname
            try {
                guildname = values.guildname
            } catch (e) {
                console.log(e)
                alert('Guild name error: Please name your guild!')
                return false
            }
            if (!guildname) {
                alert('Guild name error: Please name your guild!')
                return false
            }
            dues = Number(values.dues)
            if ((dues !== 0 && !dues) || (!Number.isInteger(dues) && !isFloat(dues))) {
                alert(
                    'Dues error: Please enter a number. Enter 0 if you do not want to collect dues.',
                )
            }
            try {
                dues = parseFloat(values.dues)
                console.log(dues)
            } catch (e) {
                console.log(e)
                alert(
                    'Dues error: Please enter a number. Enter 0 if you do not want to collect dues.',
                )
                return false
            }

            // Create guild wallet
            const wallet = await get().circle.createWallet(
                `${guildname} Guild Wallet [[${dues}]]`,
            )
            const { walletId }: any = wallet
            set({
                guild: {
                    wallet,
                    name: guildname,
                    dues,
                },
                pane: 'guildCreated',
            })

            console.log(`Created guild wallet with ID ${walletId}:`, wallet)
        },
    },
}))

function isFloat(n: any) {
    return n === +n && n !== (n | 0)
}
