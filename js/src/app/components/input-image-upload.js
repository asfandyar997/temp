import C from './../config/constants';
import _ from './../utils/utilities';

const
    EVENT_INPUT = C.EVENT.INPUT,
    EVENT_SUCCESS = C.EVENT.SUCCESS,
    EVENT_FAIL = C.EVENT.FAIL;

export default {
    data() {
        return {
            val: '',
            isUploading: false,
            isEmpty: true
        };
    },
    props: {
        label: String,
        id: String,
        name: String,
        uploadUrl: {
            type: String,
            default: '/upload/image'
        },
        imageUrl: String,
        value: String,
        defaultImagePath: {
            type: String,
            default: ''
        }
    },
    computed: {
        styles() {
            if (_.empty(this.val) || this.val === 'null') {
                this.isEmpty = true;
                if (this.defaultImagePath !== '') {
                    return {
                        backgroundImage: `url(${this.defaultImagePath})`
                    }
                }
                return {};
            }
            this.isEmpty = false;
            return {
                backgroundImage: `url(${this.imageUrl}${this.val})`
            }
        }
    },
    methods: {
        onFileChange(e) {
            let name = e.target.name,
                files = e.target.files,
                form = new FormData();

            if (!files.length) return;

            Array.from(Array(files.length).keys()).map(i => {
                form.append(name, files[i], files[i].name);
            });

            this.isUploading = true;

            this.upload(form).then(response => {
                if (response.success) {
                    this.val = response[name];
                    this.$emit(EVENT_INPUT, response[name]);
                    this.$emit(EVENT_SUCCESS, response.msg, response[name]);
                } else {
                    this.$emit(EVENT_FAIL, response.msg);
                }
            }).catch(error => {
                this.$emit(EVENT_FAIL, error);
            }).then(() => this.isUploading = false);
        },
        upload(form) {
            return this.$server.post(this.uploadUrl, form).then(response => response.data);
        },
        reset() {
            this.val = '';
            this.$emit(EVENT_INPUT, '');
        },
        _sync() {
            this.val = !this.value ? '' : String(this.value).toString();
        }
    },
    watch: {
        /**
         * If component keep own state it has to listen changes on model (keep alive)
         */
        value() {
            this._sync()
        }
    },
    /**
     * Prevent mutations
     */
    created() {
        this._sync()
    },
    template: `
        <div class="v-input-image-upload">
            <label :for="id">{{label}}</label>
            <div class="input-group">
                <div class="drop-box" :class="{disabled: isUploading, 'not-empty': !isEmpty}" :style="styles">
                    <input type="file" :name="name" :disabled="isUploading" @change="onFileChange" accept=".jpg,.jpeg,.png,.webp" class="input-file">
                    <p v-if="isEmpty">
                        Drag your file here to begin<br> or click to browse
                    </p>
                    <transition name="fade">
                        <p v-if="isUploading" class="uploading">
                            <i class="fas fa-cog fa-spin"></i>
                        </p>
                    </transition>
                </div>
            </div>
        </div>`
}
