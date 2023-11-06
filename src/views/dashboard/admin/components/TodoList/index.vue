<template>
	<section class="todoapp">
		<!-- header -->
		<header class="header">
			<input
				class="new-todo"
				autocomplete="off"
				:placeholder="t(`dashboard.todoList`)"
				@keyup.enter="addTodo"
			/>
		</header>
		<!-- main section -->
		<section
			v-show="todos.length"
			class="main"
		>
			<input
				id="toggle-all"
				:checked="allChecked"
				class="toggle-all"
				type="checkbox"
				@change="toggleAll({ done: !allChecked })"
			/>
			<label for="toggle-all" />
			<ul class="todo-list">
				<Todo
					v-for="(todo, index) in filteredTodos"
					:key="index"
					:todo="todo"
					@toggleTodo="toggleTodo"
					@editTodo="editTodo"
					@deleteTodo="deleteTodo"
				/>
			</ul>
		</section>
		<!-- footer -->
		<footer
			v-show="todos.length"
			class="footer"
		>
			<span class="todo-count">
				<strong>{{ remaining }}</strong>
				{{ pluralize(remaining, t(`dashboard.item`)) }} {{ t(`dashboard.left`) }}
			</span>
			<ul class="filters">
				<li
					v-for="(val, key) in filters"
					:key="key"
				>
					<a
						:class="{ selected: visibility === key }"
						@click.prevent="visibility = key + ''"
						>{{ capitalize(t(`dashboard.${key}`)) }}</a
					>
				</li>
			</ul>
			<!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button>-->
		</footer>
	</section>
</template>

<script lang="ts" setup>
import Todo from './Todo.vue'
import { TodoItem } from './data.d'

import { useI18n } from 'vue-i18n'
import { computed, reactive, ref } from 'vue'

const { t } = useI18n()

const STORAGE_KEY = 'todos'
const filters = reactive<{ [index: string]: Function }>({
	all: (todos: TodoItem[]) => todos,
	active: (todos: TodoItem[]) => todos.filter(todo => !todo.done),
	completed: (todos: TodoItem[]) => todos.filter(todo => todo.done),
})
const todos = ref<TodoItem[]>([
	{ text: 'star this repository', done: false },
	{ text: 'fork this repository', done: false },
	{ text: 'vite', done: false },
	{ text: 'vue3-element-admin', done: true },
	{ text: 'vue3', done: true },
	{ text: 'element-plus', done: true },
	{ text: 'axios', done: true },
	{ text: 'webpack', done: true },
])
const visibility = ref<string>('all')

const allChecked = computed(() => {
	return todos.value.every(todo => todo.done)
})
const filteredTodos = computed(() => {
	return filters[visibility.value](todos.value)
})
const remaining = computed(() => {
	return todos.value.filter(todo => !todo.done).length
})

const setLocalStorage = () => {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
}
const addTodo = (e: KeyboardEvent) => {
	const text = (e.target as HTMLInputElement).value
	if (text.trim()) {
		todos.value.push({
			text,
			done: false,
		})
		setLocalStorage()
	}
	;(e.target as HTMLInputElement).value = ''
}
const toggleTodo = (val: TodoItem) => {
	val.done = !val.done
	setLocalStorage()
}
const deleteTodo = (todo: TodoItem) => {
	todos.value.splice(todos.value.indexOf(todo), 1)
	setLocalStorage()
}
const editTodo = ({ todo, value }: { todo: TodoItem; value: string }) => {
	todo.text = value
	setLocalStorage()
}
const clearCompleted = () => {
	todos.value = todos.value.filter(todo => !todo.done)
	setLocalStorage()
}
const toggleAll = ({ done }: TodoItem) => {
	todos.value.forEach(todo => {
		todo.done = done
		setLocalStorage()
	})
}

const pluralize = (n: number, w: string) => (n > 1 && /^[a-zA-Z]+$/.test(w) ? w + 's' : w)
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<style lang="scss">
@import './index.scss';
</style>
