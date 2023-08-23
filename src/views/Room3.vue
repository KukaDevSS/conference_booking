<template>
  <div>
    <div>
        <div class="sidebar">
            <div class="calendar-container">
                <div ref="calendar"></div>
                <button class="btn btn-primary mt-4" style="display: block;" @click="setToDateNow">Set Date to Now</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';


export default {
    data() {
    return {
      selectedDate: null,
      calendarInstance: null,
    };
  },
  mounted() {
    const calendarElement = this.$refs.calendar;
    this.calendarInstance = flatpickr(calendarElement, {
      dateFormat: 'Y-m-d',
      defaultDate: new Date(),
      onClose: (selectedDates) => {
        this.selectedDate = selectedDates[0];
      },
      inline: true, // Show the calendar inline without an input field
    });
  },
  methods: {
    setToDateNow() {
      const now = new Date();
      this.selectedDate = now;
      this.calendarInstance.setDate(now);
    },
  },
}
</script>

<style>
.sidebar {
  width: 370px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.calendar-container {
  padding: 10px;
}
</style>