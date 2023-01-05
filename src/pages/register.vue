<template>
    <div class="form">
        <form v-loading="loading" @submit.prevent="submit">
            <label>Firstname</label>
            <el-input required v-model="form.firstName" placeholder="Please input" />
            <label>Lastname</label>
            <el-input required v-model="form.lastName" placeholder="Please input" />
            <label>Email</label>
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
</template>
<script>
import { mapStores } from 'pinia'
import { authStore } from "../stores/counter"
export default {
    data : () => {
        return {
            form : {
                email : "",
                password : "",
                firstName : "",
                lastName : ""
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
           this.$router.push("/news")
        }
    }
}
</script>
<style>
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