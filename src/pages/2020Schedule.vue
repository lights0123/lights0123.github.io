<template>
  <Layout>
    <div v-if="warnBrowser" class="bg-orange-200 text-gray-700">
      <p class="text-3xl font-bold">Use Safari for best results</p>
      Without Safari, you won't be able to export your schedule to your calendar.
      <span v-if="warnBrowser === 'social'">
        Click the three dots in the top right corner, and select "Open in Safari".
      </span>
      <span v-else>
        Please re-open this website in Safari.
      </span>
    </div>
    <p class="mt-8 bg-gradient text-white inline-block p-2 rounded text-xl">
      <b class="mr-2">New</b> Updated for Quarter 3: In-Person
    </p>
    <h1 class="mb-0">Shaker 2021 Quarter 3 In Person Class Times</h1>

    <p class="mb-4">
      Use this tool to see your class times for Shaker Heights High School 2021 Quarter 3, and export it to your
      calendar. <span class="italic mb-3">Schedule from
      <a href="https://www.shaker.org/SampleSchedules.aspx" target="_blank" rel="noopener">shaker.org/SampleSchedules.aspx</a>
    </span>
    </p>
    <form accept-charset="UTF-8" @submit.prevent="submit">
      <small>Group Assignment</small>
      <div>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="a" v-model="groupAssignment">
          <span class="ml-2 text-gray-700">Group A</span>
          <span class="ml-2 text-sm text-gray-700">(Last names A-K)</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="b" v-model="groupAssignment">
          <span class="ml-2 text-gray-700">Group B</span>
          <span class="ml-2 text-sm text-gray-700">(Last names L-Z)</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="virtual" v-model="groupAssignment">
          <span class="ml-2 text-gray-700">Virtual</span>
        </label>
      </div>
      <small>5<sup>th</sup> Period Lunch Group Assignment</small>
      <div>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="x" v-model="lunchOdd">
          <span class="ml-2 text-gray-700">Group X</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="y" v-model="lunchOdd">
          <span class="ml-2 text-gray-700">Group Y</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="z" v-model="lunchOdd">
          <span class="ml-2 text-gray-700">Group Z</span>
        </label>
      </div>
      <small>6<sup>th</sup> Period Lunch Group Assignment</small>
      <div>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="x" v-model="lunchEven">
          <span class="ml-2 text-gray-700">Group X</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="y" v-model="lunchEven">
          <span class="ml-2 text-gray-700">Group Y</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="z" v-model="lunchEven">
          <span class="ml-2 text-gray-700">Group Z</span>
        </label>
      </div>
      <share-on-snap class="" url="bruh" />
      <small class="block my-2">Leave fields blank if you don't have a class during that period.</small>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
        <div v-for="(period, index) in periods" :key="index">
          <label class="label" :for="`period${index}`">
            Period {{ index + 1 }}
          </label>
          <input :value="period" @input="$set(periods,index, $event.target.value)" class="input" type="text"
                 placeholder="Class Name"
                 :id="`period${index}`">
        </div>
      </div>
      <label class="flex items-center my-3">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" v-model="includeConferences"
               :disabled="warnBrowser">
        <span class="ml-2">Include Conference Times</span>
      </label>
      <button class="button" type="submit" :disabled="warnBrowser">Download</button>
      <p v-if="warnBrowser" class="mt-2">You can't download the schedule in this browser. Please re-open this website
        in Safari.</p>
      <p v-else class="mt-2">
        Download your schedule to import it into your calendar. Once downloaded, select "Add All".
      </p>
      <h2 class="mt-6">Schedule</h2>
      <div class="sm:grid sm:grid-cols-5">
        <div v-for="day in days" class="mb-4 sm:m-0">
          <h4 class="text-xl">{{ day.day }}</h4>
          <div v-for="c in day.classes" class="mb-2" :style="{ opacity: c.deemph ? 0.75 : 1 }">
            <span class="font-bold mr-2 block">{{ c.start }} - {{ c.end }}</span><span>{{ c.period }}</span>
          </div>
        </div>
      </div>
    </form>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { createEvents, DateArray, EventAttributes as EA } from 'ics';
import { saveAs } from 'file-saver';
import ShareOnSnap from '@/components/ShareOnSnap.vue';

type EventAttributes = EA & {
  busyStatus?: 'BUSY' | 'FREE' | 'TENTATIVE' | 'OOF'
}

function iOSNotSafari(userAgent: string) {
  if (/iP(ad|od|hone)/i.test(userAgent) && /WebKit/i.test(userAgent)) {
    if (/(snapchat|instagram)/i.test(userAgent)) return 'social';
    if (/(CriOS|FxiOS|OPiOS|mercury)/i.test(userAgent)) return true;
  }
  return false;
}

const MONDAY_RECUR = 'FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;UNTIL=20210116T050000Z';
const TUESDAY_RECUR = 'FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;UNTIL=20210116T050000Z';
const WEDNESDAY_RECUR = 'FREQ=WEEKLY;BYDAY=WE,FR;INTERVAL=1;UNTIL=20210116T050000Z';

const classes: ({ monday: DateArray } & ({ tuesday: DateArray } | { wednesday: DateArray }))[] = [
  {
    monday: [2020, 11, 9, 8, 0],
    tuesday: [2020, 11, 2, 8, 30],
  },
  {
    monday: [2020, 11, 9, 8, 45],
    wednesday: [2020, 11, 4, 8, 30],
  },
  {
    monday: [2020, 11, 9, 9, 30],
    tuesday: [2020, 11, 2, 10, 0],
  },
  {
    monday: [2020, 11, 9, 10, 15],
    wednesday: [2020, 11, 4, 10, 0],
  },
  {
    monday: [2020, 11, 9, 11, 55],
    tuesday: [2020, 11, 2, 12, 20],
  },
  {
    monday: [2020, 11, 9, 12, 40],
    wednesday: [2020, 11, 4, 12, 20],
  },
  {
    monday: [2020, 11, 9, 13, 25],
    tuesday: [2020, 11, 2, 13, 50],
  },
  {
    monday: [2020, 11, 9, 14, 10],
    wednesday: [2020, 11, 4, 13, 50],
  },
];

function padTime(time: number) {
  let str = '' + time;
  if (str.length === 1) str = '0' + str;
  return str;
}

function formatTime(date: DateArray) {
  let minutes = date[4] || 0;
  const minString = padTime(minutes);
  if ((date[3] || 0) >= 12) return `${padTime((date[3]! - 12) || 12)}:${minString}PM`;
  return `${padTime(date[3] || 12)}:${minString}AM`;
}

function addMinutes(date: DateArray, minutes: number): DateArray {
  const newDate = [...date];
  newDate[4] = (newDate[4] || 0) + minutes;
  const extra = Math.trunc(newDate[4] / 60);
  newDate[3] = (newDate[3] || 0) + extra;
  newDate[4] %= 60;
  return newDate as DateArray;
}

function addHalfClasses(periods: string[], start: 0 | 1) {
  const day = [];
  for (let i = start; i < periods.length; i += 2) {
    const period = periods[i].trim();
    if (!period) continue;
    const classData = classes[i];
    day.push({
      period,
      start: formatTime('tuesday' in classData ? classData.tuesday : classData.wednesday),
      end: formatTime(addMinutes('tuesday' in classData ? classData.tuesday : classData.wednesday, 80)),
    });
  }
  return day;
}

@Component({
  components: { ShareOnSnap },
  // @ts-ignore
  metaInfo: {
    title: 'Shaker 2021 Quarter 3 Class Times', meta: [{
      property: 'og:title',
      content: 'Shaker 2021 Quarter 3 Class Times',
    },
      {
        name: 'description',
        content: 'See your class times for Shaker Heights High School 2021 Quarter 3, and export it to your calendar',
      },
      {
        property: 'og:description',
        content: 'See your class times for Shaker Heights High School 2021 Quarter 3, and export it to your calendar',
        key: 'og:description',
      }],
  },
})
export default class Schedule2020 extends Vue {
  warnBrowser: boolean | 'social' = false;
  groupAssignment: string | null = null;
  lunchOdd: string | null = null;
  lunchEven: string | null = null;
  includeConferences = true;
  periods = ['', '', '', '', '', '', '', ''];
  changed = false;

  mounted() {
    this.warnBrowser = iOSNotSafari(navigator.userAgent);
  }

  @Watch('periods', { deep: true })
  onChange() {
    if (this.changed) return;
    this.changed = true;
    window._paq.push(['trackEvent', '2020Schedule', 'Touch']);
  }

  get days() {
    const events = [];
    {
      const monday = [];
      for (let i = 0; i < 8; i++) {
        const period = this.periods[i].trim();
        if (!period) continue;
        const classData = classes[i];
        monday.push({ period, start: formatTime(classData.monday), end: formatTime(addMinutes(classData.monday, 40)) });
      }
      monday.push({ period: 'Independent Work Time', start: '02:55PM', end: '04:00PM', deemph: true });
      events.push({ day: 'Monday', classes: monday });
    }
    for (const day of ['Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
      const classes = [];
      classes.push({
        period: ['Tuesday', 'Wednesday'].includes(day) ? 'Independent Work Time' : 'Conferences',
        start: '08:00AM',
        end: '08:30AM',
        deemph: true,
      });
      classes.push(...addHalfClasses(this.periods, ['Tuesday', 'Thursday'].includes(day) ? 0 : 1));
      classes.push({
        period: day === 'Wednesday' ? 'Well Check' : 'Conferences',
        start: '03:20PM',
        end: '04:00PM',
        deemph: true,
      });
      events.push({ day, classes });
    }
    return events;
  }

  submit() {
    const events: EventAttributes[] = [];
    events.push({
      title: 'Well Check',
      start: [2020, 11, 4, 15, 20],
      duration: { minutes: 40 },
      recurrenceRule: 'FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;UNTIL=20210116T050000Z',
      busyStatus: 'BUSY',
    });
    if (this.includeConferences) {
      events.push({
        title: 'Conferences',
        start: [2020, 11, 2, 15, 20],
        duration: { minutes: 40 },
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,TH,FR;INTERVAL=1;UNTIL=20210116T050000Z',
        busyStatus: 'FREE',
      });
      events.push({
        title: 'Conferences',
        start: [2020, 11, 5, 8, 0],
        duration: { minutes: 30 },
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=TH,FR;INTERVAL=1;UNTIL=20210116T050000Z',
        busyStatus: 'FREE',
      });
    }
    for (let i = 0; i < classes.length; i++) {
      const period = this.periods[i].trim();
      if (!period) continue;
      const classData = classes[i];
      events.push({
        title: period,
        start: classData.monday,
        duration: { minutes: 40 },
        recurrenceRule: MONDAY_RECUR,
        busyStatus: 'BUSY',
      });
      events.push({
        title: period,
        start: 'tuesday' in classData ? classData.tuesday : classData.wednesday,
        duration: { hours: 1, minutes: 20 },
        recurrenceRule: 'tuesday' in classData ? TUESDAY_RECUR : WEDNESDAY_RECUR,
        busyStatus: 'BUSY',
      });
    }
    for (const event of events) {
      event.calName = 'Shaker 2020 Quarter 2 Schedule';
    }
    const { error, value } = createEvents(events);
    if (error) {
      return console.error(error);
    }
    console.log(escape(value!));
    saveAs(new Blob([value!], { type: 'text/calendar' }), '2020schedule.ics');
    window._paq.push(['trackEvent', '2020Schedule', 'Submit']);
  }
}
</script>
<style lang="scss">
.numeric {
  font-variant-numeric: tabular-nums;
}

.label {
  @apply block text-sm font-bold mb-2;
}

.input {
  @apply shadow border border-ui-sidebar rounded py-2 px-3 mb-4 w-full bg-ui-background;
  &:focus {
    @apply shadow-outline;
  }

  &:invalid {
    @apply shadow-error;
  }
}

.textarea {
  @apply shadow border border-ui-sidebar rounded py-2 px-3 mb-4 w-full bg-ui-background;
  &:focus {
    @apply shadow-outline;
  }

  &:invalid {
    @apply shadow-error;
  }

  min-height: 10em;
}

.button {
  @apply bg-ui-primary text-ui-text-inv rounded px-6 py-2.5 font-bold;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }
}

.bg-gradient {
  background: linear-gradient(135deg, #a13de0 20%, #0b75e0 100%);
}
</style>
