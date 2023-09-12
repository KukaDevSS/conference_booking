<template>
  <!-- <p class="text-center text-uppercase fw-bold">Home</p> -->
  <div>
    <div class="py-1 d-flex ps-5 fixed-top justify-content-between align-items-center" style="background-color: #59c1bd;">
      <div class="d-flex">
        <img style="height: 45px;" src="../assets/SXR.png" alt="">
        <p class="text-white m-0 text-uppercase ps-1" style="font-size: 14px;padding-top: 11px;font-weight: 700;">SOKXAY GROUP</p>    
      </div>
      <router-link to="/login"><button class="btn btn-outline-light text-black me-5" style=" btn-outline-light:hover{}"><i class="bi bi-box-arrow-in-right pe-2"></i>ເຂົ້າສູ່ລະບົບ</button></router-link>
    </div>
  </div>
  <p class="mt-5"></p>
  <div class="container mx-auto mt-5">
  <div class="row">
    <div class="col-md-6">
      <div class="pb-4 pt-1 ps-2 rounded my-3 mb-5">
        <Roomcard
          v-for="(room, index) in rooms.slice(0, Math.ceil(rooms.length / 2))"
          :key="index"
          :roomTitle="room.title_room"
          :image='getCompleteImageUrl(room.image)'
          :address="room.address"
          :description="room.description"
          :roomNumber="room.roomNumber"
        />
      </div>
    </div>
    <div class="col-md-6">
      <div class=" pb-4 pt-1 ps-2 rounded my-3 mb-5">
        <Roomcard
          v-for="(room, index) in rooms.slice(Math.ceil(rooms.length / 2))"
          :key="index"
          :roomTitle="room.title_room"
          :image='getCompleteImageUrl(room.image)'
          :address="room.address"
          :description="room.description"
  
          :roomNumber="room.roomNumber"
        />
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Roomcard from'../components/RoomCard.vue'
import axios from 'axios';
import { IP_api } from '../../API_config';


export default {
  components:{
    Roomcard,
  },
  data() {
    return {
      rooms:[],
      // rooms:[
      //   { title: 'ຫ້ອງປະຊຸມ A',address:'Thatluang' ,image: 'https://cdn.pixabay.com/photo/2015/07/02/09/52/meeting-room-828547_640.jpg',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloribus?Excepturi, doloribus?Excepturi,' },
      //   { title: 'ຫ້ອງປະຊຸມ B',address:'Thatluang' , image: 'https://cdn.pixabay.com/photo/2016/10/16/10/30/office-space-1744803_640.jpg',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloribus?' },
      //   { title: 'ຫ້ອງປະຊຸມ C',address:'Thatluang' , image: 'https://cdn.pixabay.com/photo/2017/03/31/21/37/room-2192484_640.jpg',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloribus?' },
      //   { title: 'ຫ້ອງປະຊຸມ E',address:'Thatluang' , image: 'https://cdn.pixabay.com/photo/2017/07/24/07/59/conference-2533871_640.jpg',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloribus?' },
      //   { title: 'ຫ້ອງປະຊຸມ F',address:'Thatluang' , image: 'https://cdn.pixabay.com/photo/2016/12/06/09/37/conference-1886021_640.jpg',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloribus?' },
      //   { title: 'ຫ້ອງປະຊຸມ G',address:'Thatluang' , image: 'https://cdn.pixabay.com/photo/2019/10/21/10/34/meeting-4565703_640.jpg',description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloribus?' }
      // ]
    }
  },
  mounted() {
    this.getRoomCard();
  },
  
  methods: {
    getCompleteImageUrl(relativeUrl) {
      // const baseUrl = 'http://172.22.4.41:3000';
      return `${IP_api}${relativeUrl}`;
    },
    getRoomCard(){
      axios.get(`${IP_api}/rooms/status/open`)
      .then((response) => {
        this.rooms = response.data
      }).catch((err) => {
        console.error(err);
      });
    }
  },
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap');
.hover-button:hover{
  background-color: #0d4c92;
}
</style>





