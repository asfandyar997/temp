
export default {
    render() {
        return `
            <div class="v-tenant-comments-add modal fade" :id="prefix + '-modal'" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-internal-mask" v-if="isWorking"></div>
                        <div class="modal-header">
                            <h4 class="modal-title">New comment</h4>
                            <button type="button" @click="onClose" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close" :disabled="isWorking" :aria-disabled="isWorking">×</button>
                        </div>
                        <form @submit.prevent="onSubmit">
                            <div class="modal-body">
                                    <label :for="prefix + '-content'">Your comment:</label>
                                    <textarea
                                        :id="prefix + '-content'"
                                        class="form-control no-resize"
                                        rows="5"
                                        v-model.trim="form.content"
                                        @change="onInputValidate"
                                        @invalid.prevent="onInputInvalid"
                                        :aria-disabled="isWorking"
                                        :disabled="isWorking"
                                        required>
                                    </textarea>
                                    <div class="invalid-feedback">This field is required</div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success" :aria-disabled="isWorking" :disabled="isWorking">
                                    <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                    <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                    Add
                                </button>
                                <button type="button" class="btn btn-white" data-dismiss="modal" @click="onClose" :aria-disabled="isWorking" :disabled="isWorking">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `;
    }
}
