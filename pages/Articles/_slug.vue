<template>
  <div class="article" v-if="article">
        <div class="article__header">
            <router-link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/>
                </svg>
                Back
            </router-link>
            <div class="bio">
                <div class="bio__author col-12" v-if="article.author" >
                    <div class="author__icon">
                        <img :src="article.author.image" />
                    </div>
                    <div class="author__detail">
                        <span class="name">
                            {{article.author.username}}
                        </span>
                        <span class="date">
                            {{formatDate(article.createdAt)}}
                        </span>
                        
                    </div>
                </div>
                <div class="bio__title col-7">
                    <h1>
                        {{article.title}}
                    </h1>
                    <p>
                        {{article.description}}
                    </p>
                </div>
                <div class="bio__detail col-2">
                    <div class="commentsTotal " v-if="comments">
                        {{comments.length}}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"/>
                        </svg>
                    </div>
                    <div class="vote " @click="AddToFavorite">
                        {{article.favoritesCount}}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-if="!votedFlag">
                            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-else>
                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"/>
                        </svg>
                    </div>
                </div>
                
            </div>
           
        </div>
        <div class="article__body">
            <div class="text">
                 {{article.body}}
            </div>
            <div class="tags">
                <NuxtLink v-for="(tag, index) in article.tagList" :key="index" :to="`/${article.slug}/${tag}`">
                    <span >{{tag}}</span>
                </NuxtLink> 
            </div>
           
        </div>
        <div class="article__footer" v-if="comments">
            <div class="comment" v-for="comment in comments" :key="comment.id">
                <div class="author">
                    <div class="author__icon" v-if="comment.author">
                        <img :src="comment.author.image"/>
                    </div>
                    <div class="author__info">
                        <span class="name">{{comment.author.username}}</span>
                        <span class="date">{{formatDate(comment.createdAt)}}</span>
                    </div>
                </div>
                <div class="text">
                    {{comment.body}}
                </div>
                
            </div>
            <div class="new-comment" v-if="user.email">
                <div class="form-group" v-if="newCommentFlag">
                    <label for="exampleFormControlTextarea1">Write your comment</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="commentText"></textarea>
                </div>

                <button v-if="!newCommentFlag" @click="addNewComment">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
                    </svg>
                    New commnet
                </button>

                <button v-else @click="postComment">
                    send
                </button>
                
            </div>
        </div>

    </div> 
</template>
<script>
import {mapGetters} from 'vuex'
export default {
     data(){
        return{
            slug: this.$route.params.slug,
            article:[],
            newCommentFlag:false,
            commentText:'',
            votedFlag:false,
            comments:[]
        }
     },
     created(){
         this.getArticle(),
         this.getComments()
     },
    computed: {
      ...mapGetters({
        user: "user",
      })
    },
     methods:{
        getArticle(){
             this.$api.get(`/articles/${this.slug}`)
                .then( response => (this.article = response.data.article) )
                .catch( error => console.log(error) )
        },

        getComments(){
            this.$api.get(`/articles/${this.slug}/comments`)
             .then( response => this.comments = response.data.comments)
             .catch(error => console.log(error) )
        },

        formatDate(date){
            return new Date(date).toLocaleDateString()
        },

        addNewComment(){
            this.newCommentFlag = true
        },

        postComment(){
            const comment = {
                comment: {
                     body: this.commentText
                }
            }

            const headers = {
                'Authorization':`Token ${this.user.token}`
            }

            this.$api.post(`/articles/${this.slug}/comments`, comment, {headers} )
                .then( response => {
                     response.data.comment && this.$toast('success', 'Your comment was sent successfully. :)', 'success')
                     this.commentText = ''
                })
                .catch( error => {
                        error.response && this.$toast('error', error.response.statusText, 'danger')
                })
         },

         AddToFavorite(){
             if(this.user.email){
                this.votedFlag = !this.votedFlag
                const headers = {
                    'Authorization':`Token ${this.user.token}`
                }
                if(this.votedFlag){
                    this.$api.post(
                        `/articles/${this.slug}/favorite`,
                        {},
                        {headers}
                    )
                    .then(response => {
                        response.data && this.$toast('success', 'This article was added to your favorites list successfully. ', 'success')
                    })
                    .catch(error=> {
                        this.$toast('error', error.response.statusText, 'danger')
                    })
                } else {
                    this.$api.delete(
                        `/articles/${this.slug}/favorite`,
                        {headers}
                    )
                    .then( response => {
                        response && this.$toast('success', 'This article was successfully removed from your favorites. ', 'success')
                    })
                }
             } else{
                  this.$toast('warning', 'To vote this article you must log in. :s', 'warning')
             }
             
         }
     }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/_variables';
    .article{
        &__header{
            background-color: $background-gray;
            padding: 20px;
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
            .bio{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                margin-top:40px;
                text-align: left;
                h1{
                    font-size:$fs-title;
                }
                p{
                    font-size:$fs-subtitle;
                    padding-left:10px;
                }
                &__author{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    margin-bottom: 10px;
                    .author__icon{
                        align-self: center;

                    }
                    .author__detail{
                        font-size: $fs-caption;
                        span{
                            display: block;
                            margin-left: 5px;
                            color:$color-gray;
                        }
                        .name{
                            margin-left:5px;
                            align-self: flex-end;
                        }

                    }
                }
                &__detail{
                    display: flex;
                    justify-content: flex-end;
                    font-size: $fs-caption;
                    color: $color-gray;
                    svg{
                        width:20px;
                        margin-right:5px;
                        fill:$color-gray;
                    }
                    .vote{
                        text-align: right;
                        cursor: pointer;

                    }
                    .commentsTotal{
                        text-align: right;
                    }
                }
            }
        }
        &__body{
            margin:30px 60px;
            text-align: justify;
                .tags{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: flex-end;
                    margin-top: 30px;
                    span{
                        background-color: $background-green;
                        color:white;
                        padding-right: 0.6em;
                        padding-left: 0.6em;
                        border-radius: 10rem;
                        margin-right:5px;
                        font-size: $fs-item-title;
                        transition: 0.3s;
                        &:hover{
                            -webkit-box-shadow: 1px 1px 7px 2px rgba(208,208,208,0.87); 
                            box-shadow: 1px 1px 7px 2px rgba(208,208,208,0.87);
                        }
                    }
                }
        }
        &__footer{
            .comment{
                border:1px solid $background-gray;
                border-radius: 10px;
                padding:  10px 20px;
                .author{
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-end;
                    font-size:$fs-caption;
                    &__info{
                        color:black;
                        padding-left:4px;
                        align-self:flex-end;
                        color: $color-gray;
                        span{
                            display: block;
                            &.name{
                                font-style: italic;
                            }
                        }
                    }
                }
                .text{
                    text-align: left;
                    margin-top: 10px;
                    padding-left: 25px;
                    font-size: $fs-body;
                }
            }
            .new-comment{
                text-align: left;
                margin-top:20px;
                button{
                    background: $background-green;
                    background: $background-gradiant-green;
                    border-radius: 10px;
                    padding: 7px 30px;
                    color: white;
                    display: inline-block;
                    text-decoration: none;
                    border:0px;
                    margin-top:10px;
                    svg{
                        width:15px;
                        fill:white;
                    }
                }
                .form-group{
                    margin-top:10px;
                }
            }
        }
    }
</style>