<template>
    <q-list  bordered separator ref="menuRef">
      <q-item clickable v-ripple @click="go">
        <q-item-section avatar>
          <q-icon name="book"/>
        </q-item-section>
        <q-item-section>摘要</q-item-section>
        <q-item-section side>提取摘要</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="menu_book" />
        </q-item-section>
        <q-item-section>解释</q-item-section>
        <q-item-section side>解释文本</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="edit_note" />
        </q-item-section>
        <q-item-section>改写</q-item-section>
        <q-item-section side>改写内容</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="g_translate" />
        </q-item-section>
        <q-item-section>翻译</q-item-section>
        <q-item-section side>翻译选择</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="draw" />
        </q-item-section>
        <q-item-section>扩写</q-item-section>
        <q-item-section side>扩展内容</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="3p"/>
        </q-item-section>
        <q-item-section>问答</q-item-section>
        <q-item-section side>打开对话</q-item-section>
      </q-item>
    </q-list>
</template>
<script>
import { defineComponent, onMounted,ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'ToolPage',
  setup () {
    const $q = useQuasar();
    const menuRef = ref();
    const router = useRouter()
    async function sendCommand (data) {
      let res = await $q.bex.send('wb.command', {
        data: data
      })
    }

    function go(){
      sendCommand({
        action:'setIframeSize',
        height: 530,
        width:390
      })
      router.push('/interaction')
    }
    onMounted(()=>{
      chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
        console.log(message)
        sendResponse("rev!")
        return true;
      })
      sendCommand({
        action:'setIframeSize',
        height: 390,
        width:360
      })
    })
    return { sendCommand,menuRef,go }
  }
})
</script>
<style lang="scss">
  body{

  }
</style>
