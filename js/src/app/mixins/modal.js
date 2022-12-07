import _ from '../utils/utilities';

/**
 * Modal dialog mixin.
 */
export default {
    data() {
        return {
            componentMeta: Object.freeze({
                name: 'modal'
            }),
            prefix: _.guid()
        }
    },
    methods: {
        show() {
            $(`#${this.prefix}-modal`).modal('show');
            this.$emit('show');
            /*
             * Make sure the scroll is behind the modal
             */
            (() => document.body.classList.add('modal-open')).delay(500);
            return this;
        },
        hide() {
            $(`#${this.prefix}-modal`).modal('hide');
            this.$emit('hide');
            return this;
        },
        close() {
            this.$router.back();
            return this;
        },
        onClose() {
            this.close();
        },
        onBack() {
            this.$router.back();
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if ((Array.isArray(vm.componentMeta.name) && vm.componentMeta.name.indexOf(to.name) !== -1) ||
                vm.componentMeta.name === to.name) {
                /*
                 * Pass params to props
                 */
                try {
                    vm.params$ = Object.assign({}, {...to.params});
                    (() => vm.show()).delay(100);
                } catch (e) {
                    console.log(`[Modal] beforeRouteEnter error`);
                }
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        if ((Array.isArray(this.componentMeta.name) && this.componentMeta.name.indexOf(from.name) !== -1) ||
            this.componentMeta.name === from.name) {
            this.hide();
        }
        next();
    }
}
