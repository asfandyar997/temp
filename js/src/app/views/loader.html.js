export default {
    render() {
        return `
            <transition name="fade">
                <div class="v-loader" :class="{'global': global}" v-if="isActive" :aria-busy="isActive" aria-label="Loading">
                    <svg class="circular">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                </div>
            </transition>
        `;
    }
}
