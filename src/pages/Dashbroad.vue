<template>
  <div>
    <header class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-2 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 text-uppercase fw-bold" href="#">Dasboard admin</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    <input class="form-control form-control-dark w-50" type="text" placeholder="Search" aria-label="Search">
    <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class=" px-3 btn btn-outline-light" href="#">Sign out</a>
    </div>
  </div>
</header>
    <div class="row w-100">
        <div class="col-2 vh-100 bg-primary shadow-lg p-0">
            <p class="fw-bold text-center mt-2 text-white">Dashboard</p>
            <div class="d-flex justify-content-center">
                <img src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg" height="100px" width="100px" style="border-radius: 100%;" alt="">
            </div>
            <div class="text-center text-white">
                <p class="m-0">Admin</p>
                <p class="p-0">Tel: 020 xxxxxxxx</p>
            </div>
            <div class="mt-2">
                <button class="btn btn-light w-100 rounded-0 text-start ps-5"><i class="bi bi-house-door-fill"></i> Functions</button>
            </div>
            <div class="mt-4">
                <button class="btn btn-light w-100 rounded-0 text-start ps-5"><i class="bi bi-table"></i> Functions</button>
            </div>
            <div class="mt-4">
                <button class="btn btn-light w-100 rounded-0 text-start ps-5"><i class="bi bi-file-earmark-plus-fill"></i> Functions</button>
            </div>
            <div class="mt-4">
                <button class="btn btn-light w-100 rounded-0 text-start ps-5"><i class="bi bi-person-circle"></i> Functions</button>
            </div>
        </div>
        <div class="col-10 vh-100 bg-light p-0">
            <div class="mx-auto">
                <p class="text-center text-uppercase fw-bold mt-3">Body Content</p>
            </div>
            <div class="row d-flex justify-content-around ms-2 me-2">
                <!-- <div class="col-3 bg-primary rounded shadow-lg" style="height: 150px;"></div>
                <div class="col-3 bg-primary rounded shadow-lg" style="height: 150px;"></div>
                <div class="col-3 bg-primary rounded shadow-lg" style="height: 150px;"></div> -->
                <!-- <div class="col-3 bg-warning">Card4</div> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>