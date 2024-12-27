import { defineStore } from "pinia"

type TDialog = {
  form?: boolean,
  icon: string,
  color?: string,
  loader?: boolean,
  title: string,
  text: string,
  btnClose?: boolean
}

type TState = {
  dialog: TDialog
}



const useDialogStore = defineStore({
  id: 'dialog',
  state: (): TState => ({
    dialog: {
      form: false,
      icon: '',
      color: '',
      loader: false,
      title: '',
      text: '',
      btnClose: false
    },
  }),
  getters: {
    getDialog: (state) => state.dialog,
  },
  actions: {
    setDialog(data:TDialog) {
      this.dialog = data
    },
    closeDialog () {
      this.dialog.form = false
    }
  }
})

export default useDialogStore