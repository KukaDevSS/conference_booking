<template>
  <div class="container vh-100" style="padding-top: 10px;">
    <div class="w-100">
      <input v-model="searchQuery" type="text" class="form-control ps-4 w-25 my-2 mx-auto border-1" placeholder="ຄົ້ນຫາ...">
    </div>
    <div class="my-2 d-flex justify-content-end">
      <!-- <button class="btn btn-primary me-2" @click="showAllData">Show All</button>
      <button class="btn btn-primary" @click="showDateNowData">Show Date Now</button> -->
    </div>
    <table class="w-100">
      <thead class="text-center">
        <tr class="">
          <th style="border: 1px solid gainsboro;" class="py-2">No.</th>
          <th style="border: 1px solid gainsboro;">ສະຖານະ</th>
          <th style="border: 1px solid gainsboro;">ເວລາ</th>
          <th style="border: 1px solid gainsboro;">ຫົວຂໍ້</th>
          <th style="border: 1px solid gainsboro;">ພາກສ່ວນ</th>
          <th style="border: 1px solid gainsboro;">ຊື່ຫ້ອງ</th>
          <th style="border: 1px solid gainsboro;">ຊື່ ແລະ ນາມສະກຸນ</th>
          <th style="border: 1px solid gainsboro;">ເບີ້ໂທລະສັບ</th>
          <th style="border: 1px solid gainsboro;">ຈັດການ</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <!-- <tr v-for="(book,index) in filteredBookAll" :key="book._id"> -->
        <tr v-for="(book,index) in displayedBookAll" :key="book._id">
          <!-- <td class="py-3">{{ index + 1 }}</td> -->
          <td style="border: 1px solid gainsboro;" class="py-3">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
          <!-- <td style="border: 1px solid gainsboro; margin: 10px; padding: 0;">
            <div class="p-2" :class="{'bg-success rounded mx-1 text-white': book.isActive, 'bg-danger rounded mx-1 text-white': !book.isActive}" >
              {{ book.isActive ? 'Active' : 'Deactivate' }}
            </div>
          </td> -->
          <!-- <td
            style="border: 1px solid gainsboro; margin: 10px; padding: 0px;">
            <div class="p-1 mx-1" style="color: #03c988; border-radius: 100px; font-weight: 400;" :style="{ 'background-color': book.isActive ? '#e5f9db' : '#ff7272'}">
              {{ book.isActive ? 'Active' : 'Deactivate' }}
            </div>
          </td> -->
          <td style="border: 1px solid gainsboro; margin: 10px; padding: 0px;">     
              <div class="py-1 p-0 mx-1" :style="{'background-color': book.isActive ? '#e5f9db' : '#fad4d4','color': book.isActive ? '#388e3c' : 'red' }" style="border-radius: 100px; font-weight: 400;" >
                {{ book.isActive ? 'Active' : 'Deactivate' }}
              </div>
          </td>
          <td style="border: 1px solid gainsboro;">{{ formatDate(book.date) }} > {{ book.startTime }} - {{ book.endTime }}</td>
          <td style="border: 1px solid gainsboro;">{{ book.title }}</td>
          <td style="border: 1px solid gainsboro;">{{ book.department }}</td>
          <td style="border: 1px solid gainsboro;">{{ book.title_room }}</td>
          <td style="border: 1px solid gainsboro;">{{ book.name }}</td>
          <td style="border: 1px solid gainsboro;">{{ book.phone }}</td>
          <td style="border: 1px solid gainsboro;">
          <div class="dropdown">
              <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">     
                  <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link :to="{name:'update',params:{id: book._id}}"><button class="dropdown-item"><i class="bi bi-pencil-fill text-warning"></i> ແກ້ໄຂ</button></router-link>     
                  <button @click="showDeleteConfirmation(book._id)" class="dropdown-item" type="button">
                    <i class="bi bi-trash-fill text-danger"></i> ຍົກເລີກ
                  </button>      
              </ul>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4">
      <!-- <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="previousPage" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="nextPage" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav> -->
      <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <button class="page-link" @click="previousPage" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="page-item" v-for="page in visiblePageRange" :key="page" :class="{ 'active': currentPage === page }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <button class="page-link" @click="nextPage" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { IP_api } from '../../API_config';

export default {
  data() {
    return {
      allRooms:[],
      activeBookId: null,
      showButtons: false,
      bookAll:[],
      currentPage: 1,
      rowsPerPage: 8,
      searchQuery: '',
      showDateNowData: false,
    };
  },
  computed:{
    visiblePageRange() {
      const maxVisibleButtons = 5; // Adjust this value as needed
      const startPage = Math.max(this.currentPage - Math.floor(maxVisibleButtons / 2), 1);
      const endPage = Math.min(startPage + maxVisibleButtons - 1, this.totalPages);
      const pageRange = [];
      for (let i = startPage; i <= endPage; i++) {
        pageRange.push(i);
      }
      return pageRange;
    },
    displayedBookAll() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.filteredBookAll.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.bookAll.length / this.rowsPerPage);
    },
    filteredBookAll() {
      const query = this.searchQuery.toLowerCase();
      return this.bookAll.filter((book) => {
        return (
          book.title.toLowerCase().includes(query) ||
          book.department.toLowerCase().includes(query) ||
          book.title_room.toLowerCase().includes(query) ||
          book.name.toLowerCase().includes(query) ||
          book.phone.toLowerCase().includes(query)
        );
      });
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
    // 
    getRooms() {
      axios.get(`${IP_api}/rooms`)
        .then((response) => {
          this.allRooms = response.data;
        })
        .catch((error) => {
          console.error('Error fetching rooms:', error);
        });
    },
    // 
    async deleteEvent(id) {
      try {
        const response = await fetch(`${IP_api}/booking/cancel/${id}`, {
          method: 'PUT'
        });

        if (!response.ok) {
          throw new Error(`Failed to delete event with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);

        location.reload();
      } catch (error) {
        console.error('Error deleting event:', error);
        // Handle the error gracefully, show a user-friendly message, etc.
      }
    },

    showDeleteConfirmation(id) {
      Swal.fire({
        title: 'ເຈົ້າຕ້ອງການທີ່ຈະລຶບມັນ ຫຼື ບໍ່?',
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
      formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    },
    getBookAll() {
      axios.get(`${IP_api}/booking`)
      .then((response) => {
        // this.bookAll = response.data
        this.bookAll = response.data.reverse();
      }).catch((err) => {
        console.error(err)
      });
    },
  },
  mounted() {
    this.getBookAll()
    this.getRooms()

  },
};
</script>

<style>
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.show .dropdown-menu {
  transform: translateX(0);
}
</style>