/* src/i18n.ts
	Internationalization support for COT, even though we don't need it (future-proof thinking!) */

import Vue from "vue";
import Vuex from "vuex";
import VuexI18n, { Translations } from "vuex-i18n";

/** Language (locale) enumeration */
export enum Language {
	/** English (Canada) language */
	English = "en"
}
/** All languages and their properties */
export const languages: { locale: Language; name: string; emoji: string; translations: Translations }[] = [
	{ locale: Language.English, name: "English", emoji: "\uD83C\uDDEC\uD83C\uDDE7", translations: require("@/lang/en").default }
];

/** Separate Vuex store for i18n nonsense */
export const i18nStore = new Vuex.Store({});

/* Enable the i18n plugin */
Vue.use(VuexI18n.plugin, i18nStore, {
	moduleName: "i18n",
	onTranslationNotFound: (locale: string, key: string): string => {
		console.warn(`Internationalization lookup failed for "${key}", not found for locale "${locale}"`);
		return key;
	}
});

/* Load all languages */
for (const language of languages)
	Vue.i18n.add(language.locale, language.translations);

/* Set current language
	Currently, English is the only language.
	In the future, this could be replaced with a lookup in LocalStorage or something similar. */
Vue.i18n.set(Language.English);
