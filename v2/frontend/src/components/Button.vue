<template>
  <div>
    <button
      type="submit"
      class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-800 text-lg"
    >
      {{ text }}
    </button>
  </div>
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
