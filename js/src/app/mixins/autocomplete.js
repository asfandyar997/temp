/**
 * Autocomplete mixin - common part of every suggest component
 */
export default {
    data() {
        return {
            autoCompleteCls: {
                vueSimpleSuggest: 'position-relative d-inline-block',
                inputWrapper: '',
                defaultInput: 'form-control',
                suggestions: 'position-absolute list-group z-1000',
                suggestItem: 'list-group-item'
            }
        }
    }
}
