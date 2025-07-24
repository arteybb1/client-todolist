<template>
  <div class="mb-4">
    <div class="input-login-wrapper">
      <input
        v-model="inputValue"
        :type="type"
        @blur="handleBlur"
        placeholder=" "
        class="input-login"
      />
      <div class="input-text">
        {{ placeholder }}
      </div>
    </div>
    <p v-show="error" class="text-error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, onMounted } from 'vue'

interface Rule {
  required?: boolean
  message?: string
  minLength?: number
}

const props = defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  rules?: Rule[]
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)
const error = ref('')
const type = ref(props.type || 'text')

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val
  },
)

watch(inputValue, (val) => {
  emit('update:modelValue', val)
})

const handleBlur = () => {
  validate()
}

const validate = (): boolean => {
  error.value = ''
  for (const rule of props.rules || []) {
    if (rule.required && !inputValue.value) {
      error.value = rule.message || 'Required'
      return false
    }
    if (rule.minLength !== undefined && inputValue.value.length < rule.minLength) {
      error.value = rule.message || `ต้องกรอกอย่างน้อย ${rule.minLength} ตัวอักษร`
      return false
    }
  }
  return true
}

defineExpose({ validate })

const registerInput = inject<(input: any) => void>('registerInput')
onMounted(() => {
  registerInput?.({ validate })
})
</script>

<style scoped>
.input-login-wrapper {
  border: 1px solid #ccc;
  height: 50px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: border 0.3s;
}

.input-login-wrapper:focus-within {
  border: 3px solid rgb(233, 20, 20);
}

.input-text {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 16px;
  z-index: 1;
  pointer-events: none;
  color: #888;
  transition: all 0.3s;
}

.input-login:focus + .input-text,
.input-login:not(:placeholder-shown) + .input-text {
  top: 5px;
  font-size: 12px;
}

.input-login {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  padding: 20px 10px 5px 10px;
  font-size: 16px;
  background: transparent;
  z-index: 2;
  cursor: pointer;
}

.input-login:focus {
  outline: none;
}

.text-error {
  color: red;
  font-size: 13px;
  animation: down 0.4s;
}

.mb-4 {
  margin-bottom: 10px;
}

@keyframes down {
  from {
    transform: translateY(-5px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
