// 开始
var lunBO = (function(){
    var $wrapper = document.querySelector('.wrapper');
    var $smallBox = document.querySelector('#uu');
    var $liAll = $smallBox.querySelectorAll('li');
    var $imgBox = document.querySelector('#box');
    var $imgAll = $imgBox.querySelectorAll('li');
    var $btnLeft = $wrapper.querySelector('.button_left');
    var $btnRight = $wrapper.querySelector('.button_right');
    //克隆添加
    var $firsetImg = $imgBox.firstElementChild;
    var $lastImg = $imgBox.lastElementChild;
    $imgBox.appendChild($firsetImg.cloneNode(true));
    $imgBox.insertBefore($lastImg.cloneNode(true),$firsetImg);
    clearInterval(timer);
    //非行内样式获取宽度
    var width = parseInt(getStyle($wrapper,'width'));
    $imgBox.style.left = -width + 'px';
    console.log(width)
    var index = 0;
    //给每一个小下标添加index属性
    for(let i = 0;i < $liAll.length;i++){
        $liAll[i].index = i;
    }
    var timer = null;
    return {
        init() {
            this.event();
            this.autoPlay();
        },
        event() {
            const _this = this;
            $smallBox.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName == 'LI'){
                    console.log(target);
                    index = target.index;
                    //调用showImg和自动播放
                    _this.showImg();
                    _this.autoPlay();
                }
            }
            $wrapper.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className == 'button_left'){  
                    clearInterval(timer);                   
                    index--;
                    _this.showImg();
                    _this.autoPlay();
                }
                if(target.className == 'button_right'){
                    clearInterval(timer);  
                    index++;
                    _this.showImg();
                    _this.autoPlay();
                }
            }
        },
        //展示图片
        showImg() {
            //判断index是否合理
           if(index < 0){
            index = $liAll.length - 1;
            $imgBox.style.left = -width * ($liAll.length + 1) + 'px';
           }else if(index > $liAll.length - 1){ 
               index = 0;
               $imgBox.style.left = 0 + 'px';
           }

            for(let i = 0;i < $liAll.length;i++) {
                $liAll[i].classList.remove('current');
            }
            $liAll[index].classList.add('current');
            move($imgBox, 'left', -width*(index + 1),500);
            
            
        },
        //自动播放
        autoPlay() {
            clearInterval(timer);
            timer = setInterval(() => {
                index++;
                this.showImg();
            },3000);
        }
    }
}());
lunBO.init();