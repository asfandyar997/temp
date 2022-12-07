import C from './../../config/constants';

export default {
    render() {
        return `
            <div class="v-chat">
                <loader :active=isWorking></loader>
                <div class="widget-chat widget-chat-rounded">
                  <div class="widget-chat-header">
                    <div class="widget-chat-header-content">
                      <h4 class="widget-chat-header-title">
                           {{thread.title}}
                      </h4>
                      <p class="widget-chat-header-desc position-relative">
                           <span class="subtitle">{{thread.ref}} &nbsp;<i class="fa fas" :class="[priorityIconCls(thread.priority), priorityColorCls(thread.priority)]"></i> {{priorityTextShort(thread.priority)}}</span>
                           <model-select
                                :options="statuses"
                                v-model="status"
                                class="form-control thread-status"
                                required>
                           </model-select>
                      </p>
                    </div>
                  </div>
                  <div class="widget-chat-body" data-scrollbar="true">
                    <transition-group name="fade" tag="div" v-if="items.length">
                        <div
                            v-for="(item, index) in items"
                            :key="item.id + '_' + index"
                            class="widget-chat-item"
                            :class="[position(item)]"
                            :data-dt="item.dt"
                            :data-ts="item.ts">
                          <div class="widget-chat-info">
                            <div class="widget-chat-info-container">
                              <div class="widget-chat-name text-indigo">
                                  {{item.Sender.full_name}}
                              </div>
                              <div class="widget-chat-message">
                                   {{item.content}}
                                   <div class="row row-space-2 m-t-5" v-if="item.images.length">
                                       <div class="col-md-4" v-for="(image, index) in item.images" :key="index">
                                           <a :href="'${C.PATH.FILES}' + image.image" target="_blank" class="widget-card widget-card-sm square m-b-2">
                                                <div class="widget-card-cover" :style="avatarBackground(image)"></div>
                                           </a>
                                       </div>
                                   </div>
                              </div>
                              <div class="widget-chat-time">{{prettyDate(item.created)}}</div>
                            </div>
                          </div>
                        </div>
                    </transition-group>
                    <p class="text-center" v-else>{{isWorking ? 'Loading...' : 'No messages'}}</p>
                  </div>
                  <div class="widget-input widget-input-rounded">
                    <form @submit.prevent="send">
                      <div class="widget-input-container">
                        <div class="widget-input-icon">
                            <router-link :to="{name: 'chat-images'}" class="text-grey" :disabled="isWorking">
                                <i class="fa fa-camera"></i>
                                <span class="badge" v-if="images.length" :class="{'badge-danger': images.length}">{{images.length}}</span>
                            </router-link>
                        </div>
                        <div class="widget-input-box">
                          <input type="text" id="chat-message-input" class="form-control" placeholder="Write a message..." v-model.trim="text" :disabled="isWorking" />
                        </div>
                        <div class="widget-input-icon">
                            <a class="text-primary send-button" @click="send" :disabled="isWorking">
                                <i class="fas fa-paper-plane"></i>
                            </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <router-view v-model="images"></router-view>
            </div>
        `;
    }
}
