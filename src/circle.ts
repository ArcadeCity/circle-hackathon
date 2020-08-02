import cardsApi, { CreateCardPayload } from './lib/cardsApi'
import paymentsApi, { CreatePaymentPayload } from './lib/paymentsApi'
import walletsApi from './lib/walletsApi'
import openpgp from './lib/openpgp'
import { v4 as uuidv4 } from 'uuid'

// Our Circle service
export class Circle {
    apiKey: string
    sessionId: string

    constructor() {
        this.apiKey =
            'QVBJX0tFWTo2YjZmM2E5MTE2NGM3ZDgwNzgzMzA2YmUxNzJiOTlkNjozYjIzZmNjNzM4ZmQ3YzU5NDZmN2QzM2RhNGUyZmM0Zg=='
        this.sessionId = uuidv4()
        this.configureAxios()
    }

    async fetchInitialData() {
        const balance = await this.fetchBalance()
        const masterWalletId = await this.fetchMasterWalletId()
        const wallets: any = await this.fetchWallets()
        const guilds: any[] = []
        wallets.forEach((wallet: any) => {
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
            masterWalletId,
            guilds,
        }
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
        console.log('[Circle svc] Demo paying driver')

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
        console.log(
            `Payment succeeded with ID ${riderPayment.id}. Refresh the page to see updated 'unsettled' balance.`,
        )

        return riderPayment
    }

    async addDemoCard() {
        console.log('[Circle svc] Adding demo card')
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
        const walletsInstance = walletsApi.getInstance()
        cardsInstance.interceptors.request.use(circleAuthInterceptor)
        paymentsInstance.interceptors.request.use(circleAuthInterceptor)
        walletsInstance.interceptors.request.use(circleAuthInterceptor)
    }
}
