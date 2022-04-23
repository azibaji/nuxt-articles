<template>

    <div class="new-article">
        <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="title" v-model="title">
            </div>
            
            <div class="form-group">
                <label for="exampleFormControlInput1">Short description:</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="short description" v-model="shortDescription">
            </div>

            <div class="form-group">
                <label for="exampleFormControlTextarea1">Article</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
            </div>

            
            <div class="form-group">
                <label for="exampleFormControlInput1">Tags: (Please separate tags with , )</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="short description" v-model="tags">
            </div>

            <button class="new-article__btn" @click.prevent="postArticle"> post</button>

        </form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data:()=>({
        title:'',
        shortDescription:'',
        description:'',
        tags:''
    }),
    computed: {
      ...mapGetters({
        user: "user",
      })
    },
    methods:{
        postArticle(){
            const tagsArrey = this.tags.split(',')
            const newArticleObj = {
                article: {
                    title: this.title,
                    description: this.shortDescription,
                    body: this.description,
                    tagList: tagsArrey
                }
            }
            const headers = {
                'Authorization':`Token ${this.user.token}`
            }
            this.$api.post(
                `/articles`,
                newArticleObj,
                 {headers})
            .then(response => {
                if(response.data.article){
                    this.$toast('success', `Your article was saved successfully. :)`, 'success');
                    this.$router.push({ path: '/' });
                }
            })
            .catch(error => {
                if(error.response.status === 401){
                    this.$router.push({ path: '/login' });
                } else if(error.response.status === 422){
                    this.$toast('error', `Title ${error.response.data.errors.title}`, 'danger');
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/_variables';
    .new-article{
        text-align: left;
        label{
            color:$color-green;
            font-weight: $fw-damibold;
        }
        .form-group{
            margin-top:20px;
        }
        &__btn{
            background: $background-green;
            background: $background-gradiant-green;
            border-radius: 10px;
            padding: 7px 30px;
            color: white;
            text-decoration: none;
            float:right;
            border:0px;
            margin-top:10px;
            font-weight: $fw-damibold;
            font-size:$fs-btn;
            &:hover{ 
                cursor: pointer;
            }
        }
    }
</style>