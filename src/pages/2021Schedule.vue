<template>
  <Layout>
    <div v-if="warnBrowser" class="mt-2 p-1 bg-orange-200 text-gray-800">
      <p class="text-3xl font-bold">Tip: open in Safari</p>
      Click the three dots in the top left and click "Open in Safari". This will allow you to easily
      switch between your schedule and this website, without loosing your place.
    </div>
    <div class="my-2 rounded max-w-sm overflow-hidden">
      <p class="bg-gradient text-white inline-block p-2 text-xl w-full font-bold">
        New: Auto-updates
      </p>
      <p class="border-t-0 border-2 border-ui-border p-1">
        After adding your schedule to your calendar, it will automatically update when the schedule
        changes.
      </p>
    </div>
    <h1 class="mb-0">Shaker 2021-2022 Schedule</h1>

    <p class="mb-4">
      Use this tool to add your class times to your calendar for the Shaker Heights High School year
      2021-2022.
      <a
        href="https://docs.google.com/document/d/1NO09hg8JbsfhGaH-YjlhP-NVy1SP0VXk8QUEhfEcxYU/edit"
        target="_blank"
        rel="noopener"
        class="italic mb-3"
      >
        Schedule from Shaker
      </a>
    </p>
    <form accept-charset="UTF-8" @submit.prevent="submit">
      <small>
        <b class="text-sm text-ui-emph">5<sup>th</sup></b> Period lunch group assignment
      </small>
      <div class="space-x-2">
        <label v-for="block in ['A', 'B', 'C', 'D']" :key="block" class="inline-flex items-center">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-blue-600"
            :value="block"
            v-model="lunchOdd"
          />
          <span class="ml-1 pl-1 pr-3">{{ block }}</span>
        </label>
      </div>
      <small>
        <b class="text-sm text-ui-emph">6<sup>th</sup></b> Period lunch group assignment
      </small>
      <div class="space-x-2">
        <label v-for="block in ['A', 'B', 'C', 'D']" :key="block" class="inline-flex items-center">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-blue-600"
            :value="block"
            v-model="lunchEven"
          />
          <span class="ml-1 pl-1 pr-3">{{ block }}</span>
        </label>
      </div>
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-2">
        <div v-for="(period, index) in periods" :key="index">
          <div class="grid grid-cols-3">
            <label class="label col-span-2 mr-2">
              <p class="mb-2">Period {{ index + 1 }}</p>
              <input
                :value="period"
                @input="$set(periods, index, $event.target.value)"
                class="input"
                type="text"
                placeholder="Class Name"
              />
            </label>
            <label class="label">
              <p class="mb-2">Room</p>
              <input
                :value="rooms[index]"
                @input="$set(rooms, index, $event.target.value)"
                class="input"
                type="text"
                placeholder="Room"
              />
            </label>
          </div>
        </div>
        <label class="label">
          <p class="mb-2">Crew room</p>
          <input v-model="crewRoom" class="input" type="text" placeholder="Room" />
        </label>
      </div>
      <a class="button bg-ui-primary mr-2" :href="url.url" :disabled="url.error">Download</a>
      <a
        class="button bg-green-500"
        :href="url.url && 'https://calendar.google.com/calendar/r?cid=' + url.url"
        :disabled="url.error"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        Add to Google Calendar
      </a>
      <br />
      <p v-if="url.error" class="mt-2 bg-red-700 p-2 text-white inline-block rounded">
        Your class information is too long. Try making your class names shorter.
      </p>
      <p v-else class="mt-2">
        Download your schedule to import it into your calendar. Click "OK" when prompted.
      </p>
      <p>
        While you're at it, need a map of the school?
        <a
          href="https://www.shaker.org/Downloads/SHHS%20map%202015.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download it here</a
        >.
      </p>
    </form>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { unishox2_compress_simple } from 'unishox2.siara.cc';
import { encode as encodeBase32768 } from 'base32768';

const uid = Math.random().toString(36).substring(7);

@Component({
  metaInfo: {
    title: 'Shaker 2021-2022 Schedule',
    meta: [
      {
        property: 'og:title',
        content: 'Shaker 2021-2022 Schedule',
      },
      {
        name: 'description',
        content:
          'Add your class times to your calendar for the Shaker Heights High School year 2021-2022.',
      },
      {
        property: 'og:description',
        content:
          'Add your class times to your calendar for the Shaker Heights High School year 2021-2022.',
        key: 'og:description',
      },
    ],
  },
})
export default class Schedule2020 extends Vue {
  warnBrowser: false | 'social' = false;
  lunchOdd: 'A' | 'B' | 'C' | 'D' | null = null;
  lunchEven: 'A' | 'B' | 'C' | 'D' | null = null;
  periods = ['', '', '', '', '', '', '', ''];
  rooms = ['', '', '', '', '', '', '', ''];
  crewRoom = '';
  changed = false;

  mounted() {
    if (/(snapchat|instagram)/i.test(navigator.userAgent)) this.warnBrowser = 'social';
  }

  @Watch('periods', { deep: true })
  onChange() {
    if (this.changed) return;
    this.changed = true;
    window._paq.push(['trackEvent', '2020Schedule', 'Touch']);
  }

  get url(): { error: string } | { url: string } {
    const data = JSON.stringify({
      p: this.periods,
      r: this.rooms,
      5: this.lunchOdd || undefined,
      6: this.lunchEven || undefined,
      c: this.crewRoom,
      u: uid,
    });
    const buf = new Uint8Array(512);
    const len = unishox2_compress_simple(data, data.length, buf);
    if (len > buf.length) return { error: 'Too long' };
    const url = `webcal://sched.lights0123.com/s2021/${encodeBase32768(
      new Uint8Array(buf.buffer, 0, len)
    )}`;
    if (url.length > 256) return { error: 'Too long' };
    return { url };
  }
}
</script>
<style scoped lang="scss">
.numeric {
  font-variant-numeric: tabular-nums;
}

.label {
  @apply block text-sm font-bold;
}

.input {
  @apply shadow border border-ui-sidebar rounded py-2 px-3 mb-4 w-full bg-ui-background;
  &:focus {
    @apply ring;
  }

  &:invalid {
    @apply shadow-error;
  }
}

.textarea {
  @apply shadow border border-ui-sidebar rounded py-2 px-3 mb-4 w-full bg-ui-background;
  &:focus {
    @apply ring;
  }

  &:invalid {
    @apply shadow-error;
  }

  min-height: 10em;
}

.button {
  @apply inline-block text-ui-text-inv rounded px-5 py-2 font-bold text-lg;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.75;
  }
}

.bg-gradient {
  background: linear-gradient(135deg, #a13de0 20%, #0b75e0 100%);
}
</style>

<static-query>
query {
  metadata {
    siteUrl
  }
}
</static-query>
