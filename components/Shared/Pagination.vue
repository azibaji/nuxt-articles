<template>
    <nav class="pagination">
        <ul class="pagination">
            <li class="page-item" v-for="page in pages" :key="page" :class="{ active: currentPage === page}">
                <a class="page-link" @click="handlePageChange(page)" >
                    {{page}}
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
import _ from 'lodash'
export default {
    props:['itemsCount', 'pageSize', 'currentPage'],
    computed:{
        pages(){
            const pagesCount = Math.ceil(this.itemsCount / this.pageSize)
            const pages = pagesCount === 1 ? null :  _.range(1, pagesCount + 1)
            return pages
        },
    },
    methods:{
        handlePageChange(page){
            this.$emit('handlePageChange', page)
        },
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/_variables';
    .pagination {
        text-align: center;
        margin:0px auto;
        padding-top:10px;
        .page-item{
            &.active{
                .page-link{
                    background-color: $background-green;
                    border:1px solid $color-gray;
                }   
            }
            .page-link{
                color:black;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        
    }
</style>