<template>
  <div class="vh-100 w-100 d-flex justify-content-center align-content-center" style="background-color: white">
    <div class="my-auto m-auto shadow-lg p-5 rounded">
      <div class="text-center fw-bold">
        <img style="height: 150px;" src="../assets/SXR.png" alt="">
        <h4 class="fw-bold pt-4">ເຂົ້າສູ່ລະບົບ!</h4>
      </div> 
      <div class="my-3">
        <label class="my-2 fw-bold" for="">ຊື່ຜູ້ໃຊ້ :</label>
        <input v-model="username" type="text" class="form-control border" style="width: 400px;" placeholder="ຊື່ຜູ້ໃຊ້..">
      </div>
      <div class="w-100 mx-auto">
        <label class="fw-bold mb-2" for="">ລະຫັດຜ່ານ :</label>
        <input v-model="password" type="password" class="form-control" style="width: 400px;" placeholder="ລະຫັດຜ່ານ..">
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button @click="login" class="btn text-white" style="width: 400px;background-color: #0d4c92;">ເຂົ້າສູ່ລະບົບ</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { IP_api } from '../../API_config';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      try {
        const response = await fetch(`${IP_api}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (response.status === 200) {
          // Login successful, navigate to another route
          const data = await response.json();
          localStorage.setItem('authToken', data.authToken);

          this.$router.push('/all');
        } else {
          // Login failed, show an error message
          // Swal.fire('ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ', 'ກະລຸນາກວດສອບຂໍ້ມູນແລ້ວລອງໃໝ່ອີກຄັ້ງ', 'error');
          Swal.fire({
            title:'ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ',
            text: 'ກະລຸນາກວດສອບຂໍ້ມູນແລ້ວລອງໃໝ່ອີກຄັ້ງ',
            icon: 'error',
            confirmButtonText: 'ຕົກລົງ',
          })
        }
      } catch (error) {
        console.error('Error logging in:', error);
        Swal.fire('An error occurred', 'Please try again later.', 'error');
      }
    },
  },
};
</script>

<style>
/* Your styles here */
</style>
