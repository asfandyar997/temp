export default {
    render() {
        return `
            <form class="v-toolbar v-seasons-toolbar" @submit.prevent="onChange">
                <div class="row">
                    <div class="col-3">
                        <div class="input-group m-b-10">
                            <input type="search" class="form-control" placeholder="Keyword..." v-model.trim="params.keyword" @change="onChange">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-primary no-caret" @click="onChange">
                                    <i class="fas fa-search"/> Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col text-right">
                        <router-link :to="{name: 'seasons-add'}" class="btn btn-primary m-r-10" tag="button" type="button">
                            <i class="fas fa-plus-circle"></i> New Season
                        </router-link>
                        <button type="button" class="btn btn-aqua" @click="onRefresh">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>
                </div>
            </form>
        `;
    }
}
