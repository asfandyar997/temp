export default {
    render() {
        return `
            <div class="v-message-threads">
                <loader :active=isWorking></loader>
                <div class="panel">
                    <div class="overflow-auto pretty-scrollbar">
                        <div class="widget-list widget-list-rounded" v-if="items.length">
                          <router-link :to="{name: 'chat', params: { uid: item.uid, record: item }}" class="widget-list-item" v-for="(item, index) in items" :title="prettyDate(item.latest)" :key="item.uid">
                            <div class="widget-list-content">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <h2 class="title">{{item.title}}</h2>
                                        <span class="subtitle">{{item.ref}} &nbsp;<i class="fa fas" :class="[priorityIconCls(item.priority), priorityColorCls(item.priority)]"></i> {{priorityTextShort(item.priority)}}</span>
                                    </div>
                                    <div>
                                        <div class="text-left">
                                            <h4 class="status" :class="[statusColorCls(item.status)]">{{statusText(item.status)}}</h4>
                                            <time>{{prettyDate(item.latest)}}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="widget-list-action text-nowrap text-grey-darker text-right">
                                <i class="fa fas fa-chevron-right text-muted fa-lg m-l-5 icon-open"></i>
                                <span class="badge badge-yellow" v-if="item.unread > 0">{{item.unread}}</span>
                            </div>
                          </router-link>
                        </div>
                        <p class="text-center f-w-600 p-t-15" v-else>{{initialized ? 'No threads available' : 'Loading...'}}</p>
                    </div>
                </div>
            </div>
        `;
    }
}
