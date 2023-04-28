<template>
  <div class="flex-cols">
    <q-btn-toggle
      v-model="model"
      toggle-color="primary"
      push
      :options="[
        {label: '摘要', value: 1},
        {label: '解释', value: 2},
        {label: '改写', value: 3},
        {label: '翻译', value: 4},
        {label: '扩写', value: 5},
        {label: '问答', value: 6}
      ]"
    />
    <div class="title"><q-icon name="border_color"/> 输入</div>
    <div class="gap-cols">
      <q-input
        v-model="raw"
        filled
        type="textarea"
        disable
        rows="4"
      />
    </div>
    <div class="title"><q-icon name="bubble_chart"/> 结果</div>
    <div class="gap-cols">
      <q-input
        v-model="result"
        filled
        type="textarea"
        rows="4"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue'
import { useQuasar } from "quasar";

export default defineComponent({
  name: 'InteractionPage',
  setup () {
    const $q = useQuasar();
    async function sendCommand (data) {
      let res = await $q.bex.send('wb.command', {
        data: data
      })
    }
    return {
      model: ref(1),
      raw: ref("这个内容"),
      result: ref("这个结果"),
    }
  }
})
</script>
<style>
.title{
  margin-top: 20px;
  font-weight: bold;
  color: #0d47a1;
}
.raw-text{
  border: 1px solid #ccc;
  height: 8em;
  padding: 10px;
  overflow: auto;
  border-radius: 5px;
}
.gap-cols {
  margin-top: 10px;
}
</style>
