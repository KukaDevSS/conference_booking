<template>
  <div class="container">
    <router-link to="/add-room"><button class="btn btn-primary mt-4"><i class="bi bi-plus-circle-fill me-2"></i>ເພີ່ມຫ້ອງ</button></router-link>
    <table class="table table-bordered text-center mt-4">
      <thead>
        <tr>
              <th class="">ລຳດັບ</th>
              <th>ຮູບ</th>
              <th>ຊື່ຫ້ອງ</th>
              <th>ສະຖານທີ່</th>
              <th>ລາຍລະອຽດ</th>
              <th>ສະຖານະ</th>
              <th>ແກ້ໄຂ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in rooms" :key="room.roomNumber">
          <td>{{ room.roomNumber }}</td>
          <td>
            <img :src="getCompleteImageUrl(room.image)" alt="" style="width: 160px; height: 100px;">
          </td>
          <td>{{ room.title_room }}</td>
          <td>{{ room.address }}</td>
          <td class="w-50">{{ room.description }}</td>
          <td class="" style="width: 75px;">
            <label class="toggle-switch">
              <input
                type="checkbox"
                class="room-toggle"
                :data-room-number="room.roomNumber"
                @change="toggleRoom(room.roomNumber)"
                :checked="room.status === 'Open'"
              />
              <span class="slider"></span>
            </label>
            <!-- <span class="status-text">{{ room.status }}</span> -->
          </td>
          <td>
              <div class="dropdown" style="padding-top: 10px;">
                  <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">     
                     <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <router-link to="/updateroom"><li><a class="dropdown-item" href="#"><i class="bi bi-pencil-fill text-warning"></i> ແກ້ໄຂ</a></li></router-link>
                  </ul>
              </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div id="response">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script>
import { IP_api } from '../../API_config';
export default {
  data() {
    return {
      rooms: [],
      responseMessage: "",
    };
  },
  methods: {
    getCompleteImageUrl(relativeUrl) {
      // const baseUrl = 'http://172.22.4.41:3000'; 
      return `${IP_api}${relativeUrl}`;
    },
    async fetchRooms() {
      try {
        const response = await fetch(`${IP_api}/rooms`);
        const rooms = await response.json();
        this.rooms = rooms.map((room) => ({
          ...room,
          status: this.isOpen(room.roomNumber) ? "Open" : "Closed",
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async toggleRoom(roomNumber) {
      const isChecked = this.isOpen(roomNumber);
      const action = isChecked ? "0" : "1";

      try {
        const response = await fetch(
          `${IP_api}/rooms/${action}/${roomNumber}`,
          {
            method: "PUT",
          }
        );

        const data = await response.json();
        this.responseMessage = data.message;

        // Update the status text based on the toggle
        const roomIndex = this.rooms.findIndex(
          (room) => room.roomNumber === roomNumber
        );
        if (roomIndex !== -1) {
          this.rooms[roomIndex].status = action === "1" ? "Open" : "Closed";
        }

        // Store the state in localStorage
        localStorage.setItem(`room_${roomNumber}`, action);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    isOpen(roomNumber) {
      return localStorage.getItem(`room_${roomNumber}`) === "1";
    },
  },
  created() {
    // Call the fetchRooms function to load rooms when the component is created
    this.fetchRooms();
  },
};
</script>

<style scoped>
/* Your CSS styles here */
</style>