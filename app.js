let shopItems = [
    { id: 1, title: 'Fall Limited Edition Sneakers', oldCost: 250, off: 50, cost: 125, count: 1, img: './images/image-product-1.jpg' },
    { id: 2, title: 'High sport Edition and walker', oldCost: 400, off: 40, cost: 240, count: 1, img: './images/image-product-2.jpg' },
    { id: 3, title: 'Winter And Snow Happy Collection', oldCost: 400, off: 60, cost: 160, count: 1, img: './images/image-product-3.jpg' }
]
let basketArray

const desktopGalleryCarouselItemArr = document.querySelectorAll('.desktopGallery-carousel-itemImg')
const lightBoxCarouselItemImgArr = document.querySelectorAll('.lightBox-carousel-itemImg')
const mainGalleryFoto = document.querySelector('.main-galleryFoto')
const mainLightBox = document.querySelector('.main-lightBox')

const mainBodyElem = document.querySelector('#mainBody')
const customerCartElem = document.querySelector('.customerCart-section')

let numbersInBasket = 0
const numbersInBasketElem = document.querySelector('.numbersInBasket')

mainBodyElem.addEventListener('click', function () {
    closeCartHandler()
});

customerCartElem.addEventListener('click', function (event) {
    event.stopPropagation()
})

function loadPageHandler() {
    loadBasketInfoInDom()
}

function gallerySelectHandler(event) {
    desktopGalleryCarouselItemArr.forEach(item => {
        item.classList.remove('active')
    })
    event.target.classList.add('active')
    mainGalleryFoto.setAttribute('src', `./images/image-${event.target.id}.jpg`)
}


//----- Light Box Functions --------
function openLightBox() {
    document.querySelector('.lightBox-section').classList.remove('hiddenSection')
}

function closeLightBox() {
    document.querySelector('.lightBox-section').classList.add('hiddenSection')
}

function lightBoxSelectHandler(event) {
    lightBoxCarouselItemImgArr.forEach(item => {
        item.classList.remove('activated')
    })
    event.target.classList.add('activated')
    mainLightBox.setAttribute('src', `./images/image-${event.target.id}.jpg`)
    // console.log(event.target.id);
}

function lightBoxNextPrevHandler(event) {
    let currentImg
    if (event.target.id == 'gallery-nextBtn') {
        let mainlight = mainLightBox.getAttribute('src')
        currentImg = Number(mainlight.slice(23, 24)) + 1;
        if (currentImg > 4) {
            currentImg = 1
        }

    } else if (event.target.id == 'gallery-prevBtn') {
        let mainlight = mainLightBox.getAttribute('src')
        currentImg = Number(mainlight.slice(23, 24)) - 1;
        if (currentImg < 1) {
            currentImg = 4
        }
    }
    mainLightBox.setAttribute('src', `./images/image-product-${String(currentImg)}.jpg`)

    lightBoxCarouselItemImgArr.forEach(item => {
        item.classList.remove('activated')
    })
    let selectedlightCarousel
    console.log(lightBoxCarouselItemImgArr);
    lightBoxCarouselItemImgArr.forEach(item => {
        if (item.id.slice(8, 9) == currentImg) {
            item.classList.add('activated')
        }
    })
    console.log(selectedlightCarousel);
}

function showCartHandler(event) {
    document.querySelector('.customerCart-section').classList.toggle('hiddenSection')
    event.stopPropagation()
}

//----- Customer Cart Functions --------
function closeCartHandler() {
    document.querySelector('.customerCart-section').classList.add('hiddenSection')
}

function addToCartHandler() {
    // console.log('adding to cart...');
    let itemTitle = document.querySelector('.data-title').innerHTML
    let itemCount = Number(document.querySelector('.countNumber').innerHTML)
    let selectedShopItem = shopItems.find(item => {
        return item.title == itemTitle
    })
    if (basketArray.length) {
        basketArray.forEach(item => {
            item.id == selectedShopItem.id
            item.count = item.count + itemCount
        })
    } else {
        selectedShopItem.count = itemCount
        basketArray.push(selectedShopItem)
    }

    localStorage.setItem('userBasket', JSON.stringify(basketArray))
    loadBasketInfoInDom()
}

function removeFromeCartHandler(event) {
    // console.log('removing from cart...');
    let toRemoveItemIndex = basketArray.findIndex(item => {
        return event.target.parentElement.parentElement.id == item.id
    })
    basketArray = basketArray.slice(0, toRemoveItemIndex)
    localStorage.setItem('userBasket', JSON.stringify(basketArray))
    loadBasketInfoInDom()
    // console.log(basketArray);
}

function loadBasketInfoInDom() {
    basketArray = JSON.parse(localStorage.getItem('userBasket'))
    if (!basketArray) {
        basketArray = []
    }
    document.querySelector('.customerCart-itemsWrapper').innerHTML = ''
    if (basketArray.length) {
        basketArray.map(item => {
            numbersInBasket = item.count
            // console.log(item.count);
            document.querySelector('.customerCart-itemsWrapper').insertAdjacentHTML('beforeend', `
            <div class="customerCart-item" id=${item.id}>
            <div class="customerCart-item-image">
              <img class="customerCart-item-img" src=${item.img} />
            </div>
            <div class="customerCart-item-text">
              <div class="customerCart-item-name">${item.title}</div>
              <div class="customerCart-item-price">$${item.cost} x ${item.count} <span id="totalPrice">$${item.cost * item.count}</span></div>
            </div>
            <div class="customerCart-item-icon">
              <img src="./images/icon-delete.svg" onclick="removeFromeCartHandler(event)"/>
            </div>
          </div>
            `)
        })
        numbersInBasketElem.innerHTML = numbersInBasket
        numbersInBasketElem.classList.remove('invisibleSection')
    } else {
        document.querySelector('.customerCart-itemsWrapper').innerHTML = 'Your cart is empty'
        numbersInBasketElem.classList.add('invisibleSection')
    }

}

//----- minusCount & plusCount Functions --------
function minusCountNumber() {
    if (Number(document.querySelector('.countNumber').textContent) > 1) {
        document.querySelector('.countNumber').textContent = Number(document.querySelector('.countNumber').textContent) - 1
    }
}

function plusCountNumber() {
    document.querySelector('.countNumber').textContent = Number(document.querySelector('.countNumber').textContent) + 1
}

//----- Mobile Menu Functions --------

function closeMobileMenu() {
    document.querySelector('.navbar-mobileMenu').classList.add('hiddenSection')
}
function openMobileMenu() {
    document.querySelector('.navbar-mobileMenu').classList.remove('hiddenSection')
}



