<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer :model-value="drawerIsOpen" @update:model-value="drawerToggled">
      Some Content
    </q-drawer>
    <router-view />
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const $q = useQuasar()
    const drawerIsOpen = ref(true)

    async function drawerToggled () {
      await $q.bex.send('wb.drawer.toggle', {
        open: drawerIsOpen.value // So it knows to make it bigger / smaller
      })

      // Only set this once the promise has resolved so we can see the entire slide animation.
      drawerIsOpen.value = !drawerIsOpen.value
    }

    return { drawerToggled,drawerIsOpen }
  }
})
</script>
