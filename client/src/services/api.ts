import { createPublicClient, http, createWalletClient, parseEther, custom, parseUnits } from 'viem'
import config from '@/config/index.ts'
import { sepolia } from 'viem/chains'

const { urlPrc } = config
const providerUrl = `https://sepolia.infura.io/v3/${urlPrc}`

const client = createPublicClient({
  chain: sepolia,
  transport: http(providerUrl)
})


async function getWalletClient () {
  try {

    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      })
  
      const connectedAccounts = await window.ethereum.request({ method: 'eth_accounts' })
      
      return createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
        account: connectedAccounts[0],
      })
    }

  } catch (error) {
    console.error('Ошибка переподключения:', error);
    throw error;
  }
}

export {
  client,
  getWalletClient,
  parseEther,
  parseUnits
}
