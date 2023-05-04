<template>
  <div>
    <div class="flex-cols" v-show="showApp">
      <div class="flex-row logo justify-between"><span>Alian</span><q-icon name="face_retouching_natural" size="24" class="icon-face"></q-icon></div>
      <q-btn-toggle
        v-model="model"
        toggle-color="primary"
        push
        padding="20"
        :options="actions"
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
      <div class="title"><q-icon name="domain"/> 域名</div>
      <div class="gap-cols">
        <q-input
          v-model="domain"
          filled
          type="text"
        />
      </div>
    </div>
    <div v-show="!showApp"><q-icon @click="showApp=true" name="face_retouching_natural" size="24" class="icon-face"></q-icon></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { api } from 'boot/axios'
export default defineComponent({
  name: 'InteractionPage',
  setup (props, root) {
    const $q = useQuasar();
    const model = ref(1);
    const raw = ref("");
    const result =  ref("");
    const domain = ref("http://192.168.9.104:3001/mock/56/api/test/");
    const showApp = ref(true);
    const actions = ref([
      {label: '摘要', value: 1,prompt:'请帮我提取这段话的摘要：'},
      {label: '解释', value: 2,prompt:'请帮我解释一下这是什么意思：'},
      {label: '改写', value: 3,prompt:'请帮我改写如下这段文字：'},
      {label: '翻译', value: 4,prompt:'请帮我把如下这段文字翻译为英语：'},
      {label: '扩写', value: 5,prompt:'请帮我根据这句话来扩写一些相关的内容：'},
      {label: '润色', value: 6,prompt:'请帮我润色这段文字：'}
    ])

    function fetchData(){
      const ac = actions.value.find((it)=>it.value === model.value)
      api.post(domain.value,{mode:model.value,raw:ac.prompt + raw.value}).then(res=>{
        if(res.data.success){
          result.value = res.data.data
        }
      })
    }

    watch(()=>model.value, (val)=>{
      if(val && raw.value){
        fetchData()
      }
    },{immediate:true})


    async function sendCommand (data) {
      let res = await $q.bex.send('wb.command', {
        data: data
      })
    }

    onMounted(()=>{
      sendCommand({
        action:'setIframeSize',
        height: 530,
        width:390
      })
      chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
        raw.value = message;
        fetchData()
        sendResponse("rev!")
        return true;
      })
    })
    return {
      model,
      raw,
      result,
      domain,
      showApp,
      actions
    }
  }
})
</script>
<style>
.logo{
  font-size: 20px;
  line-height: 50px;color: #0d47a1;
}
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
.justify-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-face{
  font-size: 22px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
}
</style>
