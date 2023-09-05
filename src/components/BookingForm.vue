<template>
    <div>
      <div class="container w-100 vh-100 my-auto d-flex align-items-center">
        <form @submit.prevent="createBooking" action="" class="w-50 mx-auto py-2 px-5 bg-light shadow-lg">
          <div class="my-2">
              <label for="">ຫົວຂໍ້ການປະຊຸມ{{ roomNumber }}</label>
              <input v-model="bookTitle" type="text" class="form-control">
          </div>
          <div class="row">
            <div class="my-4 col-lg-6">
                <label for="">ວັນ, ເດືອນ , ປີ</label>
                <input class="form-control" type="date" v-model="bookDate" :min="minDate"  required placeholder="ວ.ດ.ປ"/>
            </div>
            <div class="my-4 col-lg-6">
              <label for="">ຫ້ອງປະຊຸມ</label>
              <div v-for="room in Rooms" :key="room._id">
                <input
                  v-if="room.roomNumber.toString().includes(roomNumber.toString())"
                  v-model="room.title_room"
                  type="text"
                  class="form-control"
                  disabled
                >
              </div>
            </div>
        </div>
          <div class="row my-4">
              <div class="col-6">
                  <div class="d-flex">
                    <label class="me-5" for="timeInput">ເວລາເລີ່ມ</label>
                  </div>
                  <select id="startTimeInput" class="form-select" v-model="bookTimeS">
                    <option v-for="timeOption in startTimes" :key="timeOption" :value="timeOption">{{ timeOption }}</option>
                  </select>
                  
              </div>         
              <div class="col-6">
                  <div class="d-flex">
                    <label class="me-5" for="timeInput">ເວລາສິ້ນສຸດ</label>
                  </div>
                  <select id="endTimeInput" class="form-select" v-model="bookTimeE">
                    <option v-for="timeOption in endTimes" :key="timeOption" :value="timeOption">{{ timeOption }}</option>
                  </select>
                 
              </div>
        </div>
        <div class="mt-4">
            <label for="">ພະແນກ ຫຼື ບໍລິສັດ</label>
            <input v-model="bookDP" type="text" class="form-control">
        </div>
          <div class="my-4">
              <label for="">ຊື່ ແລະ ນາມສະກຸນ</label>
              <input v-model="bookName" type="text" class="form-control" required>
          </div>
          <div class="my-4">
              <label for="">ເບີໂທລະສັບ</label>
              <input v-model="bookPhone" type="text" class="form-control" required>
          </div>
          <div class="row justify-content-center">
            <div class="my-2 col-6">
                <button @click="goBackAndReload" type="button" class="btn btn-danger w-100">ຍົກເລີກ</button>
            </div>
            <div class="mt-2 col-6">
              <button type="submit" class="btn btn-primary w-100">Submit</button>
            </div>
          </div>
      </form>
    </div>
    </div>
  </template>
<script>
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';
import { IP_api } from '../../API_config';

export default {
  props:{
    roomNumber: {
      type: Number,
      required: true
    }
  },
    data() {
        return {
            // roomNumber: null, 
            Rooms:[],
            // 
            bookTitle: '',
            bookDate: '',
            bookTimeS: '',
            bookTimeE: '',
            bookDP: '',
            bookName: '',
            bookPhone: '',
            bookRoom: this.roomNumber,
            // 
        }
    },
    created() {
      console.log('roomNumber prop:', this.roomNumber);
    },
    computed: {
    minDate() {
        const today = new Date().toISOString().split("T")[0];
        return today;
    },
    startTimes() {
        return this.generateTimeOptions(8, 20, 30);
    },
    endTimes() {
        return this.generateTimeOptions(8, 20, 30);
        },
    },
    mounted() {
        this.fetchRooms();
        console.log(this.roomNumber);
        console.log('Rooms:', this.Rooms);
        console.log('roomNumber:', this.roomNumber);
    },
    methods: {
    async createBooking(){
        const formData = {
            title: this.bookTitle,
            date: this.bookDate,
            startTime: this.bookTimeS,
            endTime: this.bookTimeE,
            department: this.bookDP,
            name: this.bookName,
            phone: this.bookPhone,
            roomNumber: this.bookRoom,
        }
        try {
        const response = await fetch(`${IP_api}/booking/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.status === 201) {
          Swal.fire('ການຈອງຂອງທ່ານສຳເລັດ', '', 'success').then(() => {
          // setTimeout(() => {
             
            
          // }, 1000);
          window.history.back(); 
          window.location.reload();
         });
         await new Promise(resolve => setTimeout(resolve, 1000));
          window.history.back();
        } else if (response.status === 409) {
          Swal.fire('ຫ້ອງປະຊຸມບໍ່ຫວ່າງ', 'ກະລຸນາປ່ຽນເວລາຂອງທ່ານ', 'error');
        } else {
          Swal.fire('An error occurred', '', 'error');
        }
        } catch (error) {
            
        }
    },
    generateTimeOptions(startHour, endHour, interval) {
      const options = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'ເຊົ້າ' : 'ແລງ'}`;
          options.push(time);
        }
      }
      return options;
    },
    async fetchRooms() {
      try {
        const response = await fetch(`${IP_api}/rooms`);
        if (response.ok) {
          const data = await response.json();
          this.Rooms = data; // Store the fetched rooms data in the 'rooms' data property
          console.log(this.Rooms); // Print the fetched rooms data to the console
        } else {
          console.error('Error fetching rooms data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    },
    goBackAndReload() {
      window.history.back();
      
      // Set a delay before reloading the page
      // setTimeout(() => {
      //   location.reload();
      // }, 300);
    }
  },
}
</script>

<style>

</style>