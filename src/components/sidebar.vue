<template>
    <div>
      
        <div class="sidebar" :class="{open : isOpen, 'bx-menu bx-menu-alt-right' : isOpen, 'bx-menu-alt-right bx-menu' : !isOpen}">
          <i :class="[isOpen ? '' : 'bx bx-menu-alt-left']" id="btn" @click="toggleMenu" ></i>
    <div class="logo-details">
      <i class='bx bxl-vuejs' ></i>
        <div class="logo_name">Raimberdiyev</div>
        <!-- <i class="bx bx-menu-alt-right" @click="toggleMenu"></i> -->
    </div>
    <ul class="nav-list">
      <li>
        <router-link to="/">
          <i class='bx bx-grid-alt'></i>
          <span class="links_name">Dashboard</span>
        </router-link>
         <span class="tooltip">Dashboard</span>
      </li>
      <li>
       <router-link to="/news">
        <i class='bx bx-news' ></i>
         <span class="links_name">News</span>
       </router-link>
       <span class="tooltip">News</span>
     </li>
     <li>
       <router-link to="/posts">
        <i class="bi bi-postcard"></i>
         <span class="links_name">Posts</span>
       </router-link>
       <span class="tooltip">Posts</span>
     </li>
     <li>
       <router-link to="/movies">
        <i class='bx bx-movie' ></i>
         <span class="links_name">Movies</span>
       </router-link>
       <span class="tooltip">Movies</span>
     </li>
     <li>
       <router-link to="/weather">
        <i class="bi bi-cloud-sun"></i>
         <span class="links_name">Weather</span>
       </router-link>
       <span class="tooltip">Weather</span>
     </li>
     <li>
       <a href="#">
        <i class='bx bx-video'></i>
         <span class="links_name">Video</span>
       </a>
       <span class="tooltip">video</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-heart' ></i>
         <span class="links_name">Saved</span>
       </a>
       <span class="tooltip">Saved</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-cog' ></i>
         <span class="links_name">Settings</span>
       </a>
       <span class="tooltip">Settings</span>
     </li>
     
    </ul>
    <!-- <li class="profile">
         <div>{{ authStore.user?.email }}</div>
         <i @click="logOut" class='bx bx-log-out' id="log_out" ></i>
     </li> -->
  </div>
    </div>
</template>
<script>
import { mapStores } from 'pinia'
import {authStore} from "../stores/counter"
export default {
    data() {
        return {
            isOpen : true
        }
    },
    computed : {
        ...mapStores(authStore)
    },
    methods : {
        toggleMenu () {
            this.isOpen = !this.isOpen;
            this.$emit("getState", this.isOpen)
        },
        logOut () {
            localStorage.removeItem("user")
            this.authStore.user = {}
            this.$router.push({name : "login"})
        }
    }
}
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");
    /* Google Font Link */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins" , sans-serif;
}
.sidebar{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: #11101D;
  padding: 6px 14px;
  z-index: 99;
  /* transition: all 0.5s ease; */
}
.sidebar.open{
  width: 250px;
}
.sidebar .logo-details{
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-details .icon{
  opacity: 0;
  /* transition: all 0.5s ease; */
}
.sidebar .logo-details .logo_name{
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  /* transition: all 0.5s ease; */
}
.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name{
  opacity: 1;
}
.sidebar .logo-details #btn{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details #btn{
  text-align: right;
}
.sidebar i{
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}
.sidebar .nav-list{
  margin-top: 20px;
  height: 100%;
  overflow: auto;
}
.sidebar .nav-list::-webkit-scrollbar {
  width: 10px;
}
.sidebar .nav-list::-webkit-scrollbar-track {
  /* background: #ccc; */
  border-radius: 10px;
}
.sidebar .nav-list::-webkit-scrollbar-thumb {
  width: 5px;
  background: #cccc;
  border-radius: 5px;
}
.sidebar li{
  position: relative;
  margin: 8px 0;
  list-style: none;
}
.sidebar li .tooltip{
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}
.sidebar li:hover .tooltip{
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}
.sidebar.open li .tooltip{
  display: none;
}
.sidebar input{
  font-size: 15px;
  color: #FFF;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #1d1b31;
}
.sidebar.open input{
  padding: 0 20px 0 50px;
  width: 100%;
}
.sidebar .bx-search{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: #1d1b31;
  color: #FFF;
}
.sidebar.open .bx-search:hover{
  background: #1d1b31;
  color: #FFF;
}
.sidebar .bx-search:hover{
  background: #FFF;
  color: #11101d;
}
.sidebar li a{
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #11101D;
}
.sidebar li a:hover{
  background: #FFF;
}
.sidebar li a .links_name{
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name{
  opacity: 1;
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i{
  transition: all 0.5s ease;
  color: #11101D;
}
.sidebar li i{
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}
.sidebar li.profile{
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  background: #1d1b31;
  /* transition: all 0.5s ease; */
  overflow: hidden;
}
.sidebar.open li.profile{
  width: 250px;
}
.sidebar li .profile-details{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.sidebar li img{
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar li.profile{
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}
.sidebar li.profile .job{
  font-size: 12px;
}
.sidebar .profile #log_out{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #1d1b31;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  /* transition: all 0.5s ease; */
}
.sidebar.open .profile #log_out{
  width: 50px;
  background: none;
}
.home-section{
  position: relative;
  background: #E4E9F7;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}
.sidebar.open ~ .home-section{
  left: 250px;
  width: calc(100% - 250px);
}
.home-section .text{
  display: inline-block;
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px
}
@media (max-width: 420px) {
  .sidebar li .tooltip{
    display: none;
  }
}
.right {
  display: block;
  text-align: right;
}
.bxl-vuejs:hover {
  color: #42b883;
}

li.router-link-active, .router-link-exact-active span{
  color: yellow !important;
}

.router-link-active:hover, .router-link-exact-active:hover{
  color: #11101D !important;
}
</style>