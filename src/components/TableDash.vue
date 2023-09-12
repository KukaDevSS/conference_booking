<template>
  <div class="container bg-white mt-4">
    <router-link to="/add-room"><button class="btn text-white" style="background-color: #0d4c92;"><i class="bi bi-plus-circle bg-transparent text-white me-1"></i>ສ້າງຫ້ອງ</button></router-link>
    <table class="text-center mt-4 w-100" style="border: 1px solid gainsboro;">
      <thead class="" style="border: 1px solid gainsboro;">
        <tr class="" style="border: 1px solid gainsboro;">
          <th style="border: 1px solid gainsboro;" class=" py-2 px-2">ລຳດັບ</th>
          <th style="border: 1px solid gainsboro;" class="">ຮູບ</th>
          <th style="border: 1px solid gainsboro;" class="">ຊື່ຫ້ອງ</th>
          <th style="border: 1px solid gainsboro;" class="">ສະຖານທີ່</th>
          <th style="border: 1px solid gainsboro;" class="">ລາຍລະອຽດ</th>
          <th style="border: 1px solid gainsboro;" class="">ສະຖານະ</th>
          <th style="border: 1px solid gainsboro;" class="">ແກ້ໄຂ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(room,index) in displayedBookAll" :key="room.roomNumber">
          <td style="border: 1px solid gainsboro;" class="" >{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
          <td style="border: 1px solid gainsboro;" class="">
            <img :src="getCompleteImageUrl(room.image)" alt="" style="width: 160px; height: 100px;">
          </td>
          <td style="border: 1px solid gainsboro;"  class="">{{ room.title_room }}</td>
          <td style="border: 1px solid gainsboro;" class="">{{ room.address }}</td>
          <td class="" style="width: 300px;border: 1px solid gainsboro">{{ room.description }}</td>
          <td class="" style="width: 75px; height: 150px;border: 1px solid gainsboro">
            <label class="toggle-switch bg-light">
              <input
                type="checkbox"
                class="room-toggle form-check-input form-check-lg"
                :data-room-number="room.roomNumber"
                @change="toggleRoom(room.roomNumber)"
                :checked="room.status === 'Open'"
              />
              <span class="slider"></span>
            </label>
            <!-- <span class="status-text">{{ room.status }}</span> -->
          </td>
          <td style="border: 1px solid gainsboro;" class="">
              <div class="dropdown d-flex align-items-center ms-1" style="padding-top: 0px; height: 130px;">
                  <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">     
                     <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <router-link :to="{name:'updateroom',params:{id: room._id, roomNumber: room.roomNumber}}"><li><a class="dropdown-item"><i class="bi bi-pencil-fill text-warning"></i> ແກ້ໄຂ</a></li></router-link>
                    <button @click="deleteRoom(room.roomNumber)" class="dropdown-item" type="button">
                      <i class="bi bi-trash-fill text-danger"></i> ລຶບ
                    </button> 
                  </ul>
              </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="previousPage" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
            <button style="" class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="nextPage" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- <div id="response">
      <p>{{ responseMessage }}</p>
    </div> -->
  </div>
</template>

<script>
import { IP_api } from '../../API_config';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      rooms: [],
      responseMessage: "",
      currentPage: 1,
      rowsPerPage: 3,
    };
  },
  computed:{
    displayedBookAll() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.rooms.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.rooms.length / this.rowsPerPage);
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
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
    // async deleteRoom(roomId) {
    //   try {
    //     const response = await fetch(`${IP_api}/rooms/delete/${roomId}`, {
    //       method: "DELETE",
    //     });
    //     if (response.status === 200) {
    //       // Delete was successful, remove the room from the list
    //       this.rooms = this.rooms.filter((room) => room.roomNumber !== roomId);
    //         Swal.fire('Room deleted successfully', '', 'success');
    //     } else {
    //         Swal.fire('An error occurred while deleting the room', '', 'error');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // },
    async deleteRoom(roomId) {
      const swalResponse = await Swal.fire({
        title: 'ເຈົ້າຕ້ອງການທີ່ຈະລຶບ?',
        // text: 'You will not be able to recover this room!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ',
        reverseButtons: true, // Swap the positions of Confirm and Cancel buttons
      });

      if (swalResponse.isConfirmed) {
        try {
          const response = await fetch(`${IP_api}/rooms/delete/${roomId}`, {
            method: 'DELETE',
          });
          if (response.status === 200) {
            // Delete was successful, remove the room from the list
            this.rooms = this.rooms.filter((room) => room.roomNumber !== roomId);
            Swal.fire('Room deleted successfully', '', 'success');
          } else {
            Swal.fire('An error occurred while deleting the room', '', 'error');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
  },
  created() {
    this.fetchRooms();
  },
};
</script>

<style scoped>
/* Your CSS styles here */

</style>