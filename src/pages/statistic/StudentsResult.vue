<template>
    <h5>Hozircha ish faoliyatida emas</h5>
  </template>
  <script>
  export default {
      data() {
          return {
              currentStatus : "Passed"
          }
      }
  };
  </script>
  <style scoped>
  .tabs {
    margin: 10px 0;
  }
  .tab {
    background: #c8d2e4;
    padding: 3px 5px;
    border-radius: 5px;
    color: #000;
    margin: 0 5px;
    cursor: pointer;
  }
  .active {
      background: rgb(70, 70, 238);
      color: #fff;
  }
  </style>