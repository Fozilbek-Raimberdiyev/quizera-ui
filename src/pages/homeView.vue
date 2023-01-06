<template>
    <div class="wrapper">
      <aside v-if="authStore.isAuth" class="left sidebar" :class="{open : menuState, close : !menuState}">
        <sidebar @getState="getState"></sidebar>
      </aside>
      <aside class="right main-content" :class="{open : menuState, close : !menuState}">
        <div class="top-sidebar" :class="{open : menuState, close : !menuState}">
          <div>
            <bread-crumbs></bread-crumbs>
          </div>
          <div>
            <i class='bx bx-user'></i>
            {{$pinia.state.value.auth.user.email}}
          </div>
          {{ loadingC }}
        </div>
        <div style="margin-right: 2rem;">
          <!-- <transition name="el-fade-in">
            <router-view />
          </transition> -->
          <div v-show="!loading">
            <router-view v-slot="{ Component }">
            <transition name="el-fade-linear">
              <component :is="Component" />
            </transition>
          </router-view>
          </div>
          <div v-show="loading">
            <!-- <loading
                 :can-cancel="true"
                 :on-cancel="true"
                 :is-full-page="false"/> -->

                 <loading v-model:active="loading"
                 :can-cancel="true"
                 :on-cancel="false"
                 :is-full-page="true"
                 loader="bars"
                 opacity="0.9"
                 />
          </div>
        </div> 
      </aside>
      
    </div>
  </template>
  <script>
  import Sidebar from '@/components/sidebar.vue'
  import { mapState, mapStores } from 'pinia'
  import { authStore } from '../stores/counter'
  import {ElNotification} from "element-plus"
  import { loadingStore } from '../stores/loading.store'
  import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';
import breadCrumbs from '../components/breadCrumbs.vue'
  export default {
    components: { Sidebar, Loading, breadCrumbs },
    data() {
      return {
        menuState : true,
      }
    },
    computed : {
      ...mapStores(authStore),
      ...mapState(loadingStore, ["loading"]),
      ...mapStores(loadingStore),
      loadingC() {
        return 
      }
    },
    methods : {
      getState (value) {
        this.menuState = value
      }
    }
    
  }
  </script>
  <style scoped>
  @import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
  * {
    margin: 0;
    padding: 0;
  }
    .wrapper {
      margin: 0;
      padding: 0;
      display: flex;
      background: #eef0f8;
    }
    .left {
    /* transition: all  .5s; */
    }
    .left.open {
      /* max-width: 20%; */
      margin-right: 18rem;
  
    }
    .left.close {
      flex-basis: 7%;
      
    }
    .right {
      /* margin-left: -2rem;
      margin-right: 2rem; */
      flex-basis: 100%;
      background: #eef0f8;
      position: relative;
    }


      .notitifacation {
        background: red;
      }
      .top-sidebar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        padding: 20px 2.9rem 20px 2.2rem;
      }
      .top-sidebar.open {
        margin-left: -2.3rem;
        margin-bottom: 1rem;
      }
      .top-sidebar.close {
        margin-left: -1rem;
      }
  </style>