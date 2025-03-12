export type LocaleT = { code: string; name?: string; messages?: string[] };
export type LocalesT = Locale[]
import { en, ar } from "./app/locale";
    
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    locales: [
        {
            code: 'en',
            name: 'English',
            messages: en
        },
        {
            code: 'ar',
            name: 'Arabic',
            messages: ar
        }
    ],
    messages: {
        en,
        ar,
    }
}))
 