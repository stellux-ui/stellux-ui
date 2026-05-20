import { withInstall } from '@stellux/utils'
import Autocomplete from './autocomplete.vue'

export const StxAutocomplete = withInstall(Autocomplete)
export default StxAutocomplete

export { autocompleteProps, autocompleteEmits } from './autocomplete'
export type { AutocompleteProps, AutocompleteEmits } from './autocomplete'
