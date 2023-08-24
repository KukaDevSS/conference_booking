<template>
  <div class="container-fluid">
    <div class="row">
      <div class=" col-lg-3">
        <div class="calendar-container fixed-top" style="height: 100vh; margin-top: 0px; background-color: beige;">
          <div class="d-flex pt-4">
            <router-link to="/"><button class="btn btn-warning"><i class="bi bi-arrow-left-circle me-1"></i>ໜ້າຫຼັກ</button></router-link>
            <p class="ms-4 fs-3 fw-bold text-center">ຫ້ອງປະຊຸມເບີ {{ roomNumber }}</p>
          </div>
          <div>
            <router-link to="/room1/bookform"><button class="btn btn-primary w-100 mt-5">ຈອງຫ້ອງປະຊຸມ</button></router-link>
            <div ref="calendar" class="w-100" style="margin-top: 43px;"></div>
            <button class="btn btn-warning mt-4 w-100" @click="setToDateNow">Today</button>
          </div>
        </div>
      </div>
      <div class="col-lg-9 mt-2" ref="cardContainer">
        <!-- <div class="border my-2 rounded"  :class="{ 'highlighted-card': isSameDate(date, new Date()), 'non-matching-card': !isSameDate(date, new Date()) }"  v-for="date in monthDates" :key="date"> -->
          <div class="border my-2 rounded" :class="{ 'highlighted-card': isSameDate(date, new Date()), 'non-matching-card': !isSameDate(date, new Date()) }" v-for="date in futureMonthDates" :key="date">
          <div class="d-flex align-items-center mb-3 mt-2">
            <p class="me-3 fw-bold ms-2 bg-warning text-center mt-3" style="font-size: 24px; height: 40px; width: 40px;border-radius: 5px;">{{ date.getDate() }}</p>
              <div class="d-flex">
                <p class="m-0 me-2">{{ date.toLocaleString('en-US', { weekday: 'long' }) }}</p>
                <p class="m-0">{{ date.toLocaleString('en-US', { month: 'long', year: 'numeric' }) }}</p>
              </div>
          </div>
          <div class="container">
            <table class="table table-bordered table-hover">
              <thead class="">
                <tr class="text-center" style="font-size: 14px;">
                  <th>ວັນ,ເດືອນ,ປີ</th>
                  <th>ເວລາເລີ່ມ - ເວລາສິ້ນສຸດ</th>
                  <th>ຫົວຂໍ້ການປະຊຸມ</th>
                  <th>ພະແນກ / ບໍລິສັດ</th>
                  <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                  <th>ເບີ້ໂທລະສັບ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center" v-for="event in apiData" :key="event.startTime">
                  <template v-if="isSameDate(event.date, date)">                 
                    <td>
                      {{ formatDate(event.date) }} <!-- Use the formatDate function to format the date -->
                    </td>
                    <td>
                      <span class="text-primary">{{ event.startTime }}</span> - <span class="text-danger">{{ event.endTime }}</span>
                    </td>
                    <td>{{ event.title }}</td>
                    <td>{{ event.department }}</td>        
                    <td>{{ event.name }} </td>
                    <td>{{ event.phone }}</td>
                    <td>
                      <button class="btn btn-danger me-2" @click="showDeleteConfirmation(event._id)"><i class="bi bi-trash3"></i></button>
                      <button class="btn btn-success"><i class="bi bi-pencil-square"></i></button>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import axios from 'axios';
import { format } from 'date-fns';
import Swal from 'sweetalert2';



export default {
  props: {
    roomNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      monthDates: [],
      selectedDate: new Date(),
      calendarInstance: null,
      apiData: [],
      eventToDelete: null,
    };
  },
  computed: {
    futureMonthDates() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    return this.monthDates.filter(date => {
      const filteredDate = new Date(date);
      filteredDate.setHours(0, 0, 0, 0);
      return filteredDate >= currentDate;
    });
  },
},

  mounted() {
    const calendarElement = this.$refs.calendar;
    this.calendarInstance = flatpickr(calendarElement, {
      dateFormat: 'Y-m-d',
      defaultDate: new Date(),
      onChange: (selectedDates) => {
        this.selectedDate = selectedDates[0];
        this.generateMonthDates();
        this.updateCardData();
      },
      onMonthChange: (selectedDates) => {
        this.selectedDate = selectedDates[0];
        this.generateMonthDates();
        this.updateCardData();
      },
      inline: true, // Show the calendar inline without an input field
    });
    this.generateMonthDates();
    this.fetchApiData();
  },
  methods: {
    showDeleteConfirmation(id) {
      Swal.fire({
        title: 'ເຈົ້າຕ້ອງການທີ່ຈະລຶບມັນ ຫຼື ບໍ່?',
        // text: '!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ຢືນຢັນ',
        cancelButtonText: 'ຍົກເລີກ',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEvent(id);
        }
      });
    },
    formatDate(date) {
      return format(new Date(date),'dd-MM-yyyy'); // Adjust the format string as needed
    },
    setToDateNow() {
      const now = new Date();
      this.selectedDate = now;
      this.calendarInstance.setDate(now);
      this.updateCardData(); // Scroll to the top of the card when selecting the "Today" button
    },
    generateMonthDates() {
      if (this.selectedDate) {
        const year = this.selectedDate.getFullYear();
        const month = this.selectedDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        this.monthDates = Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          return new Date(year, month, day);
        });
      }
    },
    // get data form api
    fetchApiData() {
      axios.get(`http://172.22.3.147:3000/booking/room/${this.roomNumber}/active`)
      .then((response) => {
        this.apiData = response.data;
      }).catch((err) => {
        console.error(err);
      });
      
      this.updateCardData();
    },
    // delete data form api
    deleteEvent(id) {
      fetch(`http://172.22.3.147:3000/booking/cancel/${id}`, {
        method: 'PUT'
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        location.reload();
      })
      .catch(error => {
        console.error('Error deleting events:', error);
      });
    },
    updateCardData() {
      if (this.selectedDate) {
        const dateString = this.selectedDate.toISOString().split('T')[0];
        const matchingData = this.apiData.filter(item => item.date === dateString);
        this.monthDates.forEach(date => {
          date.events = matchingData.filter(item => item.date === date.toISOString().split('T')[0]);
        });
      }
    },
    isSameDate(apiDate, cardDate) {
      const apiFormatted = new Date(apiDate).toLocaleDateString('en-US');
      const cardFormatted = cardDate.toLocaleDateString('en-US');
      
      return apiFormatted === cardFormatted;
    }
  },
};
</script>

<style>
*{
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.sidebar {
  width: 370px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.calendar-container {
  padding: 10px;
  width: 330px;
}
.content {
  padding: 0px;
}
.highlighted-card {
  background-color: rgb(254, 254, 171);
}
.non-matching-card {
  background-color: beige; /* You can adjust the color as needed */
}
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lobster&family=Noto+Sans+Lao&family=Noto+Serif+Lao:wght@900&family=Oswald:wght@700&family=Tapestry&display=swap');
*{
    font-family: 'Noto Sans Lao', sans-serif;
}
</style>
