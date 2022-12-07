import C from './../../../config/constants';

export default {
    render() {
        return `
            <div class="v-tenant-comments">
                <div class="panel">
                    <div class="panel-heading">
                        <h4 class="panel-title">Comments (for internal use)</h4>
                        <div class="btn-group m-t-3 m-b-3">
                            <router-link :to="{name: 'comment'}" tag="button" class="btn btn-primary btn-sm">
                                <i class="fas fa-plus"></i> Add comment
                            </router-link>
                            <button class="btn btn-aqua btn-sm" @click="$bus.$emit('${C.EVENT.REFRESH}')">
                                <i class="fas fa-sync-alt"></i> Refresh
                            </button>
                        </div>
                    </div>
                    <div class="panel-body comments-body overflow-auto pretty-scrollbar">
                        <ul class="media-list comment-list" v-if="items.length">
                            <li class="media media-xs" v-for="(item, index) in items" :key="index">
                                <span class="media-left">
                                    <img :src="'${C.PATH.FILES}' + item.Author.avatar" :alt="item.Author.full_name" class="media-object rounded-corner" @error="onAvatarError">
                                </span>
                                <div class="media-body">
                                    <h6 class="media-heading">
                                        {{item.Author.full_name}}
                                        <small class="f-s-10 m-l-5">
                                            <i class="far fa-clock"/> {{dateTime(item.created)}}
                                        </small>
                                    </h6>
                                    <p>{{item.content}}</p>
                                </div>
                            </li>
                        </ul>
                        <p class="text-center f-w-600" v-else>{{initialized ? 'No comments added yet. Be the first!' : 'Loading...'}}</p>
                    </div>
                    <button type="button" class="btn btn-primary btn-block load-more" @click="append" v-if="pagination.last_page > 0 && pagination.last_page !== pagination.current_page" :aria-disabled="isWorking" :disabled="isWorking">
                        <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                        Load more ({{pagination.total - pagination.current_page * pagination.per_page}})
                    </button>
                </div>
                <router-view></router-view>
            </div>
            `;
    }
}
