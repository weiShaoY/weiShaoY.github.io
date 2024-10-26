<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const router = useRouter()

console.log('%c Line:4 🥪 router', 'color:#f5ce50', router.currentRoute.value.path)

const selectedOption = ref(router.currentRoute.value.path)
</script>

<template>
  <div
    id="firstFilter"
    class="filter-switch border-2 border-primary"
  >
    <!-- 使用 v-model 绑定到响应式变量 -->
    <input
      id="option1"
      v-model="selectedOption"
      value="/home/about"
      name="options"
      type="radio"
      @change="router.push(selectedOption)"
    >

    <label
      class="option"
      for="option1"
    >
      About
    </label>

    <input
      id="option2"
      v-model="selectedOption"
      value="/home/resume"
      name="options"
      type="radio"
      @change="router.push(selectedOption)"
    >

    <label
      class="option"
      for="option2"
    >
      Resume
    </label>

    <span
      class="background bg-primary"
    />
  </div>
</template>

<style lang="less" scoped>
.filter-switch {
  border-radius: 30px;
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  width: 400px;
  overflow: hidden;
}
.filter-switch input {
  display: none;
}
.filter-switch label {
  flex: 1;
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.5s;
  font-weight: 500;
  font-size: 18px;
}
.filter-switch .background {
  position: absolute;
  width: 49%;
  height: 38px;
  top: 4px;
  left: 4px;
  border-radius: 30px;
  transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
#option2:checked ~ .background {
  left: 50%;
}
#option1:checked + label[for='option1'] {
  color: #212121;
  font-weight: 700;
}
#option2:checked + label[for='option2'] {
  color: #212121;
  font-weight: 700;
}
// #option1:not(:checked) + label[for='option1'],
// #option2:not(:checked) + label[for='option2'] {
//   color: #7d7d7d;
// }
</style>
