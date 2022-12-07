import C from './../../config/constants';

export default {
    render() {
        return `
        <div id="header" class="header navbar-default v-dashboard-header">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed navbar-toggle-left" @click="$bus.$emit('${C.EVENT.DASHBOARD.SIDEBAR}')">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <a href="/" class="navbar-brand">
                    SportSkins
                </a>
            </div>
            <ul class="navbar-nav navbar-right">
				<li class="search">
				    <i class="material-icons">search</i>
				    <vue-simple-suggest
                        :list="getSearchResults"
                        display-attribute="full_name"
                        value-attribute="uid"
                        v-model="keyword"
                        :max-suggestions=15
                        :debounce=2
                        :styles="autoCompleteCls"
                        :destyled=true
                        :filter-by-query=false
                        :prevent-submit=true
                        @select="onSearchResultSelect" placeholder="Search for an user here...">
                    </vue-simple-suggest>
				</li>
				<li>
					<a href="#" class="icon" title="Notifications">
						<i class="material-icons">notifications_none</i>
						<span class="label">0</span>
					</a>
				</li>
				<li>
					<a href="/logout" @click="onLinkClick" class="icon text-danger" title="Log Out">
						<i class="material-icons">logout</i>
					</a>
				</li>
			</ul>
        </div>`;
    }
}
