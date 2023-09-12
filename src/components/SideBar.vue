<template>
  <div class="col-2 vh-100 shadow-lg p-0 w-100" style="background-color: #59c1bd;">
    <p class="fw-bold text-center mt-2 pt-4 text-white">Dashboard</p>
        <!-- <div class="d-flex justify-content-center">
            <img src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg" height="100px" width="100px" style="border-radius: 100%;" alt="">
        </div>
        <div class="text-center text-white">
            <p class="m-0">Admin</p>
            <p class="p-0">Tel: 020 xxxxxxxx</p>
        </div> -->
        <div class="mt-4 mx-2">
            <router-link to="/all" class="btn btn-outline-light w-100 rounded text-start ps-5">
                <i class="bi bi-table"></i> ຈັດການການຈອງ
            </router-link>
        </div>
        <div class="mt-4 mx-2">
            <router-link to="/table" class="btn btn-outline-light w-100 rounded text-start ps-5">
                <i class="bi bi-columns-gap"></i> ຈັດການຫ້ອງ
            </router-link>
        </div>
        <!-- <div class="mt-4 mx-2">
            <router-link to="/add-room" class="btn btn-outline-light w-100 rounded text-start ps-5">
            <i class="bi bi-plus-circle-fill"></i> Add Rooms
            </router-link>
        </div> -->
    </div>
</template>

<script>
export default {

}
</script>

<style>
.btn-outline-light:hover{
    background-color: #0d4c92;
    color: white;
    border: 1px solid #0d4c92;
}
</style>

