<template>
  <input
    v-model="variableValue"
    :placeholder="placeholder"
    :type="inputType"
    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:font-bold"
  />
</template>

<script>
export default {
  props: {
    field: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Default value',
    },
    inputType: {
      type: String,
      default: 'text',
    },
  },

  computed: {
    variableValue: {
      get() {
        return this.field;
      },
      set(value) {
        this.$emit('update:field', value);
      },
    },
  },
};
</script>
