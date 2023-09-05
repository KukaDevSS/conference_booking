<template>
  <div>
    <div class="container col-lg-6 shadow-lg rounded mt-5">
      <div class="py-4">
        <h1 class="text-center fw-bold">TT..TT</h1>
      </div>
      <form @submit.prevent="createRoom" action="" class="mx-4 pb-5">
        <div class="my-4">
          <label for="imageInput">Add image</label>
          <input id="imageInput" type="file" ref="imageInput" @change="handleImageChange" class="form-control">
        </div>
        <div class="mt-4">
          <label for="">ຊື່ຫ້ອງ</label>
          <input v-model="title_room" type="text" class="form-control">
        </div>
        <div class="mt-4">
          <label for="">ສະຖານທີ່</label>
          <input v-model="address" type="text" class="form-control">
        </div>
        <div class="mt-4">
          <label for="">ລາຍລະອຽດ</label>
          <input v-model="description" type="text" class="form-control">
        </div>
        <div class="mt-4">
          <button type="submit" class="btn btn-primary w-100">ແກ້ໄຂຫ້ອງ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style>

</style>