import type { Locale } from "next-intl"




export const locales:Locale[]=["en","ru","tj"]


export function isValidLocale(value:string){
return  locales.includes(value)
}