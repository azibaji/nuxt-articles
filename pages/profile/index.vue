<template>
    <div class="profile">
        <div class="profile__header">
            <p>Edit profile : </p>
        </div>
        <div class="profile__body">
            <form>
                <div class="picture">
                    <img :src="user.image" class="img-thumbnail"/>
                    
                </div>
                <div class="form-group col-lg-6">
                    <label for="exampleFormControlInput1">Email address: </label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
                </div>
                <div class="form-group col-lg-6">
                    <label for="exampleFormControlInput1">User Name: </label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="user.username" disabled>
                </div>
            </form>
        </div>
        <div class="profile__footer">
            <button @click="saveProfile">Save</button>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data:()=>({
        email:''
    }),
    created(){
        this.email= this.user.email
    },
    computed: {
      ...mapGetters({
        user: "user",
      }),
    },
    methods:{
        saveProfile(){
            const user = {
                user:{
                    email:this.email
                }
            }
            const headers = {
                'Authorization':`Token ${this.user.token}`
            }
            if(this.user.username){
                this.$api.put(`/user`, user, { headers })
                .then( response => response.data && this.$toast('success', 'Your profile updated succesfully.', 'success'))
                .catch(error => error.response.status === 500 && this.$toast('error', 'Your email must be unique', 'danger'))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/_variables';
    .profile{
        text-align: left;
        &__header{
            background-color: $background-gray;
            padding: 30px;
            p{
                font-size:$fs-title;
                font-weight:$fw-damibold;
            }
        }
        &__body{
            padding: 30px;
            .picture{
                display: flex;
                justify-content: flex-start;
                padding-bottom: 20px;
                form{
                    align-self: flex-end;
                    padding-left:10px ;
                }
            }
            .form-group{
                margin-top:10px;
            }
        }
        &__footer{
            text-align: right;
            padding:30px;
            button{
                background: $background-green;
                background: $background-gradiant-green;
                border-radius: 10px;
                padding: 7px 30px;
                color: white;
                text-decoration: none;
                border:0px;
                margin-top:10px;
                font-weight: $fw-damibold
            }
        }
    }
</style>