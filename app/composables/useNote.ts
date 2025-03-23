import { Dialog, Notify } from 'quasar'

import { NoteAcionsE } from '../../shared/types'
import {
  defaultStyles,
} from '../constants'
import { notifyDefaults } from '../constants/'

export default function useNote() {
  Notify.setDefaults({
    position: notifyDefaults.position,
    timeout: notifyDefaults.timeout,
    textColor: 'white',
  })
  const note = (message: string, config = notifyDefaults) => Notify.create(
    { message, type: defaultStyles.success.type, config },
  )

  note.dialog = (message?: string) => Dialog.create({ message })

  note.success = (message: string, config?: notifyDefaults) => note(message, NoteAcionsE.success, config)
  note.info = (message: string, config?: typeof notifyDefaults) => note.show(message, NoteAcionsE.Info, config)
  note.warning = (message: string, config?: typeof notifyDefaults) => note.show(message, NoteAcionsE.warning, config)
  note.error = (error: any, config?: typeof notifyDefaults) => {
    const { status, statusCode, errorMessage, message, statusMessage } = error
    // const errorMsg = message || errorMessage || statusMessage || 'Undandled Error!'
    if (statusCode || errorMessage || message || statusMessage) {
      note.show(statusCode || errorMessage || message || statusMessage, 'error', { caption: status || statusCode, type: 'error', ...config })
    }
  }

  note.log = (message: string, ...args: any) => window.console.log(message, ...args)
  note.debug = (title: string, err: { message: string }) => {
    if (err && err.message)
      // eslint-disable-next-line no-console
      console.log(title, JSON.stringify(err.message || {}, null, 2))
    else if (err)
      // eslint-disable-next-line no-console
      console.log(title, JSON.stringify(err || {}, null, 2))
    else
      // eslint-disable-next-line no-console
      console.log(title)
  }

  return {
    note,
  }
}
