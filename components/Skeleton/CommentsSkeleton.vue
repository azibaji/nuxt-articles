<template>
    <div class="skeleton">
        <b-row class="row">
             <b-col class="circle"></b-col>
             <b-col class="line col-1"></b-col>
        </b-row>
        <b-row class="row">
            <b-col class="line"></b-col>
        </b-row>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
    .skeleton{
        padding: 0px 20px;
        width: 100%;
        .row{
              .line {
                margin-bottom: 10px;
                height: 35px;
                border-radius: 7px;
                background-image: linear-gradient(90deg,#f4f4f4 0px,rgba(229, 229, 229, 0.8) 40px,#f4f4f4 80px);
                background-size: 600px;
                animation: shine-lines 2s infinite ease-out;
              }
                .circle {
                    max-width: 30px;
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    background-image: linear-gradient(
                        90deg,
                        #f4f4f4 0px,
                        rgba(229, 229, 229, 0.8) 40px,
                        #f4f4f4 80px
                    );
                    animation: shine-lines 2s infinite ease-out;
                    margin-right: 5px;
                }
              
        }
            @keyframes shine-lines {
                0% {
                background-position: -100px;
                }
                40%,
                100% {
                background-position: 140px;
                }
            }
    }
</style>