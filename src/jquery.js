window.$ = window.jQuery = (selectorOrArrayOrTemplate) => {
  let elements; //维持操作的元素,默认为数组
  // 重载
  if (typeof selectorOrArrayOrTemplate === "string") {
    // 创建
    if (selectorOrArrayOrTemplate[0] === "<") {
      elements = [createEl(selectorOrArrayOrTemplate)];
    } else {
      // 查找
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }
  function createEl(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild
     
  }
  
  //相当于 api.__proto__ = jQuery.prototype
  const api = Object.create(jQuery.prototype);
  //批量添加私有属性
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });

  return api;
};

jQuery.prototype = {
  //jQuery不是一个标准的构造函数 (new jQuery()),但是它返回了一个对象
  //手动指定它的constructor
  constructor: jQuery,
  isJQuery: true,

  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  getEl(index) {
    return this.elements[index]
  },
  printEl() {
    console.log(this.elements);
    return this;
  },
  index() {
    let indexList = [];
    this.each((node) => {
      const children = Array.from(node.parentNode.children);
      array.push(children.indexOf(node));
    });
    return array;
  },
  find(selector) {
    let children = [];
    this.each((node) => {
      let childList = node.querySelectorAll(selector);
      children.push(...childList);
    });
    //用新元素的数组  来记录elements改变之前的api
    children.oldApi = this;
    return jQuery(children);
  },
  appendTo(parentNode){
    if (parentNode instanceof Element) {
      this.each(node => {
        parentNode.appendChild(node)
      })
    } else if (parentNode.isJQuery) {
      this.each(node => {
        parentNode.getEl(0).appendChild(node)
      })
    }
    return this
  },
  append(children) {
    console.log('fuck')
    if (children instanceof Element) {
      this.getEl(0).appendChild(children) //一个node只能添加到一个位置
    } else if (children instanceof NodeList) {
      for (let i = 0; i < children.length; i++) {
        this.getEl(0).appendChild(children[i])
      }
    } else if (children.isJQuery) {
      children.each(node => this.getEl(0).appendChild(node))
    }
  },
  parent() {
    let parents = [];
    this.each((node) => {
      if (parents.indexOf(node.parentNode) === -1) {
        parents.push(node.parentNode);
      }
    });
    // 每次改变操作元素的时候,都要记录之前的elements
    parents.oldApi = this;
    return jQuery(parents);
  },
  children() {
    let array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  siblings() {
    let array = [];
    this.each((node) => {
      let node_siblings = Array.from(node.parentNode.children).filter(
        (child) => child !== node
      );
      // Array.from() 仅用于可迭代对象,Array.of()生成由参数组成的数组
      array.push(...node_siblings);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  next() {
    let array = [];
    this.each((node) => {
      // 找到不是文本节点的下一个
      let x = node.nextSibling;
      while (x && x.nodeType === 3) {
        x = x.nextSibling;
      }
      array.push(x);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  prev() {
    let array = [];
    this.each((node) => {
      let x = node.previousSibling;
      while (x && x.nodeType === 3) {
        x = x.previousSibling;
      }
      array.push(x);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  end() {
    return this.oldApi;
  },
  addClass(className) {
    this.each((node) => {
      node.classList.add(className);
    });
    return this;
  },
  removeClass(className) {
    this.each((node) => {
      node.classList.remove(className);
    });
    return this;
  },
  hasClass(className) {
    let array = [];
    this.each((node) => {
      array.push(node.classList.contains(className));
    });
    return array;
  },

  text(string) {
    if (arguments.length === 1) {
     
      this.each(node => node.innerText = string)

    } else if (arguments.length === 0) {
        return this.getEl(0).innerText
    }
  },
  html(string) {
    if (arguments.length === 1) {
      this.each( node => node.innerHTML = string)
    } else if (arguments.length === 0) {
      return this.getEl(0).innerHTML
    }
  },
  // style只能获取内联样式
  style(name, value) {
    // $dom.style('color', 'red)
    if (arguments.length === 2) {
      this.each(node => node.style[name] = value)
    } else if (arguments.length === 1) {
      //$dom.style('color')
      if (typeof name === "string") {
        let array = []
        this.each(node => array.push(node.style[name]))
        return array
        //$dom.style({color: 'red', font-size: '16px'})
      } else if (name instanceof Object) {
        this.each(node => {
          for (let key in name) {
            node.style[key] = name[key];
          }
        })
      }
    }
  },
  //事件
  on(eventType, fn, capture = false) {
    this.each(node => {
      node.addEventListener(eventType, fn, capture)
    })
    return this
  },
  off(eventType, fn) {
    this.each(node => node.removeEventListener(eventType, fn))
    return this 
  },
  onProxy(eventType, selector, fn) {
    this.each(node => {
      node.addEventListener(eventType, (e) => {
        let t = e.target
        while (!t.matches(selector)) {
          if (t === node) {
            t = null
            return 
          }
          t = t.parentNode
        }
        t && fn.call(t, e, t)
      })
    })
    return this
  },



  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append2(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(node, parent);
    parent.appendChild(node);
  },

  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const { childNodes } = node;

    // 移除之后数组是实时变化的
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },


};
