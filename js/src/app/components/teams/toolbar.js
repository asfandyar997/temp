import template from './../../views/teams/toolbar.html';
import Toolbar from './../../mixins/toolbar';

const FILTERS = Object.freeze({
    keyword: ''
});

export default {
    mixins: [
        Toolbar
    ],
    template: template.render()
}
