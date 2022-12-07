import C from './../../../config/constants';

export default {
    render() {
        return `
            <div class="v-chat-images modal fade" :id="prefix + '-modal'" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Add images</h4>
                            <button type="button" @click="onClose" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close">×</button>
                        </div>
                        <div class="modal-body p-b-0">
                            <input-images-upload
                                label="Message Images"
                                description="You can add up to ${C.MESSAGE.MAX_IMAGES} images to the message"
                                name="image"
                                image-url="${C.PATH.FILES}"
                                upload-url="/upload/messages"
                                v-model="images"
                                :id="prefix + '-image'"
                                :sorting=true
                                :limit=${C.MESSAGE.MAX_IMAGES}
                                :messages=false
                                @success="onImageUpload"
                                @fail="onImageUpload"
                                @sort="onImageSort">
                            </input-images-upload>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white" data-dismiss="modal" @click="onClose">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
