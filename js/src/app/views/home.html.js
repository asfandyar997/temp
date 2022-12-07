export default {
    render() {
        return `
            <div class="v-home">
                <div class="row">
                    <div class="col-xl-3 col-md-6">
                        <div class="widget widget-stats bg-orange">
                            <div class="stats-icon"><i class="fa fa-users"></i></div>
                            <div class="stats-info">
                                <h4>ACTIVE USERS</h4>
                                <p>
                                    <animated-number :value="stats.active" :round="true"></animated-number>
                                </p>
                            </div>
                            <div class="stats-link">
                                <router-link :to="{name: 'users', query: { refresh: 1 }}">
                                    View <i class="fa fa-arrow-alt-circle-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="col-xl-3 col-md-6">
                        <div class="widget widget-stats bg-red">
                            <div class="stats-icon"><i class="fa fa-clock"></i></div>
                            <div class="stats-info">
                                <h4>AWAITING APPROVAL</h4>
                                <p>
                                    <animated-number :value="stats.awaiting" :round="true"></animated-number>
                                </p>
                            </div>
                            <div class="stats-link">
                                <router-link :to="{name: 'tenants', query: { pending: 1 }}">
                                    View <i class="fa fa-arrow-alt-circle-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="widget widget-stats bg-blue">
                            <div class="stats-icon"><i class="fa fa-envelope"></i></div>
                            <div class="stats-info">
                                <h4>NEW MESSAGES</h4>
                                <p>
                                    <animated-number :value="stats.messages" :round="true"></animated-number>
                                </p>
                            </div>
                            <div class="stats-link">
                                <router-link :to="{name: 'messages'}">
                                    View <i class="fa fa-arrow-alt-circle-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="widget widget-stats bg-info">
                            <div class="stats-icon"><i class="fa fa-link"></i></div>
                            <div class="stats-info">
                                <h4>BOUNCE RATE</h4>
                                <p>20.44%</p>
                            </div>
                            <div class="stats-link">
                                <a href="javascript:;">View Detail <i class="fa fa-arrow-alt-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>                
                <div class="row">
                    <div class="col-10">
                        <h3 class="f-w-300">
                            Recent Tenants <small>tenant accounts created within the last week</small>
                        </h3>
                    </div>
                    <div class="col text-right p-r-0">
                        <router-link :to="{name: 'tenants'}" tag="button" class="btn btn-primary btn-sm m-r-10">See all <i class="fas fa-angle-double-right m-l-5"></i></router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <recent-tenants></recent-tenants>
                    </div>
                </div>
                -->
                <router-view></router-view>
            </div>
        `;
    }
}
