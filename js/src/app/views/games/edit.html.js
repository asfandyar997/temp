export default {
    render() {
        return `
            <div class="v-game">
                <form @submit.prevent="onSubmit" name="game-form" v-show="$route.name === 'game-add' || $route.name === 'game-edit' || $route.name === 'game-teams'">
                    <div class="row">
                        <div class="col-lg-12 col-xl-10">
                            <div class="panel">
                                <div class="panel-body">
                                    <legend>Primary details</legend>
                                    <hr>
                                    <div class="form-row m-b-10">
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-season'">Season</label>
                                                <model-select
                                                :id="prefix + '-season'"
                                                :options="seasons"
                                                optionValue="id"
                                                optionText="name"
                                                v-model="form.season_id"
                                                placeholder="Select season"
                                                class="form-control"
                                                required>                                                
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-type'">Game type</label>
                                                <model-select
                                                :id="prefix + '-type'"
                                                :options="types"
                                                    optionValue="id"
                                                    optionText="name"
                                                v-model="form.game_type_id"
                                                placeholder="Select game type"
                                                class="form-control"
                                                required>                                                
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-status'">Status</label>
                                                <model-select
                                                    :id="prefix + '-status'"
                                                    :options="statuses"
                                                    optionValue="id"
                                                    optionText="name"
                                                    v-model="form.status"
                                                    placeholder="Select status"
                                                    class="form-control"
                                                    required>                                                
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-game-name'">Game name</label>
                                                <input v-model.trim="form.name" class="form-control" type="text" :id="prefix + '-game-name'" name="name" required
                                                    maxlength="50"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-game-price'">Price</label>
                                                <input type="number" min="0" step="1" class="form-control" 
                                                v-model.trim="form.price" :id="prefix + '-game-price'" name="price" required
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                                                            
                        <div class="col-lg-12 col-xl-10">
                            <div class="panel">
                                <div class="panel-body">
                                    <legend>Game Weeks</legend>
                                    <hr>
                                    <div class="form-row m-b-10">
                                        <div class="col-md-3">
                                        <div class="input-group m-b-10">
                                            <input type="number" min="1" step="1" class="form-control" v-model.trim="roundNumber" :id="prefix + '-round-number'" name="roundNumber">
                                            <div class="input-group-append">
                                                <button type="button" class="btn btn-primary no-caret" @click="onGenerateRounds">
                                                    <i class="fas fa-plus"/> {{ addRoundButtonLabel }}
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="form-row m-b-10">
                                        <round v-for="(round, index) in form.rounds" ref="Round" :key="index" :index="index" v-model="round"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-xl-10">
                            <div class="panel">
                                <div class="panel-body">
                                    <legend>Overview</legend>
                                    <hr>
                                    <table class="overview-table w-100">
                                        <thead>
                                            <tr>
                                                <th>Players</th>
                                                <th>Entries (all)</th>
                                                <th>Prize Pot</th>
                                                <th>Entries Remaining (in game)</th>
                                                <th>Picks Used</th>
                                                <th>Next game week</th>
                                                <th>Game status</th>
                                                <th>Game closing</th>
                                                <th v-if="false"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{ form.player_count }}</td>
                                                <td>{{ form.picks_count }}</td>
                                                <td>{{ prizePot }}</td>
                                                <td>{{ form.picks_active_count }}</td>
                                                <td>
                                                    <button @click.prevent="onShowTeams" class="btn btn-sm btn-info">Open</button>
                                                </td>
                                                <td>{{ nextGameWeek }}</td>
                                                <td>
                                                    <span class="label" :class="'label-'+form.status">{{ statusLabel(form.status) }}</span>                                                
                                                </td>
                                                <td>{{ form.current_round ? dt(form.current_round.entry_close) : '--' }}</td>
                                                <td v-if="false">
                                                    <button @click.prevent="onExport" class="btn btn-sm btn-info">Export</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row m-t-10">
                        <div class="col-lg-12 col-xl-10 panel-footer text-right">
                            <button type="submit" class="btn btn-primary btn-large" :aria-disabled="isWorking" :disabled="isWorking">
                                <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                {{this.isNew ? 'Save' : 'Update'}}
                            </button>
                            <button type="button" class="btn btn-default btn-large m-l-5" :aria-disabled="isWorking" :disabled="isWorking" @click="onCancel">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
                <div v-show="$route.name === 'game-add-fixtures' || $route.name === 'game-edit-fixtures' || $route.name === 'game-teams'">
                    <router-view></router-view>
                </div>
            </div>
        `;
    }
}
