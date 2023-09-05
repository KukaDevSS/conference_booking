<template>
  <div>
    <div class="container w-100 vh-100 my-auto d-flex align-items-center">
      <!-- Form content -->
      <form @submit.prevent="updateBooking" action="" class="w-50 mx-auto py-2 px-5 bg-light shadow-lg">
        <div>
            <p class="text-center text-primary fw-bold">Booking Form.</p>
        </div>
        <div class="my-2">
            <label for="">ຫົວຂໍ້ການປະຊຸມ</label>
            <input v-model="bookTitle" type="text" class="form-control" disabled>
        </div>
        <div class="row my-4">
            <div class="col-6">
                <div class="d-flex">
                  <label class="me-5" for="timeInput">ເວລາເລີ່ມ</label>
                  <!-- <p class="text-danger fw-bold ">{{ bookTimeS }}</p> -->
                </div>
                <select id="timeInput" class="form-control" v-model="bookTimeS">
                <option v-for="timeOption in formattedTimeOptions" :key="timeOption.value" :value="timeOption.value">{{ timeOption.label }}</option>
                </select>
                
            </div>         
            <div class="col-6">
                <div class="d-flex">
                  <label class="me-5" for="timeInput">ເວລາສິ້ນສຸດ</label>
                  <!-- <p class="text-danger fw-bold">{{ bookTimeE }}</p> -->
                </div>
                <select id="timeInput" class="form-control" v-model="bookTimeE">
                <option v-for="timeOption in formattedTimeOptions" :key="timeOption.value" :value="timeOption.value">{{ timeOption.label }}</option>
                </select>
               
            </div>
      </div>
        <div class="my-4">
            <label for="">ພະແນກ ຫຼື ບໍລິສັດ</label>
            <input v-model="bookDP" type="text" class="form-control" required disabled>
        </div>
        <div class="my-4">
            <label for="">ຊື່ ແລະ ນາມສະກຸນ</label>
            <input v-model="bookName" type="text" class="form-control" required disabled>
        </div>
        <div class="my-4">
            <label for="">ເບີໂທລະສັບ</label>
            <input v-model="bookPhone" type="text" class="form-control" required disabled>
        </div>
        <div class="row justify-content-center">
          <div class="my-2 col-6">
              <button @click="goBackAndReload" type="button" class="btn btn-danger w-100">ຍົກເລີກ</button>
          </div>
          <div class="mt-2 col-6">
            <button type="submit" class="btn btn-primary w-100">ແກ້ໄຂ</button>
          </div>
        </div>
    </form>
  </div>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';
import { IP_api } from '../../API_config';

export default {
  data() {
    return {
      Rooms:'',
      bookId: null, // Capture the booking ID from the route
      // Your other data properties
      bookTitle:'',
      bookDate: '',
      rooms: '',
      bookTimeS: '',
      bookTimeE: '',
      bookDP: '',
      bookName: '',
      bookPhone: '',
      // 
      timeOptions: [],
            startTime: 8 * 60, // 8:00 AM in minutes
            endTime: 20 * 60, // 8:00 PM in minutes
            increment: 30, // 30 minutes
            hoursAM: Array.from({ length: 4 }, (_, i) => i + 8), // Array of hours from 8 to 11
            hoursPM: Array.from({ length: 9 }, (_, i) => i + 12), // Array of hours from 12 to 20
            minutes: ['00', '30'], // Minutes options
            meridiem: ['ເຊົ້າ', 'ແລງ'], // AM/PM options
      // 
    };
  },
  created() {
    this.bookId = this.$route.params.id; // Get the booking ID from the route
    this.fetchBookingData(); 
  },
  // mounted() {
  //   const dateInput = this.$refs.dateInput;

  //   flatpickr(dateInput, {
  //      dateFormat: 'Y-m-d', // Change the format as needed
  //    });
  //  },
  computed: {
    minDate() {
        const today = new Date().toISOString().split("T")[0];
        return today;
    },
    formattedTimeOptions() {
      const options = [];
      for (const hour of this.hoursAM) {
        for (const minute of this.minutes) {
          const formattedTime = `${hour.toString().padStart(2, '0')}:${minute} ${this.meridiem[0]}`;
          options.push({ value: formattedTime, label: formattedTime });
        }
      }
      for (const hour of this.hoursPM) {
        for (const minute of this.minutes) {
          const formattedTime = `${hour.toString().padStart(2, '0')}:${minute} ${this.meridiem[1]}`;
          options.push({ value: formattedTime, label: formattedTime });
        }
      }
      return options;
    },
  },
  // created() {
  //   this.fetchRooms();
  // },
  methods: {
    // 
    async fetchBookingData() {
      try {
        const response = await fetch(`${IP_api}/booking/${this.bookId}`);
        const data = await response.json();

        // Populate form fields with fetched data
        this.bookTitle = data.title;
        this.bookDate = data.date;
        this.rooms = data.roomNumber;
        this.bookTimeS = data.startTime;
        this.bookTimeE = data.endTime;
        this.bookDP = data.department;
        this.bookName = data.name;
        this.bookPhone = data.phone;
        // ... other fields
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    },
    async updateBooking() {
      const formData = {
        title: this.bookTitle,
        date: this.bookDate,
        roomNumber: this.rooms,
        startTime: this.bookTimeS,
        endTime: this.bookTimeE,
        department: this.bookDP,
        name: this.bookName,
        phone: this.bookPhone
        // ... other fields
      };

      try {
        const response = await fetch(`${IP_api}/booking/update/${this.bookId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          Swal.fire('Booking updated successfully', '', 'success').then(() => {
            // Redirect back to the list or wherever needed
            this.$router.push({ name: 'all' });
          });
        } else if(response.status === 409) {
          Swal.fire(' ຫ້ອງປະຊຸມບໍ່ຫວ່າງ', '', 'error')
        }
        else {
          Swal.fire('An error occurred', '', 'error');
        }
      } catch (error) {
        console.error('Error updating booking:', error);
      }
    },
    // Other methods
    goBackAndReload() {
      window.history.back();
      
      // Set a delay before reloading the page
      setTimeout(() => {
        // location.reload();
      }, 300);
    }
  },
};
</script>

<style>
/* Your styles */
</style>
