import cardsApi, { CreateCardPayload } from './lib/cardsApi'
import paymentsApi, { CreatePaymentPayload } from './lib/paymentsApi'
import transfersApi, { CreateTransferPayload } from './lib/transfersApi'
import walletsApi from './lib/walletsApi'
import openpgp from './lib/openpgp'
import { v4 as uuidv4 } from 'uuid'

// Our Circle service
export class Circle {
    apiKey: string
    sessionId: string
    masterWalletId: string

    constructor() {
        this.apiKey =
            'QVBJX0tFWTo2YjZmM2E5MTE2NGM3ZDgwNzgzMzA2YmUxNzJiOTlkNjozYjIzZmNjNzM4ZmQ3YzU5NDZmN2QzM2RhNGUyZmM0Zg=='
        this.masterWalletId = ''
        this.sessionId = uuidv4()
        this.configureAxios()
    }

    async demoTransferDues(guildWallet: any) {
        const { description, dues, walletId }: any = guildWallet
        console.log('Dues payment of ' + dues + ' to ' + description)

        // Send 90% to the guild. [Note we are ignoring Circle's fee for now]
        const sendToGuild = Math.floor(dues * 0.9 * 100) / 100
        console.log('sendToGuild: $', sendToGuild)

        // Transfer to guild
        const guildTransferPayload: CreateTransferPayload = {
            idempotencyKey: uuidv4(),
            source: {
                type: 'wallet',
                id: this.masterWalletId,
            },
            destination: {
                type: 'wallet',
                id: walletId,
            },
            amount: {
                amount: sendToGuild.toString(),
                currency: 'USD',
            },
        }
        const guildTransfer = await transfersApi.createTransfer(guildTransferPayload)
        console.log('guildTransfer:', guildTransfer)
        return guildTransfer
    }

    async demoTransferDriver(driverWalletId: string, guildWalletId: string) {
        // Usually we'd get these from the payment; for now can hardcode
        const paymentAmount = '20.00'
        const feeAmount = '1.15'

        const amt = parseFloat(paymentAmount)
        const fee = parseFloat(feeAmount)
        console.log('amt:', amt)

        // Subtract fee
        const amtMinusFee = amt - fee
        console.log('Amount minus fee:', amtMinusFee)

        // Send 10% to the guild.
        const sendToGuild = Math.floor(amtMinusFee * 0.1 * 100) / 100

        // Send 80% to the driver.
        const sendToDriver = Math.floor(amtMinusFee * 0.8 * 100) / 100

        console.log('sendToGuild: $', sendToGuild)
        console.log('sendToDriver: $', sendToDriver)

        // Transfer to guild
        const guildTransferPayload: CreateTransferPayload = {
            idempotencyKey: uuidv4(),
            source: {
                type: 'wallet',
                id: this.masterWalletId,
            },
            destination: {
                type: 'wallet',
                id: guildWalletId,
            },
            amount: {
                amount: sendToGuild.toString(),
                currency: 'USD',
            },
        }
        const guildTransfer = await transfersApi.createTransfer(guildTransferPayload)
        console.log('guildTransfer:', guildTransfer)

        // Transfer to driver
        const driverTransferPayload: CreateTransferPayload = {
            idempotencyKey: uuidv4(),
            source: {
                type: 'wallet',
                id: this.masterWalletId,
            },
            destination: {
                type: 'wallet',
                id: driverWalletId,
            },
            amount: {
                amount: sendToDriver.toString(),
                currency: 'USD',
            },
        }

        const driverTransfer = await transfersApi.createTransfer(driverTransferPayload)
        console.log('driverTransfer:', driverTransfer)
        return {
            driverTransfer,
            guildTransfer,
        }
    }

    async fetchMasterWallet() {
        const wallet = walletsApi.getWalletById(this.masterWalletId)
        return wallet
    }

    async fetchInitialData() {
        const balance = await this.fetchBalance()
        const guilds: any[] = []
        const masterWalletId = await this.fetchMasterWalletId()
        this.masterWalletId = masterWalletId
        const transfers = await this.fetchTransfers()
        const wallets: any = await this.fetchWallets()
        const masterWallet: any = await this.fetchMasterWallet()

        console.log('Main wallet:', masterWallet)

        // Filter out my earliest test wallets
        const filteredWallets = wallets.filter(
            (wallet: any) => parseFloat(wallet.walletId) > 1000026388,
        )

        // Build guild objects from wallet info via ugly hack
        filteredWallets.forEach((wallet: any) => {
            try {
                wallet.name = wallet.description.split(' Guild Wallet')[0]
                if (wallet.description.indexOf('[[') !== -1) {
                    // Ugly hack; storing dues in Circle wallet desc, should use
                    // regex but more importantly should set this idea entirely
                    // on fire by persisting this info to a database. Got to put
                    // the 'hack' in hackathon eh?
                    const duesNext = wallet.description.split('[[')[1]
                    const duesNow = duesNext.split(']]')[0]
                    wallet.dues = duesNow
                    guilds.push(wallet)
                }
            } catch (e) {
                // console.log('skipping ', wallet)
            }
        })
        return {
            balance,
            masterWallet,
            masterWalletId,
            guilds,
            transfers,
        }
    }

    async fetchTransfers() {
        const transfers: any = await transfersApi.getTransfers()
        // Filter out my earliest test transfers
        const filteredTransfers = transfers.filter(
            (transfer: any) =>
                Date.parse(transfer.createDate) > Date.parse('2020-08-02T17:39:22.398Z'),
        )

        return filteredTransfers
    }

    async fetchWallets() {
        const wallets = await walletsApi.getWallets()
        return wallets
    }

    async createWallet(name: string) {
        const wallet = await walletsApi.createWallet(uuidv4(), name)
        return wallet
    }

    async demoPayDriver(cardSourceId: string) {
        console.log('Demo paying driver')

        const cardNumber: string = '4007400000000007'
        const cvv: string = '123'

        const cardDetails: {
            number: string
            cvv?: string
        } = {
            number: cardNumber.trim().replace(/\D/g, ''),
            cvv,
        }

        const publicKey: any = await cardsApi.getPCIPublicKey()
        const encryptedData = await openpgp.encrypt(cardDetails, publicKey)
        const { encryptedMessage, keyId } = encryptedData

        // Create payment from rider - success
        const createPaymentPayload: CreatePaymentPayload = {
            idempotencyKey: uuidv4(),
            amount: {
                amount: '20.00',
                currency: 'USD',
            },
            source: { id: cardSourceId, type: 'card' },
            verification: 'cvv',
            metadata: {
                email: 'fake+email@arcade.city',
                sessionId: this.sessionId,
                ipAddress: '1.2.3.4',
                phoneNumber: '+15125551235',
            },
            encryptedData: encryptedMessage,
            keyId,
        }

        const riderPayment: any = await paymentsApi.createPayment(createPaymentPayload)
        console.log('riderPayment', riderPayment)
        console.log(`Payment succeeded with ID ${riderPayment.id}`)

        return riderPayment
    }

    async addDemoCard() {
        console.log('Adding demo card')
        // Set up the card
        const cardNumber: string = '4007400000000007'
        const cvv: string = '123'

        const cardDetails: {
            number: string
            cvv?: string
        } = {
            number: cardNumber.trim().replace(/\D/g, ''),
            cvv,
        }

        const publicKey: any = await cardsApi.getPCIPublicKey()
        const encryptedData = await openpgp.encrypt(cardDetails, publicKey)
        const { encryptedMessage, keyId } = encryptedData

        const cardPayload: CreateCardPayload = {
            idempotencyKey: uuidv4(),
            keyId,
            encryptedData: encryptedMessage,
            expMonth: 12,
            expYear: 2024,
            billingDetails: {
                name: 'Jimso Bimso',
                city: 'Austin',
                district: 'TX',
                country: 'US',
                line1: '123 Hello St',
                line2: 'Apt 1',
                postalCode: '71234',
            },
            metadata: {
                sessionId: this.sessionId,
                ipAddress: '1.2.3.4',
                email: 'fake+email@testo.com',
                phoneNumber: '+15125551235',
            },
        }

        const card = await cardsApi.createCard(cardPayload)
        console.log('Demo card added')
        return card
    }

    async fetchMasterWalletId() {
        // Grab the master wallet ID
        const {
            payments: { masterWalletId },
        }: any = await walletsApi.getMasterWallet()
        return masterWalletId
    }

    async fetchBalance() {
        const balance: any = await paymentsApi.getBalance()
        // console.log(balance)
        return balance
    }

    formatBalance(balance: any, type: string) {
        if (!balance) {
            return '---'
        } else if (
            type === 'main' &&
            balance &&
            balance.balances &&
            balance.balances[0]
            // lol
        ) {
            return `${balance.balances[0].amount} ${balance.balances[0].currency}`
        } else if (type === 'available' && balance.available && balance.available[0]) {
            return `${balance.available[0].amount} ${balance.available[0].currency}`
        } else if (type === 'unsettled' && balance.unsettled && balance.unsettled[0]) {
            return `${balance.unsettled[0].amount} ${balance.unsettled[0].currency}`
        } else {
            return '0 USD'
        }
    }

    async configureAxios() {
        const circleAuthInterceptor = (config: any) => {
            config.headers = {
                Authorization: `Bearer ${this.apiKey}`,
            }
            return config
        }
        const cardsInstance = cardsApi.getInstance()
        const paymentsInstance = paymentsApi.getInstance()
        const transfersInstance = transfersApi.getInstance()
        const walletsInstance = walletsApi.getInstance()
        cardsInstance.interceptors.request.use(circleAuthInterceptor)
        paymentsInstance.interceptors.request.use(circleAuthInterceptor)
        transfersInstance.interceptors.request.use(circleAuthInterceptor)
        walletsInstance.interceptors.request.use(circleAuthInterceptor)
    }
}
