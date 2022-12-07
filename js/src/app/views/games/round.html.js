export default {
    render() {
        return `
            <div class="v-round row m-b-10">
                <div class="col align-self-center m-t-25">W{{ val.no }}:</div>
                <div class="col">
                    <label>Entry open</label>
                    <date-picker 
                        v-model="val.entry_open"
                        valueType="date" 
                        lang="en"
                        type="datetime"
                        format="D/MM/YYYY HH:mm"
                        name="entry_open"
                        @change="onChange">
                    </date-picker>
                </div>
                <div class="col">
                    <label>Entry close</label>
                    <date-picker 
                        v-model="val.entry_close"
                        valueType="date" 
                        lang="en"
                        type="datetime"
                        format="D/MM/YYYY HH:mm"
                        :notBefore="val.entry_close"                
                        name="entry_close"
                        @change="onChange">
                    </date-picker>
                </div>
                <div class="col-auto align-self-center m-t-25">
                    <button type="button" class="btn btn-danger" @click="onDelete" :disabled="isDisabled" v-tooltip.top="isDisabled ? 'Round in progress or finished cannot be deleted' : 'Delete round'"><i class="fas fa-trash-alt m-r-0"></i></button>
                </div>
                <div class="col-auto align-self-center m-t-25">
                    <button type="button" class="btn btn-aqua" @click="onFixtures" v-tooltip.top="'Edit fixtures'">Fixtures</button>
                </div>
                <div class="col-auto align-self-center m-t-25" v-if="!isNew">
                    <span class="label" :class="'label-'+val.status">{{ statusLabel }}</span>
                </div>
                <div class="col-auto align-self-center m-t-25 dirty" v-if="val.dirty">
                    <i class="fas fa-circle" v-tooltip.top="'Fixture(s) changed automatically by API'"/> Fixtures changed
                </div>
            </div>
        `;
    }
}
