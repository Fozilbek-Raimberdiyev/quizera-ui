<template>
    <div class="login_wrapper">
        <div class="form">
        <form v-loading="loading" @submit.prevent="submit">
            <label>Login</label>
            <el-input required v-model="form.email" placeholder="Please input" />
            <label>Password</label>
            <el-input required type="password" v-model="form.password" show-password placeholder="Please input" />
            <button>
                <el-button type="button">Login</el-button>
            </button>
            <!-- <el-button type="text" @click="loading=!loading">Loading</el-button> -->
            <!-- <button class="btn">Login</button> -->
        </form>
    </div>
    </div>
</template>
<script>
import { mapStores } from 'pinia'
import { authStore } from "../stores/counter"
export default {
    data : () => {
        return {
            form : {
                email : "",
                password : ""
            },
            loading : false,
        }
    },
    computed : {
        ...mapStores(authStore)
    },
    methods : {
        submit () {
            localStorage.setItem("user", JSON.stringify(this.form))
           this.authStore.user = JSON.parse(localStorage.getItem("user"))
           this.$router.push("/")
        }
    }
}
</script>
<style scoped>
.login_wrapper {
    background: #fff;
    position: absolute;
    inset: 0;
}
.form {
    width: 500px;
    margin: 5rem auto;
}
    button {
        background: none;
        border: none;
    }
    form div{
        margin: 2px 0;
    }
</style>