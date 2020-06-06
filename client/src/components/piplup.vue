<template>
  <div class="container">
    <div class="piplup">
      <div class="head">
        <div class="eye">
          <div class="eyeball"></div>
        </div>
        <div class="beak"></div>
        <div class="forehead"></div>
        <div class="forehead2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'piplup'
}
</script>

<style scoped>
  .container {
    position: absolute;
    z-index: 0;
    right: -625px;
    bottom: 175px;
  }

  .head {
    background-color: #4487be;
    width: 180px;
    height: 150px;
    border-radius: 50%;
    position: absolute;
  }

  .eye {
    width: 180px;
    height: 75px;
    background-color: white;
    border-bottom-right-radius: 50% 100%;
    border-bottom-left-radius: 50% 100%;
    position: absolute;
    z-index: 12;
    top: 75px;
    left: 0px;
  }

  .eye::before {
    content: "";
    width: 70px;
    height: 100px;
    background-color: white;
    position: absolute;
    border-radius: 100%;
    top: -50px;
    left: 0;
  }

  .eye::after {
    content: "";
    width: 70px;
    height: 100px;
    background-color: white;
    position: absolute;
    border-radius: 100%;
    top: -50px;
    right: 0;
  }

  .beak {
    width: 50px;
    height: 55px;
    background-color: khaki;
    position: absolute;
    z-index: 13;
    border-top-left-radius: 90% 80%;
    border-top-right-radius: 90% 80%;
    border-bottom-left-radius: 90% 100%;
    border-bottom-right-radius: 90% 100%;
    top: 50px;
    left: 65px;
  }

  .beak::after {
    content: "";
    background-color: darksalmon;
    width: 40px;
    height: 35px;
    position: absolute;
    top: 15px;
    left: 5px;
    border-top-left-radius: 70% 40%;
    border-top-right-radius: 70% 40%;
    border-bottom-left-radius: 70% 100%;
    border-bottom-right-radius: 70% 100%;
  }

  .eyeball::before {
    /* background-color: red; */
    content: "";
    width: 25px;
    height: 20px;
    position: absolute;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    top: -30px;
    left: 18px;
    border: 4px solid black;
    border-bottom: none;
    z-index: 12;
  }

  .eyeball::after {
    content: "";
    width: 25px;
    height: 20px;
    position: absolute;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    top: -30px;
    left: 130px;
    border: 4px solid black;
    border-bottom: none;
    z-index: 12;
  }

  .forehead {
    width: 50px;
    height: 50px;
    background-color: powderblue;
    position: absolute;
    top: 40px;
    left: 65px;
    transform: rotate(45deg);
  }

  .forehead2 {
    width: 50px;
    height: 50px;
    background-color: powderblue;
    position: absolute;
    top: 40px;
    left: 35px;
    transform: rotate(30deg);
  }

  .forehead2::after {
    content: "";
    width: 50px;
    height: 50px;
    background-color: powderblue;
    position: absolute;
    top: -34px;
    left: 55px;
    transform: rotate(30deg);
  }
</style>
