<template>
  <a target="_blank" :href="snapUrl" rel="noreferrer, noopener">
    <slot v-if="$slots.default" />
    <div v-else class="bg-brand-snap inline-flex p-2 rounded-full items-center" :class="disabled && 'opacity-50 cursor-not-allowed'">
      <Snapchat class="h-6 ml-1 mr-2" />
      <ShareOnSnapText class="h-6 mr-2 mt-1 w-auto" />
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Snapchat from '@/assets/snapchat.svg';
import ShareOnSnapText from '@/assets/share-on-snap.svg';

@Component({components:{Snapchat, ShareOnSnapText}})
export default class ShareOnSnap extends Vue {
  @Prop({ type: String, required: true }) url!: string;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  mounted() {
    console.log(this);
  }

  get snapUrl() {
    return `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(this.url)}`;
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper::v-deep .g-image {
  max-height: 300px;
  object-fit: scale-down;
}
</style>
