import type {
  notifyDefaults,
} from '../constants/global'
import { Dialog, Notify } from 'quasar'
import { NoteAcionsE } from '../../shared/types'
import {
  defaultStyles,
} from '../constants'

export default function useNote(type: NoteAcionsE, payload: string, defaults: notifyDefaults) {
  const note = (type: NoteAcionsE, payload: string, defaults: notifyDefaults) => Notify.create({
    type: action as string,
    message: payload as string,
    ...defaults,
  })

  // eslint-disable-next-line no-empty-pattern
  note.dialog = (...{ }) => Dialog
  note.show = function (message: string, style: string, config?: typeof notifyDefaults) {
    // @ts-expect-error ign
    const newStyle = style in defaultStyles ? defaultStyles[style] : defaultStyles.success
    Object.assign(newStyle, config)
    const payload = { message, ...newStyle }
    return Notify.create(payload)
  }

  note.success = (message: string, config?: typeof notifyDefaults) => note.show(message, NoteAcionsE.success, config)

  note.info = (message: string, config?: typeof notifyDefaults) => note.show(message, NoteAcionsE.Info, config)

  note.warning = (message: string, config?: typeof notifyDefaults) => note.show(message, NoteAcionsE.warning, config)

  note.error = (error: any, config = {}) => {
    const { status, statusCode, errorMessage, message, statusMessage } = error
    // const errorMsg = message || errorMessage || statusMessage || 'Undandled Error!'
    if (statusCode || errorMessage || message || statusMessage) {
      note.show(statusCode || errorMessage || message || statusMessage, 'error', {
        // @ts-expect-error both
        caption: status || statusCode,
        type: 'error',
        ...config,
      })
    }
  }
  /* eslint no-console: "error" */

  // custom console
  note.log = (...args: any) => console.log(...args)
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
