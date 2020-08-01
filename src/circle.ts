import paymentsApi from './lib/paymentsApi'
import walletsApi from './lib/walletsApi'

// Our Circle service
export class Circle {
    apiKey: string

    constructor() {
        this.apiKey =
            'QVBJX0tFWTo2YjZmM2E5MTE2NGM3ZDgwNzgzMzA2YmUxNzJiOTlkNjozYjIzZmNjNzM4ZmQ3YzU5NDZmN2QzM2RhNGUyZmM0Zg=='
        this.configureAxios()
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
        console.log(balance)
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
        const paymentsInstance = paymentsApi.getInstance()
        const walletsInstance = walletsApi.getInstance()
        paymentsInstance.interceptors.request.use(circleAuthInterceptor)
        walletsInstance.interceptors.request.use(circleAuthInterceptor)
    }
}
