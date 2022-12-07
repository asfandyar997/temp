export default {
    render() {
        return `
            <div class="v-setting">
                <div class="row">
                    <div class="col-lg-12 col-xl-9">
                        <div class="panel">
                            <div class="panel-body">
                                <form @submit.prevent="onSubmit" name="setting-form">
                                    <div class="form-row">
                                        <div class="col-md-3">
                                            <label class="col-form-label" :for="prefix + '-group-and-key'">Group and key</label>                                        
                                        </div>  
                                        <div class="col-md-9">  
                                            <div class="">
                                                <span :id="prefix + '-group-and-key'" class="form-control-plaintext">{{form.group}} <b> . </b> {{form.key}}</span>                                                
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-3">
                                            <label class="col-form-label" :for="prefix + '-description'">Description</label>                                        
                                        </div>  
                                        <div class="col-md-9">  
                                            <div class="">
                                                <span :id="prefix + '-description'" class="form-control-plaintext font-italic">{{form.description}}</span>                                                
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-3">
                                            <label class="col-form-label" :for="prefix + '-type'">Type</label>                                        
                                        </div>  
                                        <div class="col-md-9">  
                                            <div class="">
                                                <span :id="prefix + '-type'" :class="['form-control-plaintext', 'value-type', form.type]">{{form.type}}</span>                                                
                                            </div>
                                        </div>                                        
                                    </div>                                    
                                    <div class="form-group row">
                                        <label for="setting-value" class="col-sm-3 col-form-label">Value</label>
                                        <div class="col-sm-2" v-if="form.type === 'FLOAT'">
                                            <input type="number" step="0.01" v-model="form.value" class="form-control" id="setting-value" required @change="onInputChange" @invalid.prevent="onInputInvalid">
                                        </div>
                                        <div class="col-sm-2" v-if="form.type === 'INT'">
                                            <input type="number" step="1" v-model="form.value" class="form-control" id="setting-value" required @change="onInputChange" @invalid.prevent="onInputInvalid">
                                        </div>
                                        <div class="col-sm-2" v-if="form.type === 'BOOL'">
                                            <div class="checkbox checkbox-css">
                                                <input class="form-check-input" type="checkbox" id="setting-value" v-model="form.value">
                                                <label class="form-check-label" for="setting-value">{{form.value}}</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-9" v-if="form.type === 'STRING'">
                                            <textarea class="form-control no-resize value-string-textarea" v-model="form.value" id="setting-value" required @change="onInputChange" @invalid.prevent="onInputInvalid"></textarea>
                                        </div>
                                        <div class="col-sm-9" v-if="form.type === 'JSON'">
                                            <v-jsoneditor v-model="jsonValue" ref="jsonEditor" height="400px" :options="{mode:'code',mainMenuBar: false,statusBar:true}">
                                        </div>
                                        <div class="col-sm-9" v-if="form.type === 'HTML'">
                                            <vue-html5-editor :content="form.value" :height="500" ref="htmlEditor"></vue-html5-editor>
                                        </div>
                                    </div>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-12 panel-footer text-right">
                                            <button type="submit" class="btn btn-primary btn-large" :aria-disabled="isWorking" :disabled="isWorking" v-if="form.editable">
                                                <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                                <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                                Update
                                            </button>
                                            <button type="button" class="btn btn-default btn-large m-l-5" :aria-disabled="isWorking" :disabled="isWorking" @click="onCancel">
                                                {{form.editable ? 'Cancel' : 'Close'}}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
