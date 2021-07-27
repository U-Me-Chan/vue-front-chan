<template>
<div class="box">
  <h3 v-if="parent_id">Ответить в тред</h3>
  <h3 v-if="!parent_id">Создать тред</h3>
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
import service from '../service';
import { bus } from '../bus';

export default {
    name: 'Form',
    props: {
        tag: {
            type: String,
        },
        parent_id: {
            type: [String, Boolean, Number],
            default: false
        },
        message : {
            type: String,
            default: ''
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
.form-message, .form-subject, .form-poster, .form-submit, .form-sage {
    background-color: #111;
    border-color: #222;
    color: #888;
}

.info-cell {
    background-color: #333;
    color: #aaa;
}

.form {
    display: flex;
    justify-content: center;
    margin: 20px;
}

.info-message {
    color: green;
}

.error-message {
    color: red;
}

.wrapper {
}
</style>
