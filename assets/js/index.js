import './../plugins/jquery.min.js';
import './../plugins/bootstrap/js/bootstrap.js';
import './../plugins/swiper/js/swiper-bundle.min.js';
import { default as data } from './../data/data.json' assert{type: "json"};
let swiper = null;
const _selection = {
    category: data.categories[0]
}


const getFilesByCategory = () => {
    return data.files.filter(x => x.category == _selection.category);
}
const getFilesByCategoryAndType = (category, type) => {
    return data.files.filter(x => x.category == category && x.type == type);
}
const renderCategories = () => {
    $("#categories").html('');
    data.categories.forEach(x => {
        $("#categories").append(`<li data-category='${x}' class="list-group-item ${x == _selection.category ? 'bg-info' : ''}">
        <a data-category='${x}' href="#">${x}</a>
        </li>`)
    })
}
const renderSwipers = ()=>{
    $("#swipers").html('');
    let files = getFilesByCategory();
    files.forEach(x=>{
        $("#swipers").append(`<div class="swiper-slide"><img style='height:100%;width:100%;aspect-ratio: 4/3;' src='${x.url}'/></div>`);
    })
    addSlides();
}


const addSlides = () => {
    debugger
    //if(swiper) swiper.destroy(true,true);
    swiper = new Swiper('.swiper',
        {
            sliderPerView: 1,
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    //swiper.addSlide(1, getFilesByCategory(data.categories[0]).map(x => `<div class="swiper-slide"><img style='height:100%;width:100%;aspect-ratio: 4/3;' src='${x.url}'/></div>`));
}

const onCatClick = () => {
    $("#categories li").on('click', (e) => {
        _selection.category = $(e.target).data('category');
        getFilesByCategory($(e.target).data('category'));
        renderCategories();
        onCatClick();
        renderSwipers();
        
    })
}

$(document).ready(() => {

    renderCategories();
    renderSwipers();
    onCatClick();
})