<template>
    <div class="tag">
        <div class="tag__header">

            <div class="back">
                <router-link :to="`/articles/${slug}`">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/>
                    </svg>
                    Back
                </router-link>
            </div>

            <div class="info">
                <p>Related articles to :</p>
                <h2>{{tag}}</h2>
            </div>

        </div>

        <div class="tag__body">

             <div class="articles__wrapper">
                <article-item :article="article" v-for="(article, index) in articles" :key="index"/>
            </div>
            
        </div>
    </div>
</template>
<script>

import ArticleItem from '@/components/articles/ArticleItem.vue'
export default {
  components: { ArticleItem },
    data(){
        return{
            tag: this.$route.params.tag,
            slug: this.$route.params.article,
            articles:[]
        }
    },
    created(){
        this.getArticlesByTag()
    },
    methods:{
        getArticlesByTag(){
            this.$api.get(`/articles?tag=${this.tag}`)
            .then(response => {
                if(response.data.articles){
                    this.articles = response.data.articles
                }
            })
            .catch(error=> console.log(error))
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/_variables';
    .tag{
        &__header{
            background-color: $background-gray;
            padding: 20px;
            .back{
                a{
                    text-decoration: none;
                    color:$color-green;
                    font-weight: $fw-damibold;
                    display: block;
                    text-align: left;
                    svg{
                        width:15px;
                        fill:$color-green;
                    }
                }
            }
            .info{
                text-align: center;
                p{
                    color: gray;
                    font-weight: $fw-damibold;
                }
            }
        }
        &__body{
            padding-top: 70px ;
            .articles__wrapper{
                display: flex;
                justify-content: flex-start;
                flex-wrap:wrap;
            }
        }
    }
</style>