<template>
  <div class="room-card bg-light shadow-lg rounded p-3">
    <div class="d-flex justify-content-between">
      <div class="w-50">
        <img
          class="rounded shadow"
          style="width: 300px; height: 230px;"
          :src="image"
          alt="Room Image"
        />
      </div>
      <div class="flex-grow-1 ms-3">
        <div class="d-flex flex-column justify-content-between h-100">
          <div>
            <p class="fw-bold text-center">{{ roomTitle }}</p>
            <div class="d-flex justify-content-around">
              <p><i class="bi bi-people me-1" style="color: rgb(88, 215, 19);"></i> 20 ທີ່ນັ່ງ</p>
              <p><i class="bi bi-geo-alt" style="color: rgb(88, 215, 19);"></i> {{ address }}</p>
            </div>
            <div class="text-center mt-3">
              <p class="m-0">{{ truncatedDescription }}</p>
              <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, doloribus. Lorem ipsum dolor sit</p> -->
            </div>
          </div>
          <div class="text-center mt-3">
            <router-link :to="`/room/${roomNumber}`">
              <button class="btn btn-warning text-white">ເບິ່ງການຈອງ</button>
            </router-link>
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
    description: String,
    address: String,
    roomNumber: Number,
  },

  computed: {
    // truncatedDescription() {
    //   const words = this.description.split(' ');
    //   if (words.length <= 18) {
    //     return this.description;
    //   }
    //   const truncatedWords = words.slice(0, 18);
    //   return `${truncatedWords.join(' ')} ...`;
    // },
    truncatedDescription() {
      const maxLength = 80; // Set your desired character limit
      if (this.description.length <= maxLength) {
        return this.description;
      }
      const truncatedText = this.description.substring(0, maxLength);
      return `${truncatedText} ...`;
    },
  },
}
</script>

<style>
.room-card {
  margin-top: 1.5rem;
  padding: 1.5rem;
}

.truncated-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>