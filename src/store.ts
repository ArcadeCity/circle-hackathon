import create from 'zustand'
import { Circle } from './circle'

export const [useStore] = create((set, get) => ({
    circle: new Circle(),
    class: '',
    pane: 'intro',
    balance: null,
    card: null,
    guild: null,
    guilds: [],
    masterWalletId: null,
    payment: null,
    transfers: [],
    actions: {
        async fetchInitialData() {
            console.log('Fetching API data...')
            const {
                balance,
                guilds,
                masterWalletId,
                transfers,
            } = await get().circle.fetchInitialData()
            set({ balance, guilds, masterWalletId, transfers })
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
            setTimeout(() => {
                get().actions.fetchInitialData()
            }, 1000)
        },
        async demoTransferDriver() {
            console.log('demoTransferDriver')
            const driverWallet = await get().circle.createWallet()
            console.log('driverWallet:', driverWallet)
            const transfer = await get().circle.demoTransferDriver(driverWallet.walletId)
            console.log('transfer:', transfer)
            setTimeout(() => {
                get().actions.fetchInitialData()
            }, 1000)
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
        formatWalletId(walletId: string) {
            if (walletId === get().masterWalletId) {
                return 'Main Wallet'
            } else {
                console.log(get().guilds)
                const guilds = get().guilds.filter(
                    (guild: any) => guild.walletId === walletId,
                )
                if (guilds.length === 1) {
                    console.log('found guild', guilds[0])
                    return guilds[0].description
                } else if (guilds.length === 0) {
                    return 'Demo Driver Wallet'
                } else {
                    return 'Unknown wallet'
                }
            }
        },
        async submitCreateGuild(values: any) {
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
                return false
            }
            try {
                dues = parseFloat(values.dues)
            } catch (e) {
                console.log(e)
                alert(
                    'Dues error: Please enter a number. Enter 0 if you do not want to collect dues.',
                )
                return false
            }
            set({ guild: 'creating' })
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

            setTimeout(() => {
                get().actions.fetchInitialData()
            }, 1000)
            console.log(`Created guild wallet with ID ${walletId}:`, wallet)
        },
    },
}))

function isFloat(n: any) {
    return n === +n && n !== (n | 0)
}
