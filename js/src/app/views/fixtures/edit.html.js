export default {
    render() {
        return `
            <div class="v-fixture">
                <form @submit.prevent="onSubmit" name="fixture-form">
                    <div class="row">
                        <div class="col-lg-12 col-xl-8">
                            <div class="panel">
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col text-right"><h3>{{ form.home_team ? form.home_team.name : '' }}</h3></div>
                                        <div class="col-auto text-center"><h3>—</h3></div>
                                        <div class="col text-left"><h3>{{ form.away_team ? form.away_team.name : '' }}</h3></div>
                                    </div>
                                    <div class="row">
                                        <div class="col position-relative">
                                            <input type="number" class="form-control input-score home" min="0" step="1" max="20" v-model="form.home_team_score" name="home_team_score" required />
                                        </div>
                                        <div class="col-auto text-center p-t-5 semicolon"><h3>:</h3></div>
                                        <div class="col position-relative">
                                            <input type="number" class="form-control input-score away" min="0" step="1" max="20" v-model="form.away_team_score" name="away_team_score" required />                                            
                                        </div>
                                    </div>
                                    <div class="form-row m-t-30">
                                        <div class="col-auto">
                                            <label :for="prefix + '-match-date'">Match Date</label>
                                            <date-picker 
                                                v-model="matchDate"
                                                valueType="date" 
                                                lang="en"
                                                type="datetime"
                                                format="D/MM/YYYY HH:mm"
                                                name="match_date">
                                            </date-picker>
                                        </div>
                                        <div class="col-4">
                                            <label :for="prefix + '-match-winner'">Match Winner</label>
                                            <model-select
                                                :id="prefix + '-match-winner'"
                                                :options="teams"
                                                v-model="form.match_winner"
                                                placeholder="Select match winner"
                                                class="form-control"
                                                required>
                                            </model-select>
                                        </div>
                                        <div class="col">
                                            <label :for="prefix + '-state'">Status</label>
                                            <model-select
                                                :id="prefix + '-state'"
                                                :options="states"
                                                v-model="form.state"
                                                placeholder="Select match status"
                                                class="form-control"
                                                required>
                                            </model-select>
                                        </div>
                                    </div>
                                    <div class="form-row m-t-20">
                                        <div class="col-auto">
                                            <label :for="prefix + '-opta-uid'">Opta Stats UID</label>
                                            <input v-model.trim="form.opta_uid" class="form-control" type="text" :id="prefix + '-opta-uid'" name="opta_uid"
                                                maxlength="100">
                                        </div>
                                        <div class="col align-self-end">
                                            <p class="alert alert-warning p-5 m-b-5 font-weight-bold info">Attention! Removing Opta Stats Team UID stops  API driven interface (auto update).</p>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                          
                    <div class="row m-t-10">
                        <div class="col-lg-12 col-xl-8 panel-footer text-right">
                            <button type="submit" class="btn btn-primary btn-large" :aria-disabled="isWorking" :disabled="isWorking">
                                <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                Update
                            </button>
                            <button type="button" class="btn btn-default btn-large m-l-5" :aria-disabled="isWorking" :disabled="isWorking" @click="onCancel">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }
}
