<template>
  <!-- <p class="text-center text-uppercase fw-bold">Home</p> -->
  <div>
    <div class="bg-primary py-2 d-flex ps-5 fixed-top justify-content-between align-items-center">
      <div>
        <p class="text-white fw-bold m-0" style="font-size: 18px;">conference booking</p>    
      </div>
      <button class="btn btn-warning me-5" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">ເຂົ້າສູ່ລະບົບ</button>
    </div>
  </div>
  <div class="container mx-auto mt-5">
  <div class="row">
    <div class="col-md-6">
      <div class="pb-4 pt-1 ps-2 rounded my-3 mb-5">
        <Roomcard
          v-for="(room, index) in rooms.slice(0, Math.ceil(rooms.length / 2))"
          :key="index"
          :roomTitle="room.title"
          :image="room.image"
          :roomNumber="index + 1"
        />
      </div>
    </div>
    <div class="col-md-6">
      <div class=" pb-4 pt-1 ps-2 rounded my-3 mb-5">
        <Roomcard
          v-for="(room, index) in rooms.slice(Math.ceil(rooms.length / 2))"
          :key="index"
          :roomTitle="room.title"
          :image="room.image"
          :roomNumber="index + Math.ceil(rooms.length / 2) + 1"
        />
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Roomcard from'../components/RoomCard.vue'
export default {
  components:{
    Roomcard,
  },
  data() {
    return {
      rooms:[
        { title: 'Room A', image: 'https://cdn.pixabay.com/photo/2015/07/02/09/52/meeting-room-828547_640.jpg' },
        { title: 'Room B', image: 'https://cdn.pixabay.com/photo/2016/10/16/10/30/office-space-1744803_640.jpg' },
        { title: 'Room C', image: 'https://cdn.pixabay.com/photo/2017/03/31/21/37/room-2192484_640.jpg' },
        { title: 'Room E', image: 'https://cdn.pixabay.com/photo/2017/07/24/07/59/conference-2533871_640.jpg' },
        { title: 'Room F', image: 'https://cdn.pixabay.com/photo/2016/12/06/09/37/conference-1886021_640.jpg' },
        { title: 'Room G', image: 'https://cdn.pixabay.com/photo/2019/10/21/10/34/meeting-4565703_640.jpg' },
      ]
    }
  },
  
  // methods: {
  //   navigateToBookForm() {
  //     this.$router.push({ name: 'bookform' });
  //   },
  // },
}
</script>

<style>

</style>





