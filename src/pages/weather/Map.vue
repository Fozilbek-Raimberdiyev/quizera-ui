<template>
    <div>
        <l-map style="height: 85vh" :zoom="zoom" :center="center" :zoomAnimation="false">
      <l-tile-layer  :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :draggable="true" :lat-lng="markerLatLng" @update:latLng="changeLocation"></l-marker>
    </l-map>
    <el-button @click="getWeather" v-if="isDragged" >Ob-havo olish</el-button>
    </div>
  </template>
  
  <script>
//   import {LMap, LTileLayer, LMarker} from '@vue-leaflet/vue-leaflet';
import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet"
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useToast } from "vue-toastification";
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker
    },
    data () {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 7,
        center: [37.22159644432001, 69.27971635812385],
        markerLatLng: [37.239099275357816, 67.31285121880997],
        isDragged : false,
        data : []
      };
    },
    setup() {
      const toast = useToast()
      return {toast}
    },
    methods : {
        changeLocation (l) {
            this.markerLatLng = [l.lat, l.lng];
            this.isDragged = true
        },
        async getWeather () {
            const apiKey = "d9daa8d577481e637de0095617331c6d";
            try{
              let res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${this.markerLatLng[0]}&lon=${this.markerLatLng[1]}&exclude=hourly,daily&appid=${apiKey}`)
            this.data = res;
            }
            catch(e) {
              // this.toast.error(e?.message)
            }
        }
    }
  }
  </script>
  