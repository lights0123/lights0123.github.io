<template>
  <Layout>
    <h1 class="mt-4">About</h1>
    <p>
      Hello! I'm Ben Schattinger. I enjoy programming in both frontend and low-level applications.
      In the frontend, I like using Vue, Svelte, and TypeScript. I also like Linux and
      <abbr title="platforms without a traditional operating system like Linux or Windows"
        >embedded</abbr
      >
      development in Rust, as well as robotics programming with C++ and ROS.
    </p>
    <br />
    <p>
      <g-link to="/#projects">Check out my various projects</g-link>, or my
      <a target="_blank" href="https://github.com/lights0123">GitHub profile</a>.
    </p>
    <h1 class="mt-8">Contact</h1>
    <contact-form />
  </Layout>
</template>

<script>
import ContactForm from '../components/ContactForm';

export default {
  components: { ContactForm },
  metaInfo: {
    title: 'About',
  },
};
</script>
