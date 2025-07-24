<template>
  <form @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

type InputRef = { validate: () => boolean | Promise<boolean> }

const inputs = ref<InputRef[]>([])

provide('registerInput', (inputRef: InputRef) => {
  inputs.value.push(inputRef)
})

const validate = (): Promise<boolean> => {
  return Promise.all(inputs.value.map((i) => i.validate())).then((results) =>
    results.every((r) => r === true),
  )
}

defineExpose({ validate })

const emit = defineEmits(['submit'])

const handleSubmit = async () => {
  const isValid = await validate()
  if (isValid) {
    emit('submit')
  }
}
</script>
