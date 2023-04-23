var that;
class Tab{
    constructor(id){
        //获取元素
        that = this;
        this.main = document.querySelector(id);
       
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init(){
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab.bind(this.add, this);
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    updateNode(){
        
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    //切换功能
    toggleTab(){
        that.clearClass();
        // console.log(this.index);
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';

    }
    clearClass(){
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
            that.init();
            
        }
    }
    //添加功能
    addTab(){
        that.clearClass();
        var random = Math.random;
       //创建li和section
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试'+ random() +'</section>';
       //把这两个元素追加到对于的父元素中
       that.ul.insertAdjacentHTML('beforeend',li);
       that.fsection.insertAdjacentHTML('beforeend',section);
       that.init();

    }
    //删除功能
    removeTab(e){
        e.stopPropagation();//阻止冒泡
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        if (document.querySelector('.liactive')) return;
        index--;
        //手动调用点击事件，不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }
    //修改功能
    editTab(){
        var str = this.innerHTML;
        window.getSelection?window.getSelection().removeAllRanges():document.getSelection.empty();
        //alert(11);
        this.innerHTML = '<input type="text" />'
        var input = this.children[0];
        input.value = str;
        input.select();//文本框里文字处于选定状态
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        //按下回车复制给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
}
new Tab('#tab');
