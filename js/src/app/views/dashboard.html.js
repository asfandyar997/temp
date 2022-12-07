export default {
    render() {
        return `
            <div id="page-container"
                class="page-container fade page-sidebar-fixed page-header-fixed page-with-wide-sidebar"
                :class="{ show: showContainer, 'page-sidebar-minified': sidebarCollapsed, 'no-sidebar': noSidebar }">
                <dashboard-header :message-inbox="config.messageInbox"></dashboard-header>
                <dashboard-sidebar :user="user"></dashboard-sidebar>
                <dashboard-content :user="user" :settings="settings"></dashboard-content>
            </div>`;
    }
}
