import Tenants from './../tenants.js';
import template from './../../views/home/recent-tenants.html';

export default {
    mixins: [
        Tenants
    ],
    template: template.render()
}
