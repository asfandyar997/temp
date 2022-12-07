import template from './../../views/payments/toolbar.html';
import Toolbar from './../../mixins/toolbar';

const FILTERS = Object.freeze({
    keyword: '',
    user: ''
});

export default {
    mixins: [
        Toolbar
    ],
    template: template.render()
}
