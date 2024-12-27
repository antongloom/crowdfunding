import { defineStore } from "pinia"
import {
  apiAddCompany,
  apiGetCompany,
  apiGetOneCompany,
  apiUpdateCompany
} from '@/services/company.ts'
import { client, getWalletClient } from '@/services/api.ts'
import config from '@/config/index.ts'
import useDialogStore from "@/store/dialog"
const { contract } = config


const timeChange = (time: any) => {
  const date = new Date(Number(time) * 1000)
  return date.toLocaleString()
}


const contractAbi = [{"inputs":[{"internalType":"string","name":"dedline","type":"string"}],"name":"DeadlineExpired","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"donator","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountDonat","type":"uint256"}],"name":"CampaignAmountDonations","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"currentId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"title","type":"string"},{"indexed":false,"internalType":"string","name":"description","type":"string"},{"indexed":false,"internalType":"uint256","name":"target","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"deadline","type":"uint256"},{"indexed":false,"internalType":"string","name":"image","type":"string"}],"name":"CampaignDetails","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"campaigns","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountCollected","type":"uint256"},{"internalType":"string","name":"image","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"uint256","name":"_target","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"},{"internalType":"string","name":"_image","type":"string"}],"name":"createCampaign","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"donateToCampaign","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"numberOfCampaigns","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

type TCompanyUpdate = {
  currentid: number,
  amount: any,
  amountDonat: any, 
  donator: string, 
  owner: string
}

type TCompanyList = {
  amount_collected: string,
  currentid: number,
  deadline: number,
  description: string,
  donations: any,
  donators: any
  id:number,
  image: string,
  owner: string,
  target: string,
  title: string
}

type TState = {
  companyList: TCompanyList[],
  company: TCompanyList | {}
}

type TCompany = {
  title: string,
  description: string,
  target: string,
  deadline: string,
  image: string
}

const sepoliaChainId = '0xaa36a7'
const errorAlert = {
  form: true,
  icon: 'mdi-alert',
  color: 'red',
  loader: false,
  title: 'Ошибка',
  text: 'Нейзвестная ошибка',
  btnClose: true
}

const successfulAlert = {
  form: true,
  icon: 'mdi-check-circle',
  color: 'green',
  loader: true,
  title: 'Заголовок',
  text: 'Текст',
  btnClose: false
}

const getEthereumProvider = () => {
  const dialogStore = useDialogStore()
  if (!window.ethereum) {
    dialogStore.setDialog(
      {
        ...errorAlert,
        text: 'Ethereum провайдер не найден. Пожалуйста установите MetaMask!'
      }
    )
    throw new Error('Ethereum провайдер не найден. Пожалуйста установите MetaMask!')
  }
  return window.ethereum
};

const validateAccount = async () => {
  const dialogStore = useDialogStore()
  const ethereum = getEthereumProvider()
  const [account] = await ethereum.request({ method: 'eth_requestAccounts' })
  if (!account) {
    dialogStore.setDialog(
      {
        ...errorAlert,
        text: 'Отсутствует аккаунт!'
      }
    )
    return
  }
  return account
}

const validChainId = async () => {
  const dialogStore = useDialogStore()
  const ethereum = getEthereumProvider()
  const chainId = await ethereum.request({ method: 'eth_chainId' })
      
  if (chainId !== sepoliaChainId) {
    dialogStore.setDialog(
      {
        ...errorAlert,
        text: 'Должна быть тестовая сеть Sepolia!'
      }
    )
    return
  }
}

const useCrowfunding = defineStore({
  id: 'crowfunding',
  state: (): TState => ({
    companyList: [],
    company: {}
  }),
  getters: {
    getCompany: (state) => state.companyList,
    getOneCompany: (state) => state.company
  },
  actions: {

    watchEvent (address: any, abi: any, eventName: string) {
      const dialogStore = useDialogStore()
      return new Promise((resolve, reject) => {
        client.watchContractEvent({
          address,
          abi,
          eventName,
          onLogs: (logs: any) => {
            const logData = logs.map((log: any) => log.args)
            resolve(logData)
          },
          onError: (error) => {
            dialogStore.setDialog({
              ...errorAlert,
              text: `Ошибка отслеживания данных (${error})`,
            });
            reject(error)
          }
        })
      })
    },

    async conectWallet(data: TCompany) {
      const dialogStore = useDialogStore()
      try {
        
        const account = await validateAccount()
        await validChainId()

        const wallet = await getWalletClient()
        
        // @ts-ignore
        await wallet.writeContract({
          address: contract,
          abi: contractAbi,
          functionName: 'createCampaign',
          args: [
            account,
            data.title,
            data.description,
            data.target,
            data.deadline,
            data.image
          ],
          // @ts-ignore
          gasLimit: 300000 
        })
        


        dialogStore.setDialog(
          {
            ...successfulAlert,
            title: 'Создание компании',
            text: 'Пожалуйста ожидайте!'
          }
        )

        this.watchEvent(contract, contractAbi, 'CampaignDetails').then(([log]: any) => {
          const eventData: any = {
            ...log,
            currentId: Number(log?.currentId),
            target: Number(log?.target),
            deadline: Number(log?.deadline)
          }
  
          apiAddCompany(eventData).then((res) => {
            if (res.statusText === 'OK') {
              this.companyList.push(res?.data?.data)
  
              dialogStore.setDialog(
                {
                  ...successfulAlert,
                  loader: false,
                  title: 'Создание компании',
                  text: 'Компания успешно создана',
                  btnClose: true
                }
              )
  
            }
          })

        })

      } catch (error) {
        dialogStore.setDialog(
          {
            ...errorAlert,
            text: `Ошибка (${error})`
          }
        )
      }
    },


    async sendMoney (currentId: number, count: string) {
      const dialogStore = useDialogStore()
      try { 

        const account = await validateAccount()
        await validChainId()

        const valueInWei = BigInt(Math.round(parseFloat(count) * 10 ** 18))



        const wallet = await getWalletClient()

        // @ts-ignore
        await wallet.writeContract({
          address: contract,
          abi: contractAbi,
          functionName: 'donateToCampaign',
          args: [currentId],
          value: valueInWei
        })

        dialogStore.setDialog(
          {
            ...successfulAlert,
            title: 'Пополнение',
            text: 'Пожалуйста ожидайте!'
          }
        )

        this.watchEvent(contract, contractAbi, 'CampaignAmountDonations').then(([log]: any) => {

          const eventSend: any = {
            currentId,
            amount_collected: `${log?.amountDonat}`,
            amount: `${log?.amount}`,
            donators: `${log?.donator}`,
            owner: `${log?.owner}`
          }

          apiUpdateCompany(eventSend).then((res: any) => {
            if (res.statusText === 'OK') {
              this.company = res?.data?.data
            }

            dialogStore.setDialog(
              {
                ...successfulAlert,
                loader: false,
                title: 'Пополнение',
                text: 'Средства успешно зачислины!',
                btnClose: true
              }
            )
            
          })
        })

      } catch (error) {
        dialogStore.setDialog(
          {
            ...errorAlert,
            text: `Ошибка (${error})`
          }
        )
      }
    },

    async getCompanyData() {
      try {
        const res = await apiGetCompany()
        if (res?.statusText === 'OK') {
          this.companyList = res?.data?.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getOneCompanyData(id: number) {
      try {
        const res = await apiGetOneCompany(id)
        if (res?.statusText === 'OK') {
          this.company = res?.data?.data
        }
      } catch (error) {
        console.log(error)
      }
    }

  }
})

export default useCrowfunding