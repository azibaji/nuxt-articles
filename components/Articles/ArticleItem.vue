<template>
    <nuxt-link :to="`/articles/${article.slug}`" class="col-lg-4 m-2">
        <div class="article-item ">
            <div class="article-item__img">
                <img :src="imgUrlDefault"/>
            </div>
            <div class="article-item__info">
                <div class="body">
                    <div class="title">
                        {{article.title}}
                    </div>
                    <div class="description">
                        {{article.description}}
                    </div>
                    <div class="tags">
                        <span v-for="(tag, index) in article.tagList" :key="index">{{tag}}</span>
                    </div>
                </div>
                <div class="footer">
                    <div class="author">
                        <img :src="article.author.image" class="rounded"/>
                         {{article.author.username}}
                    </div>
                    <div class="likes">
                        {{article.favoritesCount}}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"/>
                        </svg>
                    </div>
                </div>
                
            </div>
        </div>
    </nuxt-link>
</template>
<script>
export default {
    props:['article'],
    data: () =>({
        imgUrlDefault:'http://erasmusplus.org.ge/files/news/news-1.jpg'
    })
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/_variables';
    .article-item{
        border: 1px solid $color-light-gray;
        min-height: 438px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &__img{
            img{
                width:100%;
                }
            }
        &__info{
            text-align: left;
            .body{
                padding:20px;
                .title{
                    font-size:$fs-item-title;
                    font-weight: $fw-medium;
                    margin-bottom: 20px;
                    height: 50px;
                    overflow-y: hidden;
                }
                .description{
                    font-size:$fs-body;
                    text-align: left;
                    height: 100px;
                    overflow-y: hidden;
                }
                .tags{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    height: 50px;
                    align-items: flex-end;
                    span{
                        background-color: $background-green;
                        color:white;
                        padding-right: 0.6em;
                        padding-left: 0.6em;
                        border-radius: 10rem;
                        margin-right:5px;
                        font-size: $fs-body;
                    }
                }
            }
            .footer{
                display: flex;
                justify-content: space-between;
                border-top: 1px solid $color-light-gray;
                padding: 10px 20px;
                color:$color-light-gray;
                font-size: $fs-caption;
                .comments{
                    svg{
                        fill: $color-light-gray;;
                        width: 15px;
                    }
                    padding-right:10px;
                    margin-right:10px;
                    border-right:1px solid $color-light-gray;
                }
                .likes{
                    align-self: center;
                    svg{
                        fill: $color-light-gray;;
                        width: 15px;
                    }
                }
            }
        }

    }
</style>