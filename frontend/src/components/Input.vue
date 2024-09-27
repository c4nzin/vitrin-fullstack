<template>
  <input
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    :type="inputType"
    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:font-bold"
  />
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    modelValue: {
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

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
