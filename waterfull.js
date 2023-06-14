(function () {
    var Waterfull = function (opt) {

        if (typeof opt !== 'object' || opt === null) {
            throw new Error('参数 opt 必须是一个非空对象。');
        }
        if (typeof opt.el !== 'string' || opt.el.length === 0) {
            throw new Error('参数opt.el必须是一个非空字符串。');
        }
        if (typeof opt.wrapperWidth !== 'number' || opt.wrapperWidth <= 0) {
            throw new Error('参数 opt.wrapperWidth 必须是一个大于0的数字。');
        }
        if (typeof opt.colmuns !== 'number' || opt.colmuns <= 0) {
            throw new Error('参数 opt.opt.colmuns 必须是一个大于0的数字。');
        }
        if (typeof opt.gap !== 'number' || opt.gap <= 0) {
            throw new Error('参数 opt.gap 必须是一个大于0的数字。');
        }
        this.el = document.getElementsByClassName(opt.el)[0];
        this.oItems = this.el.getElementsByTagName('div')
        this.wrapperWidth = opt.wrapperWidth
        this.colmuns = opt.colmuns;
        this.gap = opt.gap;
        this.itemWidth = (this.wrapperWidth - (this.colmuns - 1) * this.gap) / this.colmuns
        this.heightArr = []
        console.log(this.itemWidth);
        console.log(this.wrapperWidth, this.colmuns, this.gap);
        console.log(this.oItems);
        this.init()
    }
    Waterfull.prototype.init = function () {
        this.render()
    }
    Waterfull.prototype.render = function () {
        this.el.style.width = this.wrapperWidth + "px"
        console.log(this.oItems);
        var items = null
        var minIdx = -1
        function getMinIdx(arr) {
            return arr.indexOf(Math.min(...arr))
        }
        for (var i = 0; i < this.oItems.length; i++) {
            items = this.oItems[i]
            items.style.width = this.itemWidth + 'px'
            if (i < this.colmuns) {
                items.style.top = "0px"
                items.style.left = i * (this.itemWidth + this.gap) + "px"
                this.heightArr.push(items.offsetHeight)
            } else {
                minIdx = getMinIdx(this.heightArr)
                items.style.top = this.heightArr[minIdx] + this.gap + "px"
                items.style.left = minIdx * (this.itemWidth + this.gap) + "px"
                this.heightArr[minIdx] = this.heightArr[minIdx] + this.gap + items.offsetHeight

            }
        }
    }
    window.Waterfull = Waterfull
})()