<template>
  <button
    type="submit"
    class="w-full p-3 bg-black text-white rounded-md hover:bg-slate-900 transition ease-in-out delay-300 text-lg"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    text: {
      type: String,
      default: 'Button Text',
    },
  },
};
</script>
