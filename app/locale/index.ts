import en_raw from './en.json' assert {type: 'json'}
import ar_raw from './ar.json'assert {type: 'json'}

const en: typeof en_raw = en_raw
const ar: typeof ar_raw = ar_raw

export { en }
export { ar }

export default {
    ar,
    en,
}