<template>
    <div class="container-body h-[5vh]">
        <!-- calendar js -->
        <div v-show="isCalendarActive && isMenuActive" class="calendar-body scale-110">
            <button type="button" @click="isCalendarActive = false"
                class="close-btn ml-1 p-2 w-9 bg-slate-100 rounded hover:bg-slate-200">
                <i class="bi bi-x-lg"></i>
            </button>
            <div class="calendar"></div>
        </div>

        <!-- Menu IF active -->
        <div class="add-menu" :class="{ 'bottom-0': isMenuActive, 'bottom-[-700px]': !isMenuActive }">
            <!-- add task -->
            <form @submit.prevent class="form-menu transition-all duration-[300ms] ease-in-out" :class="{
                'translate-y-0 ': isMenuActive,
                'translate-y-[4000px]  ': !isMenuActive,
            }">
                <!-- close btn -->
                <button type="button" @click="reset(), resetMenu(), reset()"
                    class="close-btn p-2 w-10 hover:bg-slate-100 rounded-full">
                    <i class="bi bi-x-lg"></i>
                </button>
                <!--  title -->
                <div class="add-menu-title">{{ isEdittask ? "Edit task" : "Add task" }}</div>

                <div class="add menu-input">
                    <div class="add-menu-input flex flex-col gap-4">
                        <!-- main input -->
                        <input v-model="task" type="text" class="add-input h-20" placeholder="add task" />
                        <p v-if="isTaskNull" class="alert">*task cannot be empty</p>
                        <textarea placeholder="add description" maxlength="300" v-model="desc"
                            class="add-input h-40 resize-none py-2" rows="10"></textarea>
                        <!-- additional button -->
                        <div class="additional-buttons">
                            <button type="button" @click="isCalendarActive ^= true" class="date-btn text-xl addi-btn">
                                {{ date }}
                                <i class="bi bi-calendar2-check"></i>
                            </button>

                            <div class="relative inline-block text-left">
                                <div>
                                    <button type="button" class="addi-btn text-xl" id="menu-button">
                                        Label
                                    </button>
                                </div>


                                <div class=" hidden absolute left-0 top-[-50px] p-3 z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                                    role="menu">
                                    <div class="icon-menu flex gap-2">
                                        <i v-for="label in getLabel2()" :key="label" class="bi" :class="label"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" @click="changeData(), reset()" class="form-btn bg-blue-500 hover:bg-blue-600">
                        {{ isEdittask ? "Update task" : "Add new task" }}
                    </button>
                    <button v-if="isEdittask" type="submit" @click="todostore.deleteTodo(id), reset(), resetMenu()"
                        class="form-btn mt-2 bg-red-400 hover:bg-red-500">
                        Delete
                    </button>
                </div>
            </form>
        </div>

        <!-- Menu Label if active -->
        <div class="label-menu">
            <div class="one"></div>
        </div>

        <div @click="resetMenu(), reset()" v-show="isMenuActive"
            class="dark-bg absolute top-0 bottom-0 left-0 right-0 w-full h-screen bg-black opacity-50">
            s
        </div>

        <div class="todo-buttonm fixed bottom-5 right-5">
            <button @click="(isMenuActive = !isMenuActive), (isAddtask = true)" class="add-btn">
                <i class="bi bi-plus-circle-fill text-6xl text-blue-500"></i>
            </button>
        </div>
        <!-- CONTENT -->
        <div class="content-menu">
            <button @click="getLabel2()">test</button>

            <div class="todos-menu flex p-2">
                <div @click="isCompleteFil = false" class="all-task" :class="{ 'active-title': !isCompleteFil }">
                    all task
                </div>
                <div @click="isCompleteFil = true" class="complete-task" :class="{ 'active-title': isCompleteFil }">
                    complete task
                </div>
            </div>

            <div class="todos-container h-[82vh] overflow-y-scroll px-4">
                <div v-if="todostore.todolist.length == 0" class="empty-list-bg w-full]">
                    <div class="img-empty h-[50vh]"></div>
                    <p class="message">you didn't have any task</p>
                </div>
                <div class="todos-list my-4" v-for="todo in filteredTodos" :key="todo.id">
                    <!-- pembungkus -->
                    <div class="todo-item" @click="setId(todo.id)">
                        <i class="text-2xl ml-4 cursor-pointer" @click="todostore.setStatus(todo.id), reset()" :class="{
                            'bi-check-circle-fill text-blue-500': todo.isComplete,
                            'bi-circle text-blue-500': !todo.isComplete
                        }"></i>
                        <div class="todo-title" @click="(isMenuActive = true), (isEdittask = true)"
                            :class="{ 'text-blue-400': todo.isComplete }">
                            <div class="todo text-lg" :class="{ 'font-bold': todo.isComplete }">
                                <i class="bi bi-briefcase"></i> {{ todo.title }}
                            </div>
                            <!-- {{ todo.id }} -->
                            <div class="date text-sm" :class="{ 'font-bold': todo.isComplete }">
                                <i class="bi bi-calendar2-event text-md"></i> {{ todo.date }}
                            </div>
                        </div>
                        <!-- <span :class="[getLabel(todo.label)]" class="label-data text-[#6e8fb8] text-4xl mx-2"></span> -->
                    </div>
                </div>
            </div>
            is edit task{{ isEdittask }} is complete = {{ isCompleteFil }} <br />
            is menu active = {{ isMenuActive }}
            <!-- BUTTON FOR ADD -->
        </div>
    </div>
</template>

<style scoped></style>

<script>
// import { effect } from "vue";
import { useTodoStore } from "../stores/data";
import { getLabel } from "../utilities/label";

export default {
    setup() {
        const todostore = useTodoStore();
        return { todostore };
    },
    data() {
        return {
            task: "",
            id: 0,
            date: "-   ",
            desc: "",
            label: "home",
            isEdittask: false,
            isMenuActive: false,
            isCalendarActive: false,
            isTaskNull: false,
            isCompleteFil: false,
        };
    },
    computed: {
        filteredTodos() {
            if (this.isCompleteFil) {
                console.log(this.todostore.completeFilter);
                return this.todostore.completeFilter;
            } else {
                return this.todostore.allFilter;
            }
        },

    },
    methods: {
        getLabel2() {
            console.log(getLabel());
            return getLabel();
        },
        setId(id_val) {
            const get_id = this.todostore.todolist.map((todo) => {
                if (todo.id == id_val) {
                    this.task = todo.title;
                    this.id = todo.id;
                    this.date = todo.date;
                    this.desc = todo.desc;
                }
            });
            console.log(this.id);
        },
        resetMenu() {
            this.isMenuActive = false;
            this.isCalendarActive = false;
            // console.log(this.task);
            this.isTaskNull = false;
        },
        reset() {
            this.task = "";
            this.desc = "";
            this.date = "";
            this.isEdittask = false;
        },
        changeData() {
            if (this.isEdittask) {
                this.todostore.setUpdate(this.id - 1, this.task, this.date, this.desc);
                this.resetMenu();
            } else {
                if (this.task !== "") {
                    this.todostore.addTask(this.task, this.date, this.desc, this.label);
                    this.resetMenu();
                } else {
                    this.isTaskNull = true;
                }
            }
        },
    },
    mounted() {
        window.onload = () => {
            let calendar = jsCalendar.new({
                target: ".calendar",
                date: "now",
                navigator: true,
                navigatorPosition: "both",
                monthFormat: "month YYYY",
                dayFormat: "DDD",
            });
            calendar.onDateClick((event, date) => {
                this.date = jsCalendar.tools.dateToString(date, "DD month yyyy");
            });
        };
    },
};
</script>
