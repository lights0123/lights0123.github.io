<template>
  <Layout>
    <div v-if="warnBrowser" class="bg-orange-200">
      <p class="text-3xl font-bold">Use Safari for best results</p>
      Without Safari, you won't be able to export your schedule to your calendar.
      <span v-if="warnBrowser === 'social'">
        Click the share button in the bottom-right corner and select "Open in Safari".
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
          <span class="ml-2">Group A</span>
          <span class="ml-2 text-sm">(Last names A-K)</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="b" v-model="groupAssignment">
          <span class="ml-2">Group B</span>
          <span class="ml-2 text-sm">(Last names L-Z)</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="v" v-model="groupAssignment">
          <span class="ml-2">Virtual</span>
        </label>
      </div>
      <small>5<sup>th</sup> Period Lunch Group Assignment</small>
      <div>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="x" v-model="lunchOdd">
          <span class="ml-2">Group X</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="y" v-model="lunchOdd">
          <span class="ml-2">Group Y</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="z" v-model="lunchOdd">
          <span class="ml-2">Group Z</span>
        </label>
      </div>
      <small>6<sup>th</sup> Period Lunch Group Assignment</small>
      <div>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="x" v-model="lunchEven">
          <span class="ml-2">Group X</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="y" v-model="lunchEven">
          <span class="ml-2">Group Y</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" class="form-radio h-5 w-5 text-blue-600" value="z" v-model="lunchEven">
          <span class="ml-2">Group Z</span>
        </label>
      </div>
      <share-on-snap v-if="snap" :disabled="!groupAssignment || !lunchOdd || !lunchEven"
                     :url="$static.metadata.siteUrl + $url(`/2020-schedule/${groupAssignment}${lunchOdd}${lunchEven}.html`)" />
      <small class="block my-2">Leave fields blank if you don't have a class during that
        period.{{
          groupAssignment !== 'v' ? ' Study halls will automatically be inserted, but you should still include the room number.' : ''
        }}</small>
      <div class="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 sm:gap-4">
        <div v-for="(period, index) in periods" :key="index">
          <div class="grid-cols-3" :class="groupAssignment !== 'v' && 'grid'">
            <label class="label col-span-2" :class="groupAssignment !== 'v' && 'mr-2'">
              <p class="mb-2">Period {{ index + 1 }}</p>
              <input
                  :value="period"
                  @input="$set(periods, index, $event.target.value)"
                  class="input"
                  type="text"
                  placeholder="Class Name">
            </label>
            <label v-if="groupAssignment !== 'v'" class="label">
              <p class="mb-2">Room number</p>
              <input
                  :value="rooms[index]"
                  @input="$set(rooms, index, $event.target.value)"
                  class="input"
                  type="text"
                  placeholder="Room">
            </label>
          </div>
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

type DateTimeArray = [number, number, number, number, number];

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

const MONDAY_RECUR = 'FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;UNTIL=20210320T050000Z';
const TU_RECUR = 'FREQ=WEEKLY;BYDAY=TU;INTERVAL=1;UNTIL=20210320T050000Z';
const WE_RECUR = 'FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;UNTIL=20210320T050000Z';
const TH_RECUR = 'FREQ=WEEKLY;BYDAY=TH;INTERVAL=1;UNTIL=20210320T050000Z';
const FR_RECUR = 'FREQ=WEEKLY;BYDAY=FR;INTERVAL=1;UNTIL=20210320T050000Z';

const APPLE_LOCATION = `\r\nX-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS="15911 Aldersyde Dr, Clevel
 and, OH  44120, United States";X-APPLE-MAPKIT-HANDLE=CAESmgIIrk0Q69mC+7bdnd
 t0GhIJxk0NNJ+8REARKzm4/3hkVMAieAoNVW5pdGVkIFN0YXRlcxICVVMaBE9oaW8iAk9IKghDd
 XlhaG9nYTIOU2hha2VyIEhlaWdodHM6BTQ0MTIwQgZPbmF3YXlSDEFsZGVyc3lkZSBEcloFMTU5
 MTFiEjE1OTExIEFsZGVyc3lkZSBEcooBBk9uYXdheSoaU2hha2VyIEhlaWdodHMgSGlnaCBTY2h
 vb2wyEjE1OTExIEFsZGVyc3lkZSBEcjIUQ2xldmVsYW5kLCBPSCAgNDQxMjAyDVVuaXRlZCBTdG
 F0ZXM4L1omCiQI69mC+7bdndt0EhIJxk0NNJ+8REARKzm4/3hkVMAYrk2QAwE=;X-APPLE-RADI
 US=141.5054853352788;X-APPLE-REFERENCEFRAME=1;X-TITLE=Shaker Heights High S
 chool:geo:41.473608,-81.569885`;

const noSchoolDays = [
  [2021, 2, 12],
  [2021, 2, 15],
  [2021, 2, 16],
];

function generateExDate(time: DateTimeArray) {
  return '\r\n' + noSchoolDays.map(day => 'EXDATE:' + formatIcalDate([...day, time[3], time[4]])).join('\r\n');
}

const classes: ({ monday: DateTimeArray } & ({ tuesday: DateTimeArray } | { wednesday: DateTimeArray }))[] = [
  {
    monday: [2021, 1, 25, 8, 0],
    tuesday: [2021, 1, 19, 9, 0],
  },
  {
    monday: [2021, 1, 25, 8, 45],
    wednesday: [2021, 1, 20, 9, 0],
  },
  {
    monday: [2021, 1, 25, 9, 30],
    tuesday: [2021, 1, 19, 10, 25],
  },
  {
    monday: [2021, 1, 25, 10, 15],
    wednesday: [2021, 1, 20, 10, 25],
  },
  {
    monday: [2021, 1, 25, 11, 45],
    tuesday: [2021, 1, 19, 11, 50],
  },
  {
    monday: [2021, 1, 25, 13, 15],
    wednesday: [2021, 1, 20, 11, 50],
  },
  {
    monday: [2021, 1, 25, 14, 0],
    tuesday: [2021, 1, 19, 13, 50],
  },
  {
    monday: [2021, 1, 25, 14, 45],
    wednesday: [2021, 1, 20, 13, 50],
  },
];

const lunchTimes: Record<'x' | 'y' | 'z', DateTimeArray> = {
  x: [0, 0, 0, 11, 50],
  y: [0, 0, 0, 12, 30],
  z: [0, 0, 0, 13, 15],
};

function copyDate(time: DateTimeArray, date: DateArray): DateTimeArray {
  const newTime = time.slice() as DateTimeArray;
  newTime[0] = date[0];
  newTime[1] = date[1];
  newTime[2] = date[2];
  return newTime;
}

function padTime(time: number) {
  let str = '' + time;
  if (str.length === 1) str = '0' + str;
  return str;
}

function formatTime(date: DateTimeArray) {
  let minutes = date[4] || 0;
  const minString = padTime(minutes);
  if ((date[3] || 0) >= 12) return `${padTime((date[3]! - 12) || 12)}:${minString}PM`;
  return `${padTime(date[3] || 12)}:${minString}AM`;
}

function formatIcalDate(args: number[] = []) {
  const pad = (n: number) => n < 10 ? `0${n}` : `${n}`;
  if (args.length === 3) {
    const [year, month, date] = args;
    return `${year}${pad(month)}${pad(date)}`;
  }

  let outDate = new Date(new Date().setUTCSeconds(0, 0));
  if (args.length > 0 && args[0]) {
    const [year, month, date, hours = 0, minutes = 0, seconds = 0] = args;
    outDate = new Date(year, month - 1, date, hours, minutes, seconds);
  }

  return [
    outDate.getUTCFullYear(),
    pad(outDate.getUTCMonth() + 1),
    pad(outDate.getUTCDate()),
    'T',
    pad(outDate.getUTCHours()),
    pad(outDate.getUTCMinutes()),
    pad(outDate.getUTCSeconds()),
    'Z',
  ].join('');
}

function addMinutes(date: DateTimeArray, minutes: number): DateTimeArray {
  const newDate = date.slice() as DateTimeArray;
  newDate[4] = (newDate[4] || 0) + minutes;
  const extra = Math.trunc(newDate[4] / 60);
  newDate[3] = (newDate[3] || 0) + extra;
  newDate[4] %= 60;
  return newDate;
}

function addHalfClasses(periods: string[], start: 0 | 1, lunch?: 'x' | 'y' | 'z' | null) {
  const day = [];
  for (let i: number = start; i < periods.length; i += 2) {
    const period = periods[i].trim();
    if (!period) continue;
    const classData = classes[i];
    if ((i === 4 || i === 5) && lunch) {
      if (lunch === 'x') {
        day.push({
          period: 'Lunch',
          deemph: true,
          start: formatTime(lunchTimes[lunch]),
          end: formatTime(addMinutes(lunchTimes[lunch], 30)),
        });
        day.push({
          period,
          start: formatTime(addMinutes(lunchTimes[lunch], 40)),
          end: formatTime(addMinutes('tuesday' in classData ? classData.tuesday : classData.wednesday, 80)),
        });
      } else if (lunch === 'y') {
        day.push({
          period,
          start: formatTime('tuesday' in classData ? classData.tuesday : classData.wednesday),
          end: formatTime(addMinutes('tuesday' in classData ? classData.tuesday : classData.wednesday, 40)),
        });
        day.push({
          period: 'Lunch',
          deemph: true,
          start: formatTime(lunchTimes[lunch]),
          end: formatTime(addMinutes(lunchTimes[lunch], 30)),
        });
        day.push({
          period,
          start: formatTime(addMinutes(lunchTimes[lunch], 35)),
          end: formatTime(addMinutes('tuesday' in classData ? classData.tuesday : classData.wednesday, 80)),
        });
      } else {
        day.push({
          period,
          start: formatTime('tuesday' in classData ? classData.tuesday : classData.wednesday),
          end: formatTime(addMinutes('tuesday' in classData ? classData.tuesday : classData.wednesday, 80)),
        });
        day.push({
          period: 'Lunch',
          deemph: true,
          start: formatTime(lunchTimes[lunch]),
          end: formatTime(addMinutes(lunchTimes[lunch], 30)),
        });
      }
    } else {
      day.push({
        period,
        start: formatTime('tuesday' in classData ? classData.tuesday : classData.wednesday),
        end: formatTime(addMinutes('tuesday' in classData ? classData.tuesday : classData.wednesday, 80)),
      });
    }
  }
  return day;
}

function formatRoom(room: string) {
  let partial = room.trim().replace(/^(?:room\s*)?(\d+)$/i, 'Room $1');
  if (partial) partial += '\n';
  return partial + `Shaker Heights High School
15911 Aldersyde Dr, Cleveland, OH  44120, United States`;
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
  lunchOdd: 'x' | 'y' | 'z' | null = null;
  lunchEven: 'x' | 'y' | 'z' | null = null;
  includeConferences = true;
  periods = ['', '', '', '', '', '', '', ''];
  rooms = ['', '', '', '', '', '', '', ''];
  changed = false;

  get snap() {
    return 'snap' in this.$route.query;
  }

  mounted() {
    this.warnBrowser = iOSNotSafari(navigator.userAgent);
  }

  get withStudyHalls() {
    const firstPeriod = this.periods.findIndex(period => !!period);
    if (firstPeriod === -1) return this.periods;
    const lastPeriod = this.periods.length - this.periods.slice().reverse().findIndex(period => !!period);
    const newPeriods = this.periods.slice();
    for (let i = firstPeriod; i < lastPeriod; i++) {
      if (!newPeriods[i]) newPeriods[i] = 'Study Hall';
    }
    return newPeriods;
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
        if (i === 5) {
          monday.push({ period: 'Crew Time', start: '12:30PM', end: '01:10PM' });
        }
        const period = this.periods[i].trim();
        if (!period) continue;
        const classData = classes[i];
        monday.push({ period, start: formatTime(classData.monday), end: formatTime(addMinutes(classData.monday, 40)) });
      }
      events.push({ day: 'Monday', classes: monday });
    }
    for (const day of ['Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
      const classes = [];
      const inPerson = (this.groupAssignment === 'a' && ['Tuesday', 'Wednesday'].includes(day)) || (this.groupAssignment === 'b' && ['Thursday', 'Friday'].includes(day));
      if (['Tuesday', 'Wednesday', 'Friday'].includes(day) && !(this.groupAssignment === 'a' && day === 'Friday') && !(this.groupAssignment === 'b' && ['Tuesday', 'Wednesday'].includes(day))) {
        classes.push({
          period: 'Conferences',
          start: day === 'Wednesday' ? '08:30AM' : '08:00AM',
          end: '09:00AM',
          deemph: true,
        });
      }
      const isOdd = ['Tuesday', 'Thursday'].includes(day);
      classes.push(...addHalfClasses(inPerson ? this.withStudyHalls : this.periods, isOdd ? 0 : 1, isOdd ? this.lunchOdd : this.lunchEven));
      events.push({ day, classes });
    }
    return events;
  }

  submit() {
    const events: EventAttributes[] = [];
    events.push({
      title: 'Crew Time',
      start: [2021, 1, 25, 12, 30],
      duration: { minutes: 40 },
      recurrenceRule: MONDAY_RECUR,
      busyStatus: 'BUSY',
    });
    if (this.includeConferences) {
      if(this.groupAssignment !== 'a') {
        events.push({
          title: 'Conferences',
          start: [2021, 1, 19, 8, 0],
          duration: { hours: 1 },
          recurrenceRule: TU_RECUR,
          busyStatus: 'FREE',
        });
        events.push({
          title: 'Conferences',
          start: [2021, 1, 20, 8, 30],
          duration: { minutes: 30 },
          recurrenceRule: WE_RECUR,
          busyStatus: 'FREE',
        });
      }
      if(this.groupAssignment !== 'b') {
        events.push({
          title: 'Conferences',
          start: [2021, 1, 22, 8, 0],
          duration: { hours: 1 },
          recurrenceRule: FR_RECUR,
          busyStatus: 'FREE',
        });
      }
    }
    for (let i = 0; i < classes.length; i++) {
      const period = this.periods[i].trim();
      if (!period) continue;
      const classData = classes[i];
      events.push({
        title: period,
        start: classData.monday,
        duration: { minutes: 40 },
        recurrenceRule: MONDAY_RECUR + generateExDate(classData.monday),
        busyStatus: 'BUSY',
      });
    }
    for (let thurFri = 0; thurFri < 2; thurFri++) {
      for (let i = 0; i < classes.length; i++) {
        const inSchool = (this.groupAssignment === 'a' && !thurFri) || (this.groupAssignment === 'b' && thurFri);
        const period = (inSchool ? this.withStudyHalls : this.periods)[i].trim();
        if (!period) continue;
        const classData = classes[i];
        const isOdd = 'tuesday' in classData;
        const weekdayStart = ('tuesday' in classData ? classData.tuesday : classData.wednesday).slice() as DateTimeArray;
        if (thurFri) weekdayStart[2] += 2;
        const lunch = isOdd ? this.lunchOdd : this.lunchEven;
        const recurrenceRule = (isOdd ? (thurFri ? TH_RECUR : TU_RECUR) : (thurFri ? FR_RECUR : WE_RECUR)) + (inSchool ? APPLE_LOCATION : '');
        if ((i === 4 || i === 5) && lunch) {
          if (lunch === 'x') {
            events.push({
              title: 'Lunch',
              start: copyDate(lunchTimes[lunch], weekdayStart),
              duration: { minutes: 30 },
              recurrenceRule,
              busyStatus: 'FREE',
              ...(inSchool ? {
                location: formatRoom('Cafeteria'),
              } : {}),
            });
            events.push({
              title: period,
              start: copyDate(addMinutes(lunchTimes[lunch], 40), weekdayStart),
              duration: { hours: 1, minutes: 15 },
              recurrenceRule,
              busyStatus: 'BUSY',
              ...(inSchool ? {
                location: formatRoom(this.rooms[i]),
              } : {}),
            });
          } else if (lunch === 'y') {
            events.push({
              title: period,
              start: weekdayStart,
              duration: { minutes: 40 },
              recurrenceRule,
              busyStatus: 'BUSY',
              ...(inSchool ? {
                location: formatRoom(this.rooms[i]),
              } : {}),
            });
            events.push({
              title: 'Lunch',
              start: copyDate(lunchTimes[lunch], weekdayStart),
              duration: { minutes: 30 },
              recurrenceRule,
              busyStatus: 'FREE',
              ...(inSchool ? {
                location: formatRoom('Cafeteria'),
              } : {}),
            });
            events.push({
              title: period,
              start: copyDate(addMinutes(lunchTimes[lunch], 35), weekdayStart),
              duration: { minutes: 40 },
              recurrenceRule,
              busyStatus: 'BUSY',
              ...(inSchool ? {
                location: formatRoom(this.rooms[i]),
              } : {}),
            });
          } else {
            events.push({
              title: period,
              start: weekdayStart,
              duration: { hours: 1, minutes: 20 },
              recurrenceRule,
              busyStatus: 'BUSY',
              ...(inSchool ? {
                location: formatRoom(this.rooms[i]),
              } : {}),
            });
            events.push({
              title: 'Lunch',
              start: copyDate(lunchTimes[lunch], weekdayStart),
              duration: { minutes: 30 },
              recurrenceRule,
              busyStatus: 'FREE',
              ...(inSchool ? {
                location: formatRoom('Cafeteria'),
              } : {}),
            });
          }
        } else {
          events.push({
            title: period,
            start: weekdayStart,
            duration: { hours: 1, minutes: 20 },
            recurrenceRule,
            busyStatus: 'BUSY',
            ...(inSchool ? {
              location: formatRoom(this.rooms[i]),
            } : {}),
          });
        }
      }
    }
    for (const event of events) {
      event.calName = 'Shaker 2020 Quarter 3 Schedule';
      if(event.recurrenceRule) {
        event.recurrenceRule += generateExDate(event.start as DateTimeArray);
      }
    }
    console.log(events);
    const { error, value } = createEvents(events);
    if (error) {
      return console.error(error);
    }
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

<static-query>
query {
  metadata {
    siteUrl
  }
}
</static-query>
