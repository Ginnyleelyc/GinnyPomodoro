$(document).ready(function () {
    $(function () {
        $("#datepicker").datepicker();
    });
    $('.control > li').click(function(e){
        $('.start').removeClass('icon-orange-active');
        $('li').removeClass('icon-gray-active');
        
        if($(this).data('num') == 0){
            $(this).addClass('icon-orange-active');
        }else{ 
            $(this).addClass('icon-gray-active');
        }
    });
    
});

var app = new Vue({
    el:'#app',
    data:{
        newText:'',
        todos: [],
        cacheTitle: "",
        cacheTodo: [],
        date:'',
        todoshow:true,
        doneshow:true,
        navshow: false,
        active:'add',
        time:1500,
        minutes:25,
        seconds:0,
        countTime:{},
        start: false,
        pause: false, 
        taskitem: {},
        startChose:false,
        
    },
    methods: {
        addTodo:function(){
            var id = Math.floor(Date.now());
            var text = this.newText.trim();
            var date = this.date;
            if (!text) { return }
            this.todos.push({
                id:id,
                title:text,
                date:date,
                completed: false
            });
            this.newText=""; 
            this.date="";  
        },
        editTodo:function(item){
            this.cacheTitle = item.title;
            this.cacheTodo = item;
        },
        doneTodo: function(item){
            item.title = this.cacheTitle;
            this.cacheTitle = "";
            this.cacheTodo = [];
        },
        cancelEdit:function(){
            this.cacheTodo = [];
        },
        delectTodo:function(item){
            this.todos.splice(this.todos.indexOf(item), 1);  
            this.refreshTimer();
        },
        reset:function(){
            this.todos=[];
        },
        startTimer:function(){
            if(this.start){
                if (this.pause) {
                    this.countTime = window.setInterval(this.getTime, 1000);
                    this.pause = false;
                }
            }else{
                this.start = true;
                this.countTime = window.setInterval(this.getTime, 1000);
            }
        },
        pauseTimer:function(){
            if(this.start){
                this.pause = true;
                window.clearInterval(this.countTime)
                this.countTime = {};
            }
            
        },
        refreshTimer: function () {
            window.clearInterval(this.countTime)
            this.countTime = {};
            this.start = false;
            this.pause = false;
            this.minutes = 25;
            this.seconds = 0;
            this.time = 1500;
            
        },
        getTime:function(){
            this.time = this.time -1;
            this.minutes = Math.floor(this.time / 60) % 60 || 0;
            var regTime = this.time;
            this.seconds = regTime % 60 || 0;
        },
        choseTask: function (item) {
            this.refreshTimer();
            this.taskitem = item;
        },
       
    },
    computed: {
        filteredTodoIng:function(){
            var vm=this;
            return vm.todos.filter(function (item) {
                   return !item.completed;
            });
        },
        filteredTodoDone: function () {
            var vm = this;
            return vm.todos.filter(function (item) {
                return item.completed;
            });
        },
        uncompletedLen:function () {
            var vm = this;
            return vm.todos.filter(function (item) {
                return !item.completed;
            }).length;
        },

    },
    watch: {
        todos:{
            handler: function () { 
                if (this.filteredTodoIng.length !== 0){
                    this.taskitem = this.filteredTodoIng[0]
                }else{
                    this.taskitem ={}
                }   
            },
            deep: true   
        }
    },
    mounted() {
        var vm = this
        $('#datepicker').datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function (dateText) {
                vm.date = dateText
            }
        })
    }
})