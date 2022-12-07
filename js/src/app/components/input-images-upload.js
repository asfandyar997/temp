import C from '../config/constants';

const
    EVENT_SUCCESS = C.EVENT.SUCCESS,
    EVENT_FAIL = C.EVENT.FAIL,
    EVENT_SORT = C.EVENT.SORT,
    EVENT_INPUT = C.EVENT.INPUT;

export default {
    data() {
        return {
            val: [],
            isUploading: false,
            isEmpty: true,
            rows: 0,
            hasError: false,
            message: '',
            disabled: false
        };
    },
    props: {
        label: String,
        description: {
            type: String,
            default: ''
        },
        name: String,
        uploadUrl: {
            type: String,
            default: '/upload/image'
        },
        imageUrl: String,
        value: Array,
        sorting: {
            type: Boolean,
            default: false
        },
        accept: {
            type: String,
            default: '.jpg,.jpeg,.png,.webp'
        },
        disableUpload: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 0
        },
        messages: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        val() {
            this.countRows();
            this.checkLimit();
        },
        disableUpload(val) {
            this.disabled = val;
        }
    },
    methods: {
        cols(row) {
            let start = (row - 1) * 4,
                col = this.value.slice(start, start + 4);
            if (row === this.rows && this.disabled === false) {
                return col.concat({
                    type: 'ADD'
                });
            }
            return col;
        },
        reset() {
            this.hasError = false;
            this.message = '';
        },
        countRows() {
            this.rows = Math.ceil((this.value.length + 1) / 4);
        },
        getImageStyle(src) {
            return {
                backgroundImage: `url(${this.imageUrl}${src})`
            }
        },
        remove(src) {
            this.val = this.value.filter((item) => {
                return item.path !== src;
            });
            this.$emit(EVENT_INPUT, this.val);
        },
        checkLimit() {
            if (this.limit <= 0) {
                this.disabled = false;
                return 0;
            }
            let remained = this.limit - this.value.length;
            this.disabled = remained <= 0;
            return remained;
        },
        onFileChange(e) {
            let files = e.target.files,
                form = new FormData();

            if (!files.length) {
                return;
            }

            if (this.limit > 0) {
                let remained = this.checkLimit();
                if (remained <= 0) {
                    return;
                }
                Array.from(Array(files.length).keys()).slice(0, remained).map(i => {
                    form.append(i, files[i], files[i].name);
                });
            } else {
                Array.from(Array(files.length).keys()).map(i => {
                    form.append(i, files[i], files[i].name);
                });
            }

            this.isUploading = true;

            this.upload(form).then(response => {
                if (response.success) {
                    this.hasError = false;
                    this.message = response.msg;
                    this.$emit(EVENT_SUCCESS, response.msg, response.results);
                } else {
                    this.hasError = true;
                    this.message = response.msg;
                    this.$emit(EVENT_FAIL, response.msg, response.results);
                }
                this.$nextTick(() => {
                    this.countRows();
                    this.checkLimit();
                });
            }).catch(error => {
                this.$emit(EVENT_FAIL, error);
            }).then(() => this.isUploading = false);
        },
        upload(form) {
            return this.$server.post(this.uploadUrl, form).then(response => response.data);
        },
        sort(image, dir) {
            if (!this.sorting) {
                return;
            }
            this.$emit(EVENT_SORT, image, dir);
        },
        refresh() {
            this.countRows();
            this.checkLimit();
        },
        _sync() {
            this.val = !this.value ? [] : [...this.value];
        }
    },
    created() {
        this._sync();
    },
    template: `
        <div class="v-input-images-upload">
            <label>{{label}}</label>
            <p v-if="description !== ''">{{description}}</p>
            <div class="row m-b-20" v-for="i in rows">
                <div class="col-md-3" v-for="(img, index) in cols(i)">
                    <div class="img-thumbnail image" :style="getImageStyle(img.path)" v-if="img.type !== 'ADD'">
                        <div class="sorting" v-if="sorting">
                            <a class="btn btn-primary btn-icon btn-circle btn-sm sort-down" @click="sort(img, 'down')" title="Down">
                                <i class="fas fa-sort-down"/>
                            </a>
                            <a class="btn btn-primary btn-icon btn-circle btn-sm sort-up" @click="sort(img, 'up')" title="Up">
                                <i class="fas fa-sort-up"/>
                            </a>
                        </div>
                        <a class="btn btn-danger btn-icon btn-circle btn-sm remove" @click="remove(img.path)" title="Delete">
                            <i class="fas fa-times"/>
                        </a>
                    </div>
                    <div class="img-thumbnail image add" v-if="img.type === 'ADD'" :class="{disabled: isUploading}">
                        <input type="file" :name="name" :disabled="isUploading" @change="onFileChange" accept=":accept" class="input-file" multiple>
                        <transition name="fade">
                            <p v-if="isUploading" class="uploading">
                                <i class="fas fa-cog fa-spin"></i>
                            </p>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="row m-b-20" v-if="messages && message !== ''">
                <transition name="fade">
                    <div class="alert d-inline p-b-0" :class="{'text-danger': hasError, 'text-success': !hasError }" role="alert" v-show="message !== ''">{{message}}</div>
                </transition>
            </div>
        </div>`
}
