export default {
    render() {
        return `
            <div class="v-messages">
                <div class="row">
                    <div class="col-md-4">
                        <div class="input-group input-group-md mb-3">
							<input
							    type="search"
							    maxlength="100"
                                class="form-control input-white"
                                placeholder="Enter user name, e-mail or tenant no..."
                                v-model="filters.keyword"
                                @input="onSearch">
							<div class="input-group-append">
								<button type="button" class="btn btn-primary" :aria-disabled="isWorking" :disabled="isWorking" @click="onSearch">
								    <i class="fa fa-search fa-fw" aria-hidden="true" v-show="!isWorking"></i>
                                    <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
								    Search
                                </button>
							</div>
						</div>
                        <div class="panel">
                            <div class="panel-body users-body overflow-auto pretty-scrollbar">
                                <div class="widget-list widget-list-rounded" v-if="items.length">
                                  <router-link :to="{name: 'threads', params: { uid: item.uid }}" class="widget-list-item" v-for="(item, index) in items" :title="prettyDate(item.latest)" :key="item.uid">
                                    <div class="widget-list-content">
                                        <h4 class="widget-list-title" :class="[item.unread > 0 ? 'f-w-800' : '']"><span class="no" :class="[!item.tenant_no ? 'text-center' : '']">{{item.tenant_no || '---'}}</span> {{item.full_name}}</h4>
                                    </div>
                                    <div class="widget-list-action text-nowrap text-grey-darker text-right">
                                        <span class="f-s-11">{{item.email}}</span>
                                        <i class="fa fa-envelope text-muted fa-lg m-l-5"></i>
                                        <span class="badge badge-yellow" v-if="item.unread > 0">{{item.unread}}</span>
                                    </div>
                                  </router-link>
                                </div>
                                <p class="text-center f-w-600" v-else>{{initialized ? 'No active users' : 'Loading...'}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <router-view name="threads"></router-view>
                    </div>
                    <div class="col-md-5">
                        <router-view name="messages"></router-view>
                    </div>
                </div>
            </div>
        `;
    }
}
