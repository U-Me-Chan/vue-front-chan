<template>
<div class="box">
  <h3 v-if="!parent_id">Создать тред</h3>
  <h3 v-if="parent_id">Ответить на:</h3>
  <div class="box" v-if="replyMessage">
    <vue-markdown class="reply-message"
                  :typographer=true
                  :html=true
                  :toc=false
                  :source=filterMessage></vue-markdown>
  </div>
  <b-switch v-if="parent_id" v-model="isSage">Не поднимать</b-switch>
  <b-field label="Имя">
    <b-input value="Anonymous" v-model="poster"></b-input>
  </b-field>
  <b-field label="Тема">
    <b-input value="" v-model="subject"></b-input>
  </b-field>
  <b-field label="Сообщение">
    <b-input max-length="200" type="textarea" v-model="message" ref="message"></b-input>
  </b-field>
  <b-button @click="create()" type="is-primary" expanded>Отправить</b-button>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import service from '../service';
import { bus } from '../bus';

export default {
    name: 'Form',
    components: {
      VueMarkdown
    },
    props: {
        tag: {
            type: String,
        },
        parent_id: {
            type: [String, Boolean, Number],
            default: false
        },
        message: {
            type: String,
            default: ''
        },
        replyMessage: {
            type: String,
            default: ''
        }
    },
    computed: {
        filterMessage: function () {
            return this.replyMessage.replace(/<.+>/gmi, () => { return ''});
        }
    },
    methods: {
        init: function () {
            this.subject = '';
            this.message = '';
            this.isSage = false;
        },
        create: function () {
            var data = {};
            data['poster'] = this.poster;
            data['subject'] = this.subject;
            data['message'] = this.message;
            data['tag'] = this.tag;

            if (this.isSage === 'true') {
                data['sage'] = true;
            }

            if (this.parent_id) {
                data['parent_id'] = this.parent_id;
            }

            service.createPost(data).then(
                (payload) => {
                    this.$buefy.toast.open('Отправлено!');
                    this.init();

                    bus.$emit('form:success', [payload]);
                },
                (error) => {
                    this.$buefy.dialog.alert({
                        title: 'Ошибка!',
                        message: `Произошла ошибка при отправке поста: ${error}`,
                        type: 'is-danger'
                    });
                }
            );
        }
    },
    data: function () {
        return {
            poster: 'Anonymous',
            subject: '',
            isSage: false,
        }
    }
}

</script>

<style scoped>
.reply-message {
    margin-left: 20px;
}
</style>
