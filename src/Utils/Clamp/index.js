
/**
 * Clamps a text node.
 * @param {HTMLElement} element. Element containing the text node to clamp.
 * @param {Object} options. Options to pass to the clamper.
 */
function clamp(element, options) {
    options = options || {};

    var self = this,
        win = window,
        /**
         * [opt参数]
         * @clamp 			{num}     	行数
         * @useNativeClamp  {blone}    是否使用-webkit-line-clamp属性
         * @splitOnChars    {arr}	省略的符号（不限于省略号）的样式
         * @animate 		{blone}	    是否实现动画折叠。
         * @truncationChar  {string}    省略显示字符 默认 "..."
         * @truncationHTML  {node}	省略的内容（不限于符号）
         */
        opt = {
            clamp:              options.clamp || 2,
            useNativeClamp:     typeof(options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true,
            splitOnChars:       options.splitOnChars || ['.', '-', '–', '—', ' '], //Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
            animate:            options.animate || false,
            truncationChar:     options.truncationChar || '…',
            truncationHTML:     options.truncationHTML
        },

        sty = element.style,
        originalText = element.innerHTML, //获取文本内容

        supportsNativeClamp = typeof(element.style.webkitLineClamp) != 'undefined', //判断webkitLineClamp是否存在
        clampValue = opt.clamp, //显示的行数
        isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1),//判断是否是字符串切带有单位
        truncationHTMLContainer;
        
    if (opt.truncationHTML) {//判断truncationHTML属性是否存在
        truncationHTMLContainer = document.createElement('span');
        truncationHTMLContainer.innerHTML = opt.truncationHTML; //将外部的html插入span中
    }


// UTILITY FUNCTIONS __________________________________________________________

    /**
     * Return the current style for an element.
     * @param {HTMLElement} elem The element to compute.
     * @param {string} prop The style property.
     * @returns {number}
     */
    function computeStyle(elem, prop) {
        /**
         * getComputedStyle 获取节点的css属性值
         * @param  {[type]}
         * @return {[type]}
         */
        if (!win.getComputedStyle) {
            win.getComputedStyle = function(el, pseudo) {
                this.el = el;

                this.getPropertyValue = function(prop) {
                    var re = /(\-([a-z]){1})/g;
                    if (prop == 'float') prop = 'styleFloat';
                    if (re.test(prop)) {
                        /*将line-height转化为lineHeight的格式*/
                        prop = prop.replace(re, function () {
                            return arguments[2].toUpperCase();
                        });
                    }
                    return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
                }
                return this;
            }
        }

        return win.getComputedStyle(elem, null).getPropertyValue(prop);
    }

    /**
     * Returns the maximum number of lines of text that should be rendered based
     * on the current height of the element and the line-height of the text.
     */
    function getMaxLines(height) {
        var availHeight = height || element.clientHeight,
            lineHeight = getLineHeight(element);

        return Math.max(Math.floor(availHeight/lineHeight), 0);
    }

    /**
     * 计算出div应该是多高
     */
    function getMaxHeight(clmp) {
        var lineHeight = getLineHeight(element);
        return lineHeight * clmp;
    }

    /**
     * 获取当前元素的行高
     */
    function getLineHeight(elem) {
        var lh = computeStyle(elem, 'line-height');
        if (lh == 'normal') {
            // Normal line heights vary from browser to browser. The spec recommends
            // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
            lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
        }
        return parseInt(lh);
    }


// MEAT AND POTATOES (MMMM, POTATOES...) ______________________________________
    var splitOnChars = opt.splitOnChars.slice(0),//获取数组的第0个元素
        splitChar = splitOnChars[0],//获取第0个元素的值
        chunks,
        lastChunk;
    
    /**
     * Gets an element's last child. That may be another node or a node's contents.
     * 获取当前节点的最后一个内容值不为空的子节点
     */
    function getLastChild(elem) {
        //Current element has children, need to go deeper and get last child as a text node
        if (elem.lastChild.children && elem.lastChild.children.length > 0) {
            return getLastChild(Array.prototype.slice.call(elem.children).pop());
        }
        //This is the absolute last child, a text node, but something's wrong with it. Remove it and keep trying
        /**
         * @ nodeValue 获取节点的值且为文本值
         * @ removeChild 删除子节点
         */
        else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
            elem.lastChild.parentNode.removeChild(elem.lastChild);//删除当前接节点的子节点
            return getLastChild(element);
        }
        //This is the last child we want, return it
        else {
            return elem.lastChild;
        }
    }
    
    /**
     * 从文本中删除一个字符，直到其宽度或高度低于传入的最大值param。
     */
    function truncate(target, maxHeight) {
        if (!maxHeight) {return;}
        
        /**
         * 重置全局变量
         */
        function reset() {
            splitOnChars = opt.splitOnChars.slice(0);
            splitChar = splitOnChars[0];
            chunks = null;
            lastChunk = null;
        }
        //获取节点的内容并将其中的...删除
        var nodeValue = target.nodeValue.replace(opt.truncationChar, '');
        
        //Grab the next chunks
        if (!chunks) {
            //If there are more characters to try, grab the next one
            if (splitOnChars.length > 0) {
                splitChar = splitOnChars.shift();
            }
            //No characters to chunk by. Go character-by-character
            else {
                splitChar = '';
            }
            
            chunks = nodeValue.split(splitChar);
        }
        
        //If there are chunks left to remove, remove the last one and see if
        // the nodeValue fits.
        if (chunks.length > 1) {
            // console.log('chunks', chunks);
            lastChunk = chunks.pop();
            // console.log('lastChunk', lastChunk);
            applyEllipsis(target, chunks.join(splitChar));
        }
        //No more chunks can be removed using this character
        else {
            chunks = null;
        }
        
        //Insert the custom HTML before the truncation character
        if (truncationHTMLContainer) {
            target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
            element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
        }

        //Search produced valid chunks
        if (chunks) {
            //该判断不成立继续执行230行
            if (element.clientHeight <= maxHeight) {
                //There's still more characters to try splitting on, not quite done yet
                if (splitOnChars.length >= 0 && splitChar != '') {
                    applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
                    chunks = null;
                }
                //Finished!
                else {
                    return element.innerHTML;
                }
            }
        }
        //No valid chunks produced
        else {
            //No valid chunks even when splitting by letter, time to move
            //on to the next node
            if (splitChar == '') {
                applyEllipsis(target, '');
                target = getLastChild(element);
                
                reset();
            }
        }
        
        //判断是否执行动画
        if (opt.animate) {
            setTimeout(function() {
                truncate(target, maxHeight);
            }, opt.animate === true ? 10 : opt.animate);
        }
        else {
            return truncate(target, maxHeight);
        }
    }
    //内容与...拼接并插入节点内部
    function applyEllipsis(elem, str) {
        elem.nodeValue = str + opt.truncationChar;
    }


// CONSTRUCTOR ________________________________________________________________

    if (clampValue == 'auto') {
        clampValue = getMaxLines();
    }
    else if (isCSSValue) {
        clampValue = getMaxLines(parseInt(clampValue));
    }

    var clampedText;
    if (supportsNativeClamp && opt.useNativeClamp) {
        sty.overflow = 'hidden';
        sty.textOverflow = 'ellipsis';
        sty.webkitBoxOrient = 'vertical';
        sty.display = '-webkit-box';
        sty.webkitLineClamp = clampValue;

        if (isCSSValue) {
            sty.height = opt.clamp + 'px';
        }
    }
    else {
        var height = getMaxHeight(clampValue);
        if (height <= element.clientHeight) {
            clampedText = truncate(getLastChild(element), height);
        }
    }
    
    return {
        'original': originalText,
        'clamped': clampedText
    }
}

module.exports = clamp;   