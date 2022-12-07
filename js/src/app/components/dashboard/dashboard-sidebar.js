import C from './../../config/constants';
import _ from './../../utils/utilities';
import template from './../../views/dashboard/dashboard-sidebar.html';

const PROFILE_IMAGE_DEFAULT = C.DEFAULTS.PROFILE.AVATAR_PLACEHOLDER;

export default {
    props: {
        user: Object
    },
    computed: {
        profileAvatar() {
            if (_.empty(this.user.avatar)) {
                return `background-image: url(${C.DEFAULTS.PROFILE.AVATAR_PLACEHOLDER})`;
            }
            return `background-image: url(${C.PATH.FILES}${this.user.avatar})`;
        }
    },
    methods: {
        onLinkClick() {
            this.$root.loading = true;
        },
        onToggleMenu(e) {
            const target = e.target.tagName !== 'LI' ? e.target.closest('li') : e.target;
            target.classList.toggle('active')
        }
    },
    template: template.render(PROFILE_IMAGE_DEFAULT)
}
