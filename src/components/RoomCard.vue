<template>
  <div class="room-card mt-3 bg-light shadow-lg me-2 rounded">
    <div class="col-lg rounded ms-2" style="height: 250px">
      <div class="d-flex justify-content-around">
        <div class="mt-2 me-2">
          <img
            style="width: 300px; height: 200px"
            class="rounded d-flex"
            :src="image"
            alt=""
          />
          <!-- :src="image" -->
        </div>
        <div class="flex-row ms-2 mt-2">
          <p class="fw-bold text-center mt-1">{{ roomTitle }}</p>
          <div class="d-flex justify-content-around">
            <p><i class="bi bi-people me-1" style="color: rgb(88, 215, 19);"></i> 20 seats</p>
            <p><i class="bi bi-geo-alt" style="color: rgb(88, 215, 19);"></i> location</p>
          </div>
          <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aliquid.</p>
          <div class="text-center">
            <!-- <button class="btn btn-warning text-white me-1">View And Book</button> -->
            <!-- <router-link to="/room" class="btn btn-warning text-white me-1">View And Book</router-link> -->
            <router-link :to="`/room/${roomNumber}`">
              <button class="btn btn-warning text-white me-1">View And Book</button>
            </router-link>
            <!-- <router-link to="/room"><button @click="viewAndBook" class="btn btn-warning text-white me-1">View And Book</button></router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
    roomTitle: String,
    image: String,
    roomNumber: Number,
  },
}
</script>

<style>

</style>