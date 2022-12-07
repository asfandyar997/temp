export default {
    render() {
        return `
            <div class="v-fixtures">
                <div class="row">
                    <p class="w-100">
                        <span class="m-r-30">Entries open: {{entryOpen}}</span> 
                        <span class="m-r-30">Entries close: {{entryClose}}</span> 
                        <span>Status: <strong>{{statusLabel}}</strong></span>
<!--                        <button class="btn btn-default float-right" @click="onCancel">Cancel</button>-->
                        <button class="btn btn-primary float-right m-r-10" @click="onSave">Back</button>
                    </p>
                </div>
                <div class="row m-b-20">
                    <div class="col p-0">
                        <hr/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-auto">
                        <h5 class="title-filters">Opta Stats matches - filters</h5>
                        <div class="row">
                            <div class="col-auto">
                                <div class="row m-b-10">
                                    <div class="col-auto align-self-end p-l-0">
                                        <label class="text-nowrap width-100">Game start from:</label>
                                    </div>
                                    <div class="col-auto">
                                        <date-picker 
                                            v-model="filter.from"
                                            valueType="date" 
                                            lang="en"
                                            type="datetime"
                                            format="D/MM/YYYY HH:mm"
                                            name="start_from">
                                        </date-picker>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-auto align-self-end p-l-0">
                                        <label class="text-nowrap width-100">Game start to:</label>
                                    </div>
                                    <div class="col-auto">
                                        <date-picker 
                                            v-model="filter.to"
                                            valueType="date" 
                                            lang="en"
                                            type="datetime"
                                            format="D/MM/YYYY HH:mm"
                                            name="start_to">
                                        </date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <button class="btn btn-primary h-100" @click="onSearch">Search</button>
                            </div>
                        </div>                        
                    </div>
                    <div class="col">
                        <h5>Custom match - not handled automatically</h5>
                        <div class="panel">
                            <div class="panel-body">
                                <form @submit.prevent="onSubmitMatch" name="match-form">
                                    <div class="form-row p-0">
                                        <div class="col">
                                            <label for="home-team">Home team</label>
                                            <model-select
                                                id="home-team"
                                                :options="teams"
                                                v-model="match.home_team_id"
                                                placeholder="Select home team"
                                                class="form-control"
                                                required>
                                            </model-select>
                                            <div class="invalid-feedback">This field is required</div>
                                        </div>
                                        <div class="col">
                                            <label for="away-team">Away team</label>
                                            <model-select
                                                id="away-team"
                                                :options="teams"
                                                v-model="match.away_team_id"
                                                placeholder="Select away team"
                                                class="form-control"
                                                required>
                                            </model-select>
                                            <div class="invalid-feedback">This field is required</div>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="match-date">Match date</label>
                                            <date-picker 
                                                v-model="match.match_date"
                                                valueType="date" 
                                                lang="en"
                                                type="datetime"
                                                format="D/MM/YYYY HH:mm"
                                                name="match_date">
                                            </date-picker>
                                        </div>                
                                        <div class="col-auto d-flex">                        
                                            <button class="btn btn-primary align-bottom">Add match</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>                
                <div class="row m-b-20">
                    <div class="col p-0">
                        <hr/>
                    </div>
                </div>
                <div class="row">
                    <div class="col border-right p-l-0">
                        <h5>Opta Stats matches - handled automatically</h5>
                        <hr/>
                        <div class="panel">
                            <div class="panel-body">
                                <table class="table table-hover table-td-valign-middle table-sm">
                                    <thead>
                                        <tr>
                                            <th>Home</th>
                                            <th>Away</th>
                                            <th>Game date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(match, index) in matches" :key="index">
                                            <td>{{match.home_team.name}}</td>
                                            <td>{{match.away_team.name}}</td>
                                            <td>{{dt(match.match_date)}}</td>
                                            <td>
                                                <button class="btn btn-sm btn-light" @click="onAdd(index)">Add to fixtures</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button class="btn btn-sm btn-light" @click="onAddAll" v-if="matches.length > 0">Add all matches</button>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <h5>Matches assigned to {{no}}</h5>
                        <hr/>
                        <div class="panel">
                            <div class="panel-body">
                                <table class="table table-hover table-td-valign-middle table-sm">
                                    <thead>
                                        <tr>
                                            <th>Home</th>
                                            <th>Away</th>
                                            <th>Game date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(fixture, index) in fixtures" :key="index">
                                            <td>{{fixture.home_team.name}}</td>
                                            <td>{{fixture.away_team.name}}</td>
                                            <td>{{dt(fixture.match_date)}}</td>
                                            <td>
                                                <button class="btn btn-sm btn-danger" @click="onRemove(index)">Remove</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 align-content-end">
<!--                        <button class="btn btn-default float-right" @click="onCancel">Cancel</button>-->
                        <button class="btn btn-primary float-right m-r-10" @click="onSave">Back</button>
                    </div>
                </div>
            </div>
        `;
    }
}
