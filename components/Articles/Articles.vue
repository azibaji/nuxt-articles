<template>
    <div class="articles">

        <div class="articles__wrapper">
            <article-item :article="article" v-for="(article, index) in articles" :key="index"/>
        </div>
        
        <paginations
         :itemsCount="allArticles.length"
         :pageSize="pageSize"
         :currentPage="currentPage"
         @handlePageChange="handlePageChange"
         />
    </div>
</template>
<script>

import pagination from '@/utils/pagination'
import ArticleItem from './ArticleItem.vue'
import Paginations from '@/components/Shared/Pagination.vue'

export default {
    props:{
        keywordSearch:String
    },
    components:{
        ArticleItem,
        Paginations,
    },
    data(){
        return{
            allArticles:[],
            copyOfAllArticles:[],
            currentPage:1,
            pageSize:2
        }
    },
    created(){
        this.geArticles()
    },
    computed:{

      articles(){
          const keywordSearch = this.keywordSearch.toLowerCase()
          
          if(this.allArticles){
            let filteredArticles = this.allArticles.filter(article => article.title.toLowerCase().includes(keywordSearch)
            || article.description.toLowerCase().includes(keywordSearch) || article.body.toLowerCase().includes(keywordSearch))
            
            this.allArticles = filteredArticles;
            
            return pagination.paginate(filteredArticles, this.currentPage, this.pageSize )
          }


      }
    },
    watch:{

      keywordSearch(){
          this.allArticles = this.copyOfAllArticles
      }
    },
    methods:{
        geArticles(){
           this.$api.get(`/articles`)
            .then( response => {
                response.data && (this.allArticles = response.data.articles)
                this.copyOfAllArticles = this.allArticles
            })
            .catch(error=> console.log(error))
        },
        handlePageChange(page){
            this.currentPage = page
        }
    },
    
}
</script>
<style lang="scss" scoped>
    .articles{
        padding-top:70px;
        &__wrapper{
            display: flex;
            justify-content: flex-start;
            flex-wrap:wrap;
        }
        
    }
</style>