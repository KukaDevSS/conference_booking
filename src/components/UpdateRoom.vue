<template>
  <div>
    <div class="container col-lg-6 shadow-lg rounded mt-5">
      <div class="py-4">
        <h1 class="text-center fw-bold">ແກ້ໄຂ</h1>
      </div>
      <form @submit.prevent="UpdateRoom" action="" class="mx-4 pb-5" enctype="multipart/form-data">
        <div class="my-4">
          <label for="imageInput">ເລືອກຮູບພາບ</label>
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
          <textarea v-model="description" type="text" class="form-control"></textarea>
        </div>
        <div class="mt-4 text-center">
          <router-link to="/table"><button class="btn btn-danger col-lg-5 me-4">ຍົກເລີກ</button></router-link>
          <button type="submit" class="btn btn-primary col-lg-5">ແກ້ໄຂຫ້ອງ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { IP_api } from '../../API_config';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            title_room: '',
            address: '',
            description: '',
            selectedImage: null,
        }
    },
    created() {
      this.roomId = this.$route.params.id; // Get the booking ID from the route
      this.roomNumber = this.$route.params.roomNumber; // Get the booking ID from the route
      // this.UpdateRoom(); 
      this.fetchRoomData();
    },
    methods: {
      handleImageChange(event) {
        this.selectedImage = event.target.files[0];
      },
      async fetchRoomData() {
          try {
            const response = await fetch(`${IP_api}/rooms/${this.roomId}`);
            const data = await response.json();

            // Populate form fields with fetched data
            this.title_room = data.title_room
            this.address = data.address
            this.description = data.description
            // ... other fields
          } catch (error) {
            console.error('Error fetching booking data:', error);
          }
        },
      async UpdateRoom() {
        const formData = new FormData();
        formData.append('title_room', this.title_room);
        formData.append('address', this.address);
        formData.append('description', this.description);
        formData.append('image', this.selectedImage);

        try {
          const response = await fetch(`${IP_api}/rooms/update/${this.roomNumber}`, {
            method: 'PUT',
            body: formData, // Use FormData to send the data
          });

          if (response.status === 200) {
            Swal.fire({
              title: 'ແກ້ຫ້ອງສຳເລັດ',
              icon: 'success',
              confirmButtonText: 'ຕົກລົງ', // Change the text of the "OK" button
            }).then(() => {
              // Redirect back to the list or wherever needed
              this.$router.push({ name: 'table' });
            });
          } else if (response.status === 409) {
            Swal.fire('ການແກ້ໄຂບໍ່ຖືກຕ້ອງ', '', 'error');
          } else {
            Swal.fire('An error occurred', '', 'error');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
}
</script>

<style>

</style>