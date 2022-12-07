import C from '../config/constants';

/**
 * Avatar error method/event mixin.
 */
export default {
    methods: {
        onAvatarError(e) {
            e.target.src = C.DEFAULTS.PROFILE.AVATAR_PLACEHOLDER;
        },
    }
}
