<template>
    <div class="m-0 p-0" style="margin-top: 0px;">
      <Header />
      <div class="row w-100">
        <div class="col-2">
          <SideBar/>
        </div>
        <div class="col-10 vh-100 pt-5">
          <div class="content-section shadow-lg vh-100 mt-1">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SideBar from './SideBar.vue';
  import Header from './HeaderDash.vue';

  
  export default {
    components: {
      SideBar,
      Header,
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  .content-section {
  position: relative;
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(100vh - 48px); /* Set max height considering the header height */
  }
  </style>
  