<template>

    <div>
        <b-navbar toggleable="sm" type="light" variant="light" class="header">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
            <b-collapse id="nav-text-collapse" is-nav class="header__menu">
                <b-navbar-nav >
                    <b-nav-item>
                        <NuxtLink class="nav-link" to="/">Home</NuxtLink>
                    </b-nav-item>
                    <b-nav-item>
                        <NuxtLink  v-if="user.email" class="nav-link" to="/profile" >Profile</NuxtLink>
                    </b-nav-item>

                </b-navbar-nav>
                <div>
                    <NuxtLink to="/new-article" class="new-article" v-if="user.email">
                        Write an article
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"/>
                        </svg>
                    </NuxtLink>
                        <button class="header__btn" v-if="user.email" @click="logOut">Logout</button>
                    <NuxtLink to="/auth/login" class="header__btn" v-else >Login</NuxtLink>
                </div>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
    ...mapGetters({
        user: "user",
      })
    },
    methods:{
        logOut(){
            this.$store.commit('SET_USER', {})
            this.$router.push({ path: '/' });
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/_variables';
    .header{
        padding:10px;
        &__menu{
            display: flex;
            justify-content: space-between;
            font-weight: $fw-damibold;
            @media(max-width:767px){
                flex-direction: column;
                align-items: center;
            }
            .new-article{
                text-decoration: none;
                font-size:$fs-btn;
                margin-right:14px;
                color: $color-green;
                border-bottom: 1px solid $color-green;
                svg{
                    width:17px;
                    fill: $color-green;
                }
            }
        }
        &__btn{
            background: $background-green;
            background: $background-gradiant-green;
            border-radius: 100px;
            padding: 7px 30px;
            color: white;
            display: inline-block;
            text-decoration: none;
            font-size:$fs-btn;
            font-weight: $fw-damibold;
            &:hover{
                cursor: pointer;
            }
        }
        button.header__btn{
            border:0px;
        }
    }
</style>