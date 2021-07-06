<template>
  <div class="wrapper">
<div class="form">
  <table>
    <tr v-if="parent_id">
      <td class="info-cell">Не поднимать:</td>
      <td><input type="checkbox" class="form-sage" true-value="true" false-value="false" v-model="sage"></td>
    </tr>
    <tr>
      <td class="info-cell">Имя:</td>
      <td><input type="text" class="form-poster" value="Anonymous" placeholder="Имя" v-model="poster" size="auto"></td>
    </tr>
    <tr>
      <td class="info-cell">Тема:</td>
      <td><input type="text" class="form-subject" value="" placeholder="Тема" v-model="subject" size="auto"></td>
    </tr>
    <tr>
      <td class="info-cell">Сообщение:</td>
      <td><textarea class="form-message" value="" placeholder="Сообщение" v-model="message" cols="auto" rows="10"/></td>
    </tr>
    <tr>
      <td class="info-cell">
        <span v-if="isMessageVisible" class="info-message"> {{infoMessage}}</span>
        <span v-if="isErrorVisible" class="error-message">{{errorMessage}}</span>
      </td>
      <td><button class="form-submit" @click="create()">Отправить</button></td>
    </tr>
  </table>
</div>
</div>
</template>

<script>
import service from '../service';

export default {
    name: 'Form',
    props: {
        tag: {
            type: String,
        },
        parent_id: {
            type: [Number, Boolean],
            default: false
        },
    },
    methods: {
        init: function () {
            this.subject = '';
            this.message = '';
            this.sage = false;
        },
        create: function () {
            var data = {};
            data['poster'] = this.poster;
            data['subject'] = this.subject;
            data['message'] = this.message;
            data['tag'] = this.tag;

            if (this.sage === 'true') {
                data['sage'] = true;
            }

            if (this.parent_id) {
                data['parent_id'] = this.parent_id;
            }

            service.createPost(data).then(
                (payload) => {
                    this.infoMessage = 'Отправлено!';
                    this.isMessageVisible = true;
                    setTimeout(() =>  {
                        this.isMessageVisible = false;
                        this.infoMessage = '';
                    }, 1000);

                    this.$parent.init();
                    this.init();

                    setTimeout(() => {
                        var el = window.document.getElementById(payload.post_id);
                        this.$nextTick(() => el.scrollIntoView());
                        el.classList.add('post-active');
                    }, 1000);
                },
                (error) => {
                    this.errorMessage = error;
                    this.isErrorVisible = true;
                }
            );
        }
    },
    data: function () {
        return {
            poster: 'Anonymous',
            subject: '',
            message: '',
            sage: false,
            infoMessage: '',
            isMessageVisible: false,
            errorMessage: '',
            isErrorVisible: false
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
