<template>
  <li
    :class="{ completed: todo.done, editing: editing }"
    class="todo"
  >
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      />
      <label
        @dblclick="editing = true"
        v-text="todo.text"
      />
      <button
        class="destroy"
        @click="deleteTodo(todo)"
      />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script lang="ts" setup>
import { Directive, nextTick, ref } from 'vue'

import { TodoItem } from './data.d'

const vFocus: Directive = {
  updated(el: HTMLInputElement, binding, vnode) {
    if (binding.value) {
      nextTick(() => {
        el.focus()
      })
    }
  },
}

const props = withDefaults(
  defineProps<{
    todo: TodoItem
  }>(),
  {
    todo: () => {
      return {}
    },
  },
)
const emit = defineEmits<{
  (e: 'deleteTodo', todo: TodoItem): void
  (e: 'editTodo', { todo, value }: { todo: TodoItem; value: string }): void
  (e: 'toggleTodo', todo: TodoItem): void
}>()

const editing = ref<boolean>(false)

const deleteTodo = (todo: TodoItem) => {
  emit('deleteTodo', todo)
}
const editTodo = ({ todo, value }: { todo: TodoItem; value: string }) => {
  emit('editTodo', { todo, value })
}
const toggleTodo = (todo: TodoItem) => {
  emit('toggleTodo', todo)
}
const doneEdit = (e: Event) => {
  const value = (e.target as HTMLInputElement).value.trim()
  const { todo } = props
  if (!value) {
    deleteTodo(todo)
  } else if (editing.value) {
    editTodo({
      todo,
      value,
    })
    editing.value = false
  }
}
const cancelEdit = (e: Event) => {
  ;(e.target as HTMLInputElement).value = props.todo.text as string
  editing.value = false
}
</script>
