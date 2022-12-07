import template from './../../views/dashboard/dashboard-content.html';
import ContentBreadcrumb from './../content/content-breadcrumb';
import ContentHeader from './../content/content-header';

export default {
    components: {
        ContentHeader,
        ContentBreadcrumb
    },
    props: {
        user: Object,
        settings: Object
    },
    template: template.render()
}
