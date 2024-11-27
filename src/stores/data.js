import { defineStore } from 'pinia'
export const useTodoStore = defineStore('todo', {
    state: () => ({
        number: JSON.parse(localStorage.getItem('number')) || 0,
        todolist: JSON.parse(localStorage.getItem('todolist')) || [],

    }),
    getters: {
        completeFilter() {
            return this.todolist.filter(todo => todo.isComplete == true)
        },

        allFilter() {
            return this.todolist
        },
    },
    actions: {
        setStatus(index) {
            this.todolist[index - 1].isComplete ^= true
            this.saveToLocal()

        },

        setUpdate(index, task, date, desc) {
            this.todolist[index].title = task
            this.todolist[index].date = date
            this.todolist[index].desc = desc
            this.saveToLocal()

        },
        addTask(task, date, desc, label) {
            this.number++
            this.todolist.push(
                {
                    title: task,
                    isComplete: false,
                    label: label,
                    date: date,
                    desc: desc,
                    id: this.number
                }
            )
            this.saveToLocal()
        },

        deleteTodo(id) {
            const find_index = this.todolist.findIndex(todo => todo.id == id)
            this.todolist.splice(find_index, 1)
            this.number--
            this.saveToLocal()
        },

        saveToLocal() {
            localStorage.setItem('todolist', JSON.stringify(this.todolist))
            localStorage.setItem('number', JSON.stringify(this.number))
        }
    },
})
