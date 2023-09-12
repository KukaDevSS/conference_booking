<template>
  <div class="fixed-top">
    <header class="navbar navbar-dark sticky-top flex-md-nowrap p-2 shadow" style="background-color: #59c1bd;">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 text-uppercase fw-bold" href="#">ໜ້າຈັດການຫ້ອງປະຊຸມ</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- <input class="form-control form-control-dark w-50 px-4" type="text" placeholder="ຄົ້ນຫາ..." aria-label="Search"> -->
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
            <button @click="logout" class=" px-3 btn btn-outline-light">ອອກຈາກລະບົບ<i class="bi bi-box-arrow-right ps-2"></i></button>
            </div>
        </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('authToken');

      // Redirect the user to the login page or any other desired route
      this.$router.push('/');
    },
  },
}
</script>

<style>

</style>