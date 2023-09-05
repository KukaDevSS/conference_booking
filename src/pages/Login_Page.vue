<template>
  <div class=" vh-100 w-100 d-flex justify-content-center align-content-center" style="background-color: rgb(15, 4, 56);">
    <div class="my-auto m-auto">
        <div class="text-center text-white fw-bold">
            <h4>ລົງຊື່ຜູ້ໃຊ້ເພື່ອເຂົ້າສູ່ລະບົບ!</h4>
        </div> 
        <div class="my-3">
            <label class="text-white my-2" for="">ຊື່ຜູ້ໃຊ້</label>
            <input v-model="username" type="text" class="form-control shadow bg-light border" style="width: 400px;" >
        </div>
        <div class="w-100 mx-auto">
            <label class="text-white mb-2" for="">ລະຫັດຜ່ານ</label>
            <input v-model="password" type="password" class="form-control" style="width: 400px;" >
        </div>
        <div class="d-flex justify-content-center mt-4">
           <button @click="login" class="btn btn-primary" style="width: 400px;" >ເຂົ້າສູ່ລະບົບ</button>
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
            username:'',
            password:'',
        }
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
          this.$router.push('/all');
        } else {
          // Login failed, show an error message
          Swal.fire('Login failed', 'Please check your credentials and try again.', 'error');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        Swal.fire('An error occurred', 'Please try again later.', 'error');
      }
    },
    },
}
</script>

<style>

</style>