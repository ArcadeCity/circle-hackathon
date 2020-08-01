import walletsApi from './lib/walletsApi'

// Our Circle service
export class Circle {
    apiKey: string

    constructor() {
        this.apiKey =
            'QVBJX0tFWTo2YjZmM2E5MTE2NGM3ZDgwNzgzMzA2YmUxNzJiOTlkNjozYjIzZmNjNzM4ZmQ3YzU5NDZmN2QzM2RhNGUyZmM0Zg=='
        this.configureAxios()
    }

    async configureAxios() {
        const walletsInstance = walletsApi.getInstance()
        walletsInstance.interceptors.request.use((config) => {
            config.headers = {
                Authorization: `Bearer ${this.apiKey}`,
            }
            return config
        })
    }

    async fetchMasterWalletId() {
        // Grab the master wallet ID
        const {
            payments: { masterWalletId },
        }: any = await walletsApi.getMasterWallet()
        return masterWalletId
    }
}
