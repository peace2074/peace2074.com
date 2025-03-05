import en_raw from './langs/en.json' assert {type: 'json'}
import ar_raw from './langs/ar.json'assert {type: 'json'}

const en: typeof en_raw = en_raw
const ar: typeof ar_raw = ar_raw

export { en }
export { ar }

export default {
    ar,
    en,
}