<template>
  <div id="root_show">
    <c_app_show />
  </div>
</template>

<script lang="ts">
import { Component,Prop, Vue } from 'vue-property-decorator';
import c_app_show from '@/page/App.vue';
import event_key from '@/util/event_key'

@Component({
  components: {
    c_app_show,
  },
})
export default class RootShow extends Vue {
  private _init_():void{
    let self = this;
  }
  private mounted():void {
    console.log("root.vue mounted");
    this._init_();
  }
}

</script>
