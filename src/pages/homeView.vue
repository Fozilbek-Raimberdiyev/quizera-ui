<template>
    <div class="wrapper">
      <aside v-if="authStore.isAuth" class="left sidebar" :class="{open : menuState, close : !menuState}">
        <sidebar @getState="getState"></sidebar>
      </aside>
      <aside class="right main-content">
        <div>
          <transition name="slide-fade">
            <router-view />
          </transition>
          <!-- <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view> -->
        </div> 
      </aside>
      
    </div>
  </template>
  <script>
  
  import Sidebar from '@/components/sidebar.vue'
  import { mapStores } from 'pinia'
  import { authStore } from '../stores/counter'
  import {ElNotification} from "element-plus"
  export default {
    components: { Sidebar },
    data() {
      return {
        menuState : true,
      }
    },
    computed : {
      ...mapStores(authStore)
    },
    methods : {
      getState (value) {
        this.menuState = value
      }
    }
    
  }
  </script>
  <style scoped>
  * {
    margin: 0;
    padding: 0;
  }
    .wrapper {
      display: flex;
    }
    .left {
    /* transition: all  .5s; */
    }
    .left.open {
      /* flex-basis: 20%; */
      max-width: 20%;
      margin-right: 18rem;
  
    }
    .left.close {
      flex-basis: 7%;
      
    }
    .right {
      /* margin-left: -2rem;
      margin-right: 2rem; */
      flex-basis: 75%;
    }
    .main-content {
      /* width: 85%;
      margin: 0 auto; */
    }
  
    .slide-fade-enter-active {
          transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1),
              color 0.5s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .slide-fade-leave-active {
          transition: transform 1s cubic-bezier(1, 0.5, 0.8, 1),
              color 1s cubic-bezier(1, 0.5, 0.8, 1);
      }
      .slide-fade-enter {
          color: mediumblue;
          transform: translateY(20px);
      }
      .slide-fade-leave-to {
          transform: translateX(100px);
          color: cyan;
      }

      .notitifacation {
        background: red;
      }
  
  </style>