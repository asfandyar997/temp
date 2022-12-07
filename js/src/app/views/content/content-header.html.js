export default {
    render() {
        return `
            <h1 class="page-header">{{data.title}} <small v-if="data.subtitle">{{data.subtitle}}</small></h1>
        `;
    }
}
