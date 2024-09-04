<template> 
   <div class="split left">
  <div class="centered">
    <form @submit.prevent="handleOtp">
    
      <h2>Please enter your email and Otp code that we sent your inbox</h2>
    <div class="group">      
      <input type="text" v-model="email" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Email</label>
    </div>
      
    <div class="group">      
      <input type="text" v-model="otpCode" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>OtpCode</label>
    </div>

    <button type="submit"  >Verify Account</button>
    
  </form>
  </div>
</div>

<div class="split right">
  <div class="centered">
    <img src="../assets/otpbackground.jpg" alt="">
  </div>
</div>
</template>

<script lang="ts">

import axios from 'axios'
import {ref} from 'vue'

export default {
    data() {
        return {
            email : ref(""),
            otpCode : ref("")
        }
    },

    methods : {
        async handleOtp() {

            try {
            await axios.post("http://localhost:3000/api/auth/verify-account", {
                
            email : this.email,
            otpCode : this.otpCode
            })
            window.alert("Your account has been verificated. Now you can log in into our platform.")
                
            } catch (error) {

                console.log(error)
                
            }
        }
    }
}

</script>

<style lang="css">

h1,h2,h3,h4,h5,h6 {
  color: black;
  margin-bottom: 100px
}

.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}


button {
    padding: 20px;
    position: absolute;
    background-color: white;
    outline-color: black;
    border-radius: 10px;
    box-shadow: none;
    color: black;
    justify-items: flex-end;
    display: flex;
    margin-left: 16.5%;
    
}


.group 			  { 
  position:relative; 
  margin-bottom:45px; 
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #999ca1;
}
input:focus 		{ outline:none; }


label 				 {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#5264AE;
}


.left {
  left: 0;
  background-color: #ffffff;
}

.right {
  right: 0;
  background-color: rgb(255, 255, 255);
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}


</style>