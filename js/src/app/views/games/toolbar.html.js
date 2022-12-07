export default {
    render() {
        return `
            <form class="v-toolbar v-games-toolbar" @submit.prevent="onChange">
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
                    <div class="col-auto align-self-center">
                        <label>Date start:</label>
                    </div>
                    <div class="col-auto">
                        <date-picker 
                            v-model="open_date"
                            :range="true" 
                            valueType="date" 
                            lang="en"
                            type="date"
                            range-separator=" - "
                            format="D/MM/YYYY"
                            @change="onChange"
                            name="open_date">
                        </date-picker>
                    </div>
                    <div class="col-auto">
                        <span class="separator"></span>
                    </div>                    
                    <div class="col">
                        <multi-select
                            :options="statuses"
                            :selectedOptions="params.status"
                            placeholder="Select game status(s)"
                            @select="onStatusChange"
                            class="form-control">
                        </multi-select>
                    </div>
                    <div class="col-auto text-right">
                        <button @click="onNewGame" class="btn btn-primary m-r-10" type="button">
                            <i class="fas fa-plus-circle"></i> New Game
                        </button>
                        <button type="button" class="btn btn-aqua" @click="onRefresh">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-auto align-self-center">
                        <label>Price:</label>
                    </div>
                    <div class="col-2 d-inline-flex">
                        <input type="number" min="0" step="1" class="form-control" placeholder="From" v-model.trim="params.priceFrom" @change="onChange">
                        <span class="m-l-5 m-r-5 range-seperator"> - </span>
                        <input type="number" min="0" step="1" class="form-control" placeholder="To" v-model.trim="params.priceTo" @change="onChange">
                    </div>
                    <div class="col-auto">
                        <span class="separator"></span>
                    </div>
                    <div class="col-auto align-self-center">
                        <label>Value:</label>
                    </div>
                    <div class="col-2 d-inline-flex">
                        <input type="number" min="0" step="1" class="form-control" placeholder="From" v-model.trim="params.valueFrom" @change="onChange">
                        <span class="m-l-5 m-r-5 range-seperator"> - </span>
                        <input type="number" min="0" step="1" class="form-control" placeholder="To" v-model.trim="params.valueTo" @change="onChange">
                    </div>
                    <div class="col-auto">
                        <span class="separator"></span>
                    </div>
                    <div class="col-auto align-self-center">
                        <label>Players:</label>
                    </div>
                    <div class="col-2 d-inline-flex">
                        <input type="number" min="0" step="1" class="form-control" placeholder="From" v-model.trim="params.playersFrom" @change="onChange">
                        <span class="m-l-5 m-r-5 range-seperator"> - </span>
                        <input type="number" min="0" step="1" class="form-control" placeholder="To" v-model.trim="params.playersTo" @change="onChange">
                    </div>
                </div>
            </form>
        `;
    }
}
