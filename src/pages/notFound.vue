<template>
  <a-result
    status="404"
    title="404"
    sub-title="Siz izlayotgan sahifa bu yerda emas!"
  >
    <template #extra>
      <a-button type="primary"
        ><router-link to="/">Bosh sahifaga qaytish</router-link></a-button
      >
    </template>
  </a-result>
</template>


