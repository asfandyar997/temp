export default {
    render() {
        return `
            <ol class="breadcrumb float-xl-right">
                <li
                    v-for="(breadcrumb, index) in routes"
                    :key="index"
                    class="breadcrumb-item"
                    :class="{active: index === routes.length - 1}">
                    <router-link :to="breadcrumb.link">{{breadcrumb.label}}</router-link>
                </li>
			</ol>
        `;
    }
}
