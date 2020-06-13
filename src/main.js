let api = $(".test")
    .addClass("red")
    .addClass("blue")
    .removeClass("red");

// api
//   .find(".child")
//   .addClass("red")
//   .removeClass("red")
//   .parent()
//   .end()
//   .printEl()
//   .parent()
//   .printEl()
//   .children()
//   .addClass('red')


// $('.child1').siblings().addClass('red').index()

// $('.childNext').next().addClass('red')
// $('.childPrev').prev().addClass('red')

// let $result = $('.child').hasClass('childNext')
// console.log($result)


// $('<button>btn1</button>').appendTo(document.body).addClass('red')
// $("<button>btn2</button>").appendTo($(".test"))

// const btn2 = $('<button>btn2</button>').elements[0]
// console.log(btn2 instanceof Element)
// $('.test').append(btn2)

// const divList = document.querySelectorAll(".childNext")
// $('.test').append(divList)

// const $divList = $(".childNext")
// $('.test').append($divList)


// $(".child").text("tttt")
// console.log($('.child').text())

// $(".child").html("<b>html</b>")
// console.log($('.child').html())

// $('.child').style({color: "green"})
// $('.child').style('color', 'orange')


// const fn = e => console.log(e.target)
// $('.test').on('click', fn).off('click', fn)

// $('.child').onProxy('click', '.childNext', e => {
//     console.log(e.target)
// })


// const btn3 = document.createElement('button')
// btn3.innerText = "btn3"
// $('.childNext').after(btn3)

// const $childNext = $(".childNext")
// $('.child1').after($childNext)

// const div2 = document.createElement('div')
// div2.innerText = "div2"
// $('.child').before(div2)

// const $childPrev = $('.childPrev')
// $('.child').before($childPrev)

// const div3 = document.createElement('div')
// div3.style.border = "1px solid red"
// div3.innerText = 'div3'
// $('.child').wrap(div3)

// const $div4 = $('<div>div4</div>')
// $div4.style({border: "1px solid red"})
// $div4.text("div4")
// $('.child').wrap($div4)

// $(".childNext").remove().addClass('red').appendTo($('.test1'))

// const $children = $(".test1").empty().addClass('red').appendTo($('.test2'))
// const $test1 = $('.test1').empty(false).addClass('red')

// console.log($('.test1').attr('class'))
// $('.test1').attr('class', "test test1 blue red")

