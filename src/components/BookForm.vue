<template>
  <div class="container vh-100 my-auto d-flex align-items-center">
    <form @submit.prevent="submitForm" action="" class="w-50 mx-auto py-2 px-5 bg-light shadow-lg">
        <div>
            <p class="text-center text-primary fw-bold">Booking Form.</p>
        </div>
        <div class="my-2">
            <label for="">ຫົວຂໍ້ການປະຊຸມ</label>
            <input v-model="bookTitle" type="text" class="form-control">
        </div>
        <div class="row">
            <div class="my-4 col-lg-6">
                <label for="">ວັນ, ເດືອນ , ປີ</label>
                <input class="form-control" type="date" v-model="bookDate" :min="minDate"  required placeholder="ວ.ດ.ປ"/>
                <!-- <input v-model="bookDate" type="date" class="form-control" required placeholder="ວ.ດ.ປ"> -->
            </div>
            <div class="my-4 col-lg-6">
                <label for="">ຫ້ອງປະຊຸມ</label>
                <select v-model="rooms" class="form-select form-select-lg" required style="font-size: 16px;" aria-label="Default select example">
                    <option value="1">Room1</option>
                    <option value="2">Room2</option>
                    <option value="3">Room3</option>
                    <option value="4">Room4</option>
                </select>
            </div>
        </div>
        <div class="row my-4">
            <div class="col-6">
                <label for="timeInput">ເວລາເລີ່ມ</label>
                <select id="timeInput" class="form-control" v-model="bookTimeS">
                <option v-for="timeOption in formattedTimeOptions" :key="timeOption.value" :value="timeOption.value">{{ timeOption.label }}</option>
                </select>
            </div>
            <div class="col-6">
                <label for="timeInput">ເວລາສິ້ນສຸດ</label>
                <select id="timeInput" class="form-control" v-model="bookTimeE">
                <option v-for="timeOption in formattedTimeOptions" :key="timeOption.value" :value="timeOption.value">{{ timeOption.label }}</option>
                </select>
            </div>
      </div>
        <div class="mt-4">
            <label for="">ພະແນກ ຫຼື ບໍລິສັດ</label>
            <select v-model="bookDP" class="form-select form-select-lg" required style="font-size: 16px;" aria-label="Default select example">
                <option value="SIT1">SIT1</option>
                <option value="SIT2">SIT2</option>
                <option value="SIT3">SIT3</option>
                <option value="SIT4">SIT4</option>
            </select>
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
            <button type="submit" class="btn btn-primary w-100">ສ້າງການຈອງ</button>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            rooms: '',
            bookTitle: '',
            bookDate: '',
            bookTimeS: '',
            bookTimeE: '',
            bookDP: '',
            bookName: '',
            bookPhone: '',
            timeOptions: [],
            startTime: 8 * 60, // 8:00 AM in minutes
            endTime: 20 * 60, // 8:00 PM in minutes
            increment: 30, // 30 minutes
            hoursAM: Array.from({ length: 4 }, (_, i) => i + 8), // Array of hours from 8 to 11
            hoursPM: Array.from({ length: 9 }, (_, i) => i + 12), // Array of hours from 12 to 20
            minutes: ['00', '30'], // Minutes options
            meridiem: ['ເຊົ້າ', 'ແລງ'], // AM/PM options
        }
    },
  mounted() {
        const dateInput = this.$refs.dateInput;
        flatpickr(dateInput, {
        dateFormat: 'Y-m-d', // Change the format as needed
    });
  },
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
  methods: {
    async submitForm() {
      const formData = {
        title: this.bookTitle,
        date: this.bookDate,
        startTime: this.bookTimeS,
        endTime: this.bookTimeE,
        department: this.bookDP,
        name: this.bookName,
        phone: this.bookPhone,
        roomNumber: this.rooms
      };

      try {
        const response = await fetch('http://172.22.3.147:3000/booking/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          Swal.fire('ການຈອງຂອງທ່ານສຳເລັດ', '', 'success').then(() => {
          setTimeout(() => {
            window.history.back(); // Redirect to the previous page
            window.location.reload(); // Refresh the page
          }, 1000); // Delay for 3000 milliseconds (3 seconds)
         });
          await new Promise(resolve => setTimeout(resolve, 1000));
          window.history.back(); // Redirect to the previous page
        //   this.resetForm();
        } else if (response.status === 409) {
          Swal.fire('ຫ້ອງປະຊຸມບໍ່ຫວ່າງ', 'ກະລຸນາປ່ຽນເວລາຂອງທ່ານ', 'error');
        } else {
          Swal.fire('An error occurred', '', 'error');
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    },
    goBackAndReload() {
      window.history.back();
      
      // Set a delay before reloading the page
      setTimeout(() => {
        location.reload();
      }, 300);
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lobster&family=Noto+Sans+Lao&family=Noto+Serif+Lao:wght@900&family=Oswald:wght@700&family=Tapestry&display=swap');
*{
    font-family: 'Noto Sans Lao', sans-serif;
}
</style>