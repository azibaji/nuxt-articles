<template>
    <div class="default-wrapper">
        <Header />

        <div class="main container">
          <nuxt/>
        </div>

        <Footer />
    </div>
</template>
<script>

import Footer from '../components/Shared/Footer.vue'
import Header from '../components/Shared/Header.vue'

export default {
  components: { 
    Header,
    Footer 
  },
    
}
</script>
<style lang="scss" >
.default-wrapper{
      display: flex;
      flex-direction: column;
      .main{
            display: flex;
            flex-direction:column; 
            min-height: 100vh;
            justify-content: space-between;
            padding: 70px 0px;
            @media(max-width:767px){
              width:80%;
            }
      }
}
</style>