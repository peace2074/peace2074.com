import { en, ar} from "./app/locale";
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ar',
    locales: [
        {
            code: 'en',
            name: 'English',
            messages:en
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