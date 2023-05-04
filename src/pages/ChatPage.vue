<template>
  <div>
    <div class="flex-cols just-icon">
      <q-icon name="face_retouching_natural" size="24" class="icon-face" @click="handleClick" />
    </div>

    <div v-show="showChat" >
      <q-icon name="minimize" size="24" class="icon-closed" @click="handleClosed" />

      <div class="chat-window" id="chat-window">
        <div class="chat-list" id="chat-list">
          <div v-for="chat in chats" :key="chat.id" >
          <q-chat-message
            v-if="chat.role==='sender'"
            sent
            text-color="white"
            bg-color="primary"
          >
            <template v-slot:name>我</template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--sent"
                src="https://cdn.quasar.dev/img/avatar4.jpg"
                width="20"
                alt="">
            </template>
            <div>{{chat.text}}</div>
          </q-chat-message>
          <q-chat-message
            v-else
            bg-color="amber"
          >
            <template v-slot:name>Alian</template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--received"
                src="https://cdn.quasar.dev/img/avatar2.jpg"
                width="20"
                alt="">
            </template>

            <div>
              {{chat.text}}
            </div>
            <q-spinner-dots size="2rem" v-if="loading"/>
          </q-chat-message>
        </div>
        </div>
      </div>
      <div class="chat-input">
        <q-input filled bottom-slots v-model="text" label="" dense placeholder="输入内容。。。" @keydown.enter="handleSend">
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="handleSend" :disable="loading"/>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";

export default defineComponent({
  name: 'ChatPage',
  setup(){
    const $q = useQuasar();
    const showChat = ref(false)
    const text = ref("")
    const loading = ref(false)
    const chats = ref([])
    const chatWindow = ref()
    const chatList = ref()

    let id = 0
    const domain = ref("http://192.168.9.104:3001/mock/56/api/test/");
    async function sendCommand (data) {
      let res = await $q.bex.send('wb.command', {
        data: data
      })
    }

    function handleClick(){
      try {
        sendCommand({
          action:'setChatIframeSize',
          height: 700,
          width:400
        })
        showChat.value = true
      }catch (e) {
        console.log(e)
      }

    }

    function postData(text){
      loading.value = true
      api.post(domain.value,{ text }).then(res=>{
        loading.value = false
        if(res.data.success){
          chats.value.push({
            id:id++,
            text:res.data.data
          })
          nextTick(()=>{
            chatWindow.value.scrollTop = chatList.value.offsetHeight - chatWindow.value.offsetHeight
          })
        }
      })
    }

    function handleClosed(){
      sendCommand({
        action:'setChatIframeSize',
        height: 40,
        width:40
      })
      showChat.value = false
    }

    function handleSend(){
      const value = text.value
      if(value){
        chats.value.push({id:id++,text:value,role:'sender'})
        postData(value)
        text.value = ""
        nextTick(()=>{
          chatWindow.value.scrollTop = chatList.value.offsetHeight - chatWindow.value.offsetHeight
        })
      }
    }

    onMounted(()=>{
      chatWindow.value = document.getElementById('chat-window');
      chatList.value = document.getElementById('chat-list');
    })

    return {
      showChat,
      text,
      chats,
      handleClick,
      handleClosed,
      handleSend,
      loading,
    }
  }
})
</script>
<style lang="scss">

.just-icon{
  width: 30px;
  height: 30px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  color: #f4511e;
}
.icon-face{
  font-size: 30px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  color: #0d47a1;
}
.icon-closed{
  position: fixed;
  font-size: 30px;
  cursor: pointer;
  right: 0;
  top:-14px;
  color: #0d47a1;
}
.chat-window{
  width: 380px;
  text-justify: auto;
  height: 586px;
  overflow: auto;
  margin: 6px;
  position: relative;
}
.chat-input{
  margin: 6px 0 0 12px;
}
.chat-input label{
  padding-bottom: 0;
}
</style>
