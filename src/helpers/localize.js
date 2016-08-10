import localization from '../localization.js'

const LANG_DEFAULT = navigator.language

/**
 * @name: localize! function to return localized strings in localization.js
 * @param: str {string} [required] str of language
 * @param: lang {string} [default navigator language]
 * @return str in language selected
 *
 */

function localize(str, lang = LANG_DEFAULT) {
  try {
    if (!localization.langs.hasOwnProperty(lang)) lang = 'en-US' // default lang
    if (localization.langs[lang][str]) {
      return localization.langs[lang][str]
    }
  } catch(e) {
    console.error('[instantgram]LOC error:', e)
    return `ops, a error ocurred in localization system. Enter in https://github.com/theus/instantgram/issues/new and open a issue with this code: 'LOC_dont_found_str_neither_default:[${lang}->${str}]'
    for more information open the console`
  }
}

console.info(localize('helpers.localize_defaultlang').replace('${LANG_DEFAULT}', LANG_DEFAULT))

export default localize