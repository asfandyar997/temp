import C from './../config/constants';

export default {
    render() {
        return `
            <div class="v-sign-in login login-v2">
                <div class="login-header">
                    <div class="brand text-center">
                        <a href="${C.URL.WWW}">
                            <img src="/img/logo-plain.png" class="img-fluid" alt="SportSkins"/>
                            <br/>Management area
                            <small>Sign-In using your e-mail and password</small>
                        </a>
                    </div>
                </div>
                <div class="login-content">
                    <form method="post" accept-charset="utf-8" role="form" @submit.prevent="onSubmit" class="margin-bottom-0">
                        <div class="form-group required m-b-20">
                            <label :for="prefix + '-email'" class="sr-only">E-mail address</label>
                            <input type="email" placeholder="Email *" :id="prefix + '-email'" class="form-control form-control-lg" v-model.trim="form.email" @change="onInputChange" @invalid.prevent="onInputInvalid" required>
                            <div class="invalid-feedback">Please enter a valid email address</div>
                        </div>
                        <div class="form-group required m-b-20">
                            <label :for="prefix + '-password'" class="sr-only">Password</label>
                            <input type="password" placeholder="Hasło *" :id="prefix + '-password'" class="form-control form-control-lg" v-model.trim="form.password" @change="onInputChange" @invalid.prevent="onInputInvalid" minlength="${C.PASSWORD.MIN_LENGTH}" required>
                            <div class="invalid-feedback">Password is required</div>
                        </div>
                        <div class="login-buttons">
                            <button type="submit" class="btn btn-aqua btn-block btn-lg" :aria-disabled="isWorking" :disabled="isWorking">Sign me in</button>
                        </div>
                        <transition name="fade">
                            <div class="form-group col-12" v-show="message">
                                <div class="alert text-center" :class="{'text-danger': hasError, 'text-success': !hasError }" role="alert">{{message}}</div>
                            </div>
                        </transition>
                        <div class="m-t-20 text-center copyright">
                            Copyright &copy; <a href="https://premskinsapp.com/">SportSkins</a> 2021
                        </div>
                    </form>
                </div>
            </div>`;
    }
}
