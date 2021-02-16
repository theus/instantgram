import localization from '../localization'

const LANGS_NORMALIZE = {
  'de': 'de-DE',
  'pt': 'pt-BR',
  'en': 'en-US',
  'en-GB': 'en-US'
}

const LANG_DEFAULT = LANGS_NORMALIZE[navigator.language] || 'en-US'

/**
 * @name: localize! function to return localized strings in localization
 * @param: str {string} [required] str of language
 * @param: lang {string} [default navigator language]
 * @return str in language selected
 *
 */

function localize (str: string, lang: string = LANG_DEFAULT): string {
  try {
    // eslint-disable-next-line no-prototype-builtins
    if (!localization.langs.hasOwnProperty(lang)) lang = 'en-US' // default lang
    if (localization.langs[lang][str]) {
      return localization.langs[lang][str]
    }

    return ''
  } catch (e) {
    console.error('[instantgram]LOC error:', e)
    return `ops, an error ocurred in localization system. Enter in https://github.com/theus/instantgram/issues/new and open an issue with this code: 'LOC_dont_found_str_neither_default:[${lang}->${str}]'
    for more information open the console`
  }
}

console.info(localize('helpers.localize_defaultlang').replace('${LANG_DEFAULT}', LANG_DEFAULT))

export default localize
