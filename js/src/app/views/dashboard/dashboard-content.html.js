export default {
    render() {
        return `
            <div id="content" class="content">
                <content-breadcrumb></content-breadcrumb>
                <content-header :auto=true></content-header>
                <router-view v-slot="{ Component }" :user="user" :settings="settings">
                    <transition name="fade-fast" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        `;
    }
}
