import _ from '../utils/utilities';

export default {
    methods: {
        onViewportResize() {
            console.log('Mixin %cviewport-resize %cEvent onViewportResize not implemented', 'font-weight:bold', 'color:orange');
        }
    },
    activated: function(){
        this._resize$ = _.debounce(this.onViewportResize, 100);
        window.addEventListener('resize', this._resize$);
    },
    deactivated: function(){
        window.removeEventListener('resize', this._resize$);
    }
}
