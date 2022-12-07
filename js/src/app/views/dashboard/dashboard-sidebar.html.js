export default {
    render(PROFILE_IMAGE_DEFAULT) {
        return `
            <div id="sidebar" class="sidebar pretty-scrollbar v-dashboard-sidebar">
                <ul class="nav">
					<li class="nav-profile">
					    <router-link :to="{name: 'profile'}">
						    <div class="cover with-shadow"></div>
							<div class="image" :style="profileAvatar"></div>
							<div class="info">
								{{user.full_name}}
								<small>{{user.email}}</small>
							</div>
						</router-link>
					</li>
				</ul>
                <ul class="nav">
					<li class="has-sub yellow expand active" @click="onToggleMenu($event)">
						<a>
							<b class="caret"></b>
							<span>GENERAL</span>
						</a>
						<ul class="sub-menu">
							<li>
							    <router-link to="/" title="Dashboard">
							        <i class="fas fa-tachometer-alt"></i>
							        <span>Dashboard</span>
                                </router-link>
							</li>
							<li>
							    <router-link :to="{name: 'profile'}" title="My Profile">
                                    <i class="fas fa-user-edit"></i>
                                    <span>My Profile</span>
                                </router-link>
                            </li>
                            <li>
							    <router-link :to="{name: 'settings'}" title="Settings">
                                    <i class="fas fa-cog"></i>
                                    <span>Settings</span>
                                </router-link>
                            </li>
						</ul>
					</li>
					<li class="has-sub yellow expand active" @click="onToggleMenu($event)">
						<a>
							<b class="caret"></b>
							<span>SPORTSKINS</span>
						</a>
						<ul class="sub-menu">
						    <li>
							    <router-link :to="{name: 'game-types'}" title="Game Types">
                                    <i class="fas fa-gamepad"></i>
                                    <span>Game Types</span>
                                </router-link>
                            </li>
							<li>
							    <router-link :to="{name: 'seasons'}" title="Seasons">
                                    <i class="far fa-calendar"></i>
                                    <span>Seasons</span>
                                </router-link>
                            </li>
                            <li>
							    <router-link :to="{name: 'teams'}" title="Teams">
                                    <i class="fas fa-futbol"></i>
                                    <span>Teams</span>
                                </router-link>
                            </li>
                            <li>
							    <router-link :to="{name: 'games'}" title="Games">
                                    <i class="fas fa-dice"></i>
                                    <span>Games</span>
                                </router-link>
                            </li>
                            <li>
							    <router-link :to="{name: 'fixtures'}" title="Fixtures">
                                    <i class="fas fa-poll-h"></i>
                                    <span>Fixtures</span>
                                </router-link>
                            </li>
						</ul>
					</li>
					<li class="has-sub red expand active" @click="onToggleMenu($event)">
						<a>
							<b class="caret"></b>
							<span>USERS</span>
						</a>
						<ul class="sub-menu">
						    <li>
							    <router-link :to="{name: 'payments', query: { refresh: 1 }}" title="Payments">
							        <i class="fab fa-cc-visa"></i>
							        <span>Payments</span>
                                </router-link>
							</li>
							<li>
							    <router-link :to="{name: 'users', query: { refresh: 1 }}" title="Users">
							        <i class="fas fa-user-friends"></i>
							        <span>List</span>
                                </router-link>
							</li>
							<li>
							    <router-link :to="{name: 'user-add'}" title="New User">
							        <i class="fas fa-user-plus"></i>
							        <span>Add an user</span>
                                </router-link>
							</li>
						</ul>
					</li>
					<li v-if="false" class="has-sub green expand active" @click="onToggleMenu($event)">
						<a>
							<b class="caret"></b>
							<span>NEWS</span>
						</a>
						<ul class="sub-menu">
							<li>
							</li>
						</ul>
					</li>
					<li class="has-sub expand active">
					    <ul class="sub-menu">
					        <li>
                                <a href="/logout" class="logout" title="Logout" @click="onLinkClick">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
				</ul>
            </div>
        `;
    }
}
