<template>
  <div class="split left">
    <div class="centered">
      <h2>saddjaksds</h2>
      <div class="card flex justify-center">
        <InputText type="text" v-model="value" />
      </div>
    </div>
  </div>

  <div class="split right">
    <div class="centered">
      <h2>asddasads</h2>
    </div>
  </div>
</template>

<style>
.split {
  height: 100%;
  width: 70%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.left {
  left: 0;
  background-color: grey;
}

.right {
  right: 0;
  background-color: red;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>

<script>
import InputText from 'primevue/inputtext'

import { ref } from 'vue'

const value = ref(null)

export default {
  data() {
    return {}
  }
}
</script>
