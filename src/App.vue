
<template>
  <div class="">
    <!-- <div class="bg-primary py-2 d-flex ps-5 fixed-top justify-content-between">
      <div>
        <img class="bg-white" src="./assets//Logo-removebg-preview.png" alt="" height="40px">
      </div>
      <button class="btn btn-warning me-5" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">ເຂົ້າສູ່ລະບົບ</button>
    </div> -->
   <!-- <nav class=" d-flex justify-content-end me-4 py-2" style="margin-top: 60px;">
    
   </nav> -->


   <div>
    <div class="modal fade rounded-0" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white text-center fw-bold shadow">
              <h1 class="modal-title fs-5 w-100 fw-bold" id="exampleModalToggleLabel">Admin</h1>
              <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form action="">
                <div class="my-2">
                  <input type="text" class="form-control rounded-0" placeholder="Username">
                </div>
                <div class="my-4">
                  <input type="password" class="form-control rounded-0" placeholder="Password">
                </div>
                <!-- <div class="my-2">
                  <router-link to="/dashboard"><button class="btn btn-primary form-control rounded-0">Login</button></router-link>
                </div> -->
                <div class="my-2">
                  <router-link to="/dashboard">Login</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <router-view></router-view>

</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lobster&family=Noto+Sans+Lao&family=Noto+Serif+Lao:wght@900&family=Oswald:wght@700&family=Tapestry&display=swap');
*{
    font-family: 'Noto Sans Lao', sans-serif;
}
</style>
