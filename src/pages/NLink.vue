<template>
  <Layout>
    <div class="mt-4 -mb-2 flex items-center">
      <Logo class="h-16 w-16 mr-2 inline" />
      <h1 class="m-0 text-6xl">N-Link</h1></div>
    <p class="text-2xl">
      Free, cross-platform, CX-II compatible computer linking program for the TI-Nspire.
    </p>
    <br>
    <h2 class="text-3xl">Download {{ releases ? releases.version : '' }}</h2>
    <div v-if="releases" class="grid xl:grid-cols-6 md:grid-cols-2 gap-4">
      <a href="https://n-link.lights0123.com" target="_blank" rel="noopener"
         class="xl:col-span-3 py-3 bg-gray-600 flex justify-center items-center text-white"
         :class="webUSB && 'bg-gradient'">
        <Windows class="w-8 h-8 mr-4" />
        <div class="text-center">
          <p class="font-bold">Open on the Web</p>
          <p v-if="webUSB">Chrome-based browsers</p>
          <p v-else>Requires a Chrome-based browser</p>
        </div>
      </a>
      <a class="xl:col-span-3 py-3 bg-blue-700 flex justify-center items-center text-white"
         href="https://github.com/lights0123/n-link"
         target="_blank" rel="noopener">
        <Github class="w-8 h-8 mr-4" />
        <div class="text-center">
          <p class="font-bold">Source code</p>
          <p>GPL v3.0</p>
        </div>
      </a>
      <a :href="releases.msi" target="_blank" rel="noopener"
         class="xl:col-span-2 py-3 bg-blue-700 flex justify-center items-center text-white">
        <Windows class="w-8 h-8 mr-4" />
        <div class="text-center">
          <p class="font-bold">Windows</p>
          <p>.msi</p>
        </div>
      </a>
      <a :href="releases.dmg" target="_blank" rel="noopener"
         class="xl:col-span-2 py-3 bg-blue-700 flex justify-center items-center text-white">
        <Apple class="w-8 h-8 mr-4" />
        <div class="text-center">
          <p class="font-bold">macOS</p>
          <p>.dmg</p>
        </div>
      </a>
      <div class="xl:col-span-2 grid grid-cols-2 gap-1">
        <a :href="releases.appimage" target="_blank" rel="noopener"
           class="py-3 bg-blue-700 flex justify-center items-center text-white">
          <Linux class="w-8 h-8 mr-4" />
          <div class="text-center">
            <p class="font-bold">Linux</p>
            <p>.AppImage</p>
          </div>
        </a>
        <a :href="releases.deb" target="_blank" rel="noopener"
           class="py-3 bg-blue-700 flex justify-center items-center text-white">
          <Ubuntu class="w-8 h-8 mr-4" />
          <div class="text-center">
            <p class="font-bold">Debian/Ubuntu</p>
            <p>.deb</p>
          </div>
        </a>
      </div>
    </div>
    <div v-else class="my-12 grid sm:grid-cols-2 gap-4">
      <a href="https://n-link.lights0123.com" target="_blank" rel="noopener"
         class="py-3 bg-gray-600 flex justify-center items-center text-white"
         :class="webUSB && 'bg-gradient'">
        <Windows class="w-8 h-8 mr-4" />
        <div class="text-center">
          <p class="font-bold">Open on the Web</p>
          <p v-if="webUSB">Chrome-based browsers</p>
          <p v-else>Requires a Chrome-based browser</p>
        </div>
      </a>
      <a href="https://github.com/lights0123/n-link/releases/latest" target="_blank"
         rel="noopener" class="px-4 py-6 bg-blue-700 text-white flex justify-center items-center">
        Download on GitHub
      </a>
    </div>
    <h2 class="text-3xl mt-4">Screenshots</h2>
    <div class="lg:grid grid-cols-2 gap-8">
      <figure>
        <img src="@/assets/n-link/main.png" />
        <figcaption>N-Link</figcaption>
      </figure>
      <figure>
        <img src="@/assets/n-link/queue.png" />
        <figcaption>Queue up multiple actions</figcaption>
      </figure>
      <figure>
        <img src="@/assets/n-link/hidden.png" />
        <figcaption>View hidden files</figcaption>
      </figure>
      <figure>
        <img src="@/assets/n-link/terminal.png" />
        <figcaption>Use the command-line interface <em>(Linux and macOS only)</em></figcaption>
      </figure>
    </div>
    <h2 class="text-3xl mt-4">Features</h2>
    <ul>
      <li>Connect to multiple calculators, including CX II models</li>
      <li>Browse, rename, upload, and download files</li>
      <li>Upload a new OS</li>
      <li>View calculator software version information</li>
      <li>
        Queue up actions to be done later: upload and download multiple files and N-Link will automatically perform
        them when ready
      </li>
    </ul>
    <h2 class="text-3xl mt-4">To do</h2>
    <ul>
      <li><p>
        Screenshots: blocked by
        <a href="https://github.com/Vogtinator/libnspire/issues/1" target="_blank"
           rel="noopener">Vogtinator/libnspire#1</a>
      </p></li>
      <li>CLI on Windows</li>
      <li>One-click Ndless installation</li>
      <li>Automatic OS downloading</li>
      <li>Drag & Drop</li>
    </ul>
    <h2 class="text-3xl mt-4">Installation Instructions</h2>
    <h3 class="text-2xl mt-4" id="windows">Windows</h3>
    <p class="my-2">N-Link requires some generic USB drivers, rather than the ones that TI provides. To install them,
      download <a href="https://zadig.akeo.ie/" target="_blank" rel="noopener">Zadig</a> and open it. First, select
      "Options" at the top and check "List All Devices":</p>
    <img src="@/assets/n-link/zadig-all.png" />
    <p class="my-2">Next, select "TI-Nspire(tm) Handheld" in the dropdown menu, and click "Replace Driver":</p>
    <img src="@/assets/n-link/zadig-replace.png" />
    <p class="my-2">Now, you're all set. Unplug and plug the calculator back in to use it, and then launch N-Link.</p>
    <p class="my-2">If you get a "Windows protected your PC" SmartScreen notice when attempting to install N-Link,
      select "More info", and then click "Run anyway".</p>
    <hr class="my-6">
    <p class="my-2">If you'd like to use the official TI-Nspire software again, you'll need to uninstall the WinUSB
      driver. To do so, right-click on the start menu and select "Device Manager". Expand "Universal Serial Bus
      Devices", right-click on "TI-Nspire(tm) Handheld", and click "Uninstall device":</p>
    <img src="@/assets/n-link/driver-uninstall.png" />
    <p class="my-2">Now, check "Delete the driver software for this device":</p>
    <img src="@/assets/n-link/driver-delete.png" />
    <p class="my-2">After unplugging the calculator and plugging it back in, you're all set to go.</p>
    <h3 class="text-2xl mt-4" id="mac">macOS</h3>
    <p>If you get some permission denied errors, follow this guide by Apple:
      <a href="https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac"
         target="_blank" rel="noopener">
        https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac
      </a>
    </p>
    <h3 class="text-2xl mt-4" id="linux">Linux</h3>
    <h4 class="text-xl mt-4" id="deb">Deb</h4>
    Run <code>sudo dpkg -i n-link_version_amd64.deb</code>
    <h4 class="text-xl mt-4" id="appimage">AppImage</h4>
    <p>
      Run <code>chmod +x n-link_version_amd64.AppImage && ./n-link_version_amd64.AppImage</code>. After that, you'll
      likely be able to simply double-click the file from then on.
    </p>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Apple from '@/assets/apple.svg';
import Windows from '@/assets/windows.svg';
import Linux from '@/assets/linux.svg';
import Ubuntu from '@/assets/ubuntu.svg';
import Github from '@/assets/github.svg';
import Logo from '@/assets/n-link/logo.svg';

interface Asset {
  name: string;
  browser_download_url: string;
}

const description = 'Free, cross-platform, CX-II compatible computer linking program for the TI-Nspire.';
@Component({
  components: { Apple, Windows, Linux, Ubuntu, Github, Logo },
  metaInfo: {
    title: 'N-Link',
    meta: [
      {
        property: 'og:type',
        content: 'article',
        key: 'og:type',
      },
      {
        property: 'og:title',
        content: 'N-Link',
      },
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:description',
        content: description,
        key: 'og:description',
      },
    ],
  },
})
export default class NLink extends Vue {
  releases: { version: string; msi: string; dmg: string; appimage: string; deb: string } | null = null;
  // releases: { version: string; msi: string; dmg: string; appimage: string; deb: string } | null = {
  //   version: '1',
  //   msi: 'a',
  //   dmg: 'a',
  //   appimage: 'a',
  //   deb: 'a',
  // };

  async mounted() {
    const { tag_name, assets } = await (await fetch('https://api.github.com/repos/lights0123/n-link/releases/latest')).json() as { tag_name: string; assets: Asset[] };
    const msi = assets.find(({ name }) => name.endsWith('msi'));
    const dmg = assets.find(({ name }) => name.endsWith('dmg'));
    const appimage = assets.find(({ name }) => name.endsWith('AppImage'));
    const deb = assets.find(({ name }) => name.endsWith('deb'));
    if (!msi || !dmg || !appimage || !deb) return;
    this.releases = {
      version: tag_name,
      msi: msi.browser_download_url,
      dmg: dmg.browser_download_url,
      appimage: appimage.browser_download_url,
      deb: deb.browser_download_url,
    };
    console.log(this.releases);
  }

  get webUSB() {
    return process.isClient && !!(navigator as any).usb;
  }
};
</script>
<style lang="scss" scoped>
ul {
  @apply list-outside list-disc ml-4;
}

.bg-gradient {
  background: linear-gradient(135deg, #a13de0 20%, #0b75e0 100%);
  @apply shadow-2xl rounded;
  transition: transform 0.2s, border-radius 0.2s;

  &:hover {
    transform: scale(1.01);
    @apply rounded-lg;
  }
}
</style>
