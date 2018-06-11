// banner - list导航栏效果
$('.banner-list>li').hover(function () {
    $(this).siblings().children('.banner-list-box').css({ display: 'none' }).stop().animate({ width: 0 })
        .end().end().children('.banner-list-box').css({ display: 'block' }).stop().delay(300).animate({ width: 440 }, 300)
}, function () {
    $(this).children('.banner-list-box').css({ display: 'none' }).stop().animate({ width: 0 })
})

// 轮播效果
class Banner {
    constructor(obj) {
        this.next = obj.next;
        this.prev = obj.prev;
        this.aImg = obj.aImg;
        this.index = this.aImg.length - 1;
        this.iNow = 0;
        this.init();
        this.auto();
    }
    init() {
        let that = this
        this.next.on('click', function () {
            if (that.iNow == that.aImg.length - 1) {
                that.iNow = 0;
                that.index = that.aImg.length - 1;
            } else {
                that.iNow++;
                that.index = that.iNow - 1;
            }
            that.move(1)

        })
        this.prev.on('click', function () {
            if (that.iNow == 0) {
                that.iNow = that.aImg.length - 1;
                that.index = 0;
            } else {
                that.iNow--;
                that.index = that.iNow + 1;
            }
            that.move(-1)
        })
    }
    move(num) {
        this.aImg.eq(this.index).css({ left: 0 }).stop().animate({ left: -this.aImg.eq(0).width() * num }, 500)
            .end().eq(this.iNow).css({ left: this.aImg.eq(0).width() * num }).stop().animate({ left: 0 }, 500);
    }
    auto() {
        this.timer = setInterval(() => {
            this.next.triggerHandler('click')
        }, 5000);
        let that = this;
        this.aImg.hover(function () {
            clearInterval(that.timer);
        }, function () {
            that.timer = setInterval(() => {
                that.next.triggerHandler('click')
            }, 5000);
        })
    }
}
// Banner轮播
new Banner({
    next: $('.next'),
    prev: $('.prev'),
    aImg: $('.imgbox').children()
})
// Brands轮播
new Banner({
    next: $('.next_b'),
    prev: $('.prev_b'),
    aImg: $('.tempWrap ul').children('li')
})

//懒加载
$('.lazyload').lazyload()

//mytake hover效果
$('.mytake-ul li').on('mouseenter', function () {
    $('.works').stop().hide().eq($(this).index()).stop().show()
    $('.mytake-arrow').stop().animate({
        left: $(this).index() * $('.mytake-arrow').width()
    })
})

// footer link more
$('.links_moreIcon').on('click', function () {
    $('.links_m').toggle()
})

// ingmenu
onscroll = function () {
    if ($(document).scrollTop() > 400) {
        $('.ingmenu').stop().show(200)
    } else {
        $('.ingmenu').stop().hide(200)
    }
}
//点击缓动返回顶部
$('.imgmenu_ico3').on('click', function () {
    let timer = setInterval(() => {
        let scrollT = $(document).scrollTop()
        let speed = Math.floor(-scrollT / 7)
        console.log(speed);
        if (scrollT == 0) {
            clearInterval(timer)
        } else {
            $(document).scrollTop(scrollT + speed)
        }
    }, 30);
})

// recomd数据请求
$.ajax({
    url: 'http://127.0.0.1/wutuojia/php/data.php',
    type: 'post',
    data: { recomd: 1 },
    dataType: 'json',
    success: function (res) {
        for (let i = 0; i < res.length; i++) {
            $('.lazyload').eq(i).attr('data-src', res[i].data_src)
            $('.recommd-body').eq(i).find('dd').find('a').html(res[i].goods)
            $('.recommd-body').eq(i).find('dd').find('p').html(res[i].info1)
            $('.recommd-body').eq(i).find('dd').find('span').html(res[i].info2)
        }
    },
    beforeSend: function () {
        let str = '';
        for (let i = 0; i < 8; i++) {
            str += `<div class="recommd-body">
                        <dl>
                            <dt>
                                <a href="">
                                    <img src="img/rd1.png" alt="" class="lazyload">
                                </a>
                            </dt>
                            <dd>
                                <a href=""></a>
                                <p></p>
                                <span></span>
                            </dd>
                        </dl>
                    </div>`
        }
        $('.recommd-main').html(str)
    }
})

//懒加载
$('.lazyload').lazyload()