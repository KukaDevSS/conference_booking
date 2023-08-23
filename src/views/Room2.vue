<template>
  <div>
    <div>
        <div class="sidebar">
            <div class="calendar-container">
                 <div ref="calendar"></div>
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