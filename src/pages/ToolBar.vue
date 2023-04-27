<template>

    <div>
      <div>我是一个工具栏</div>
      <button @click="sendCommand(1)">sendData</button>
    </div>

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from "quasar";

export default defineComponent({
  name: 'ToolPage',
  setup () {
    const $q = useQuasar();
    async function sendCommand (data) {
      await $q.bex.send('wb.command', {
        data: data
      })
    }
    return { sendCommand }
  }
})
</script>
<style lang="scss">
  body{
    background-color: #f5f5f5;
    display: inline;
  }
</style>
