const productModificationSubmitBtn = $("#productModificationSubmitBtn");
const productModifyForm = $("#productModifyForm");
const productModifyFormName = productModifyForm.find("input[name='name']");
const productModifyFormDetails = productModifyForm.find("textarea[name='details']");
const productModifyFormFile = $("#productModifyFormFile");
const productModifyFormFilePreview = $("#productModifyFormFilePreview");

let product = {
    id: undefined,
    name: undefined,
    details: undefined,
    images: [],
    view: undefined,
    like: undefined,
    registry_date: undefined,
    update_date: undefined,
};

function getProductInfo(id) {
    let product;
    $.ajax({
        type: 'get',
        url: '/api/product/info',
        async: false,
        data: {
            id: id
        },
        dataType: 'JSON',
        success: function (data) {
            product = data;
            if (product.images !== null && product.images !== undefined)
                product.images = JSON.parse(product.images);
        },
        error: function (xhr) {
            console.error(xhr);
        }
    });
    return product;
}

function productFormToggle() {
    productModifyForm.collapse("toggle");
}

$(document).on('click', ".productModifyBtn", (e) => {
    product.id = $(e.target).parents(".card").data('product-id');

    const targetProductCard = $(e.target.parentElement.parentElement.parentElement);

    targetProductCard.toggleClass('border border-5 border-warning');

    $("#product-list-area .card").each((index, item) => {
        if (!targetProductCard.is(item))
            $(item).toggleClass('disabled').toggleClass('opacity-25');
    });

    $("#returnToList").one('click', () => {
        productFormToggle();
        getProductList();
    });

    productFormToggle();
});

productModifyForm.on('show.bs.collapse', event => {
    // 수정 버튼 반복 시 이벤트가 2배로 증가...
    product = getProductInfo(product.id);
    console.log(product);

    productModifyFormName.val(product.name);
    productModifyFormDetails.val(product.details);
    productModifyFormFile.val('');
    productModifyFormFilePreview.html('');
    if (product.images !== null && product.images !== undefined) {
        for (const image of product.images) {
            let imageTag = new Image();
            imageTag.classList.add('col-11', 'img-fluid', 'img-thumbnail', 'mb-1', 'position-relative');
            imageTag.src = image.src;
            productModifyFormFilePreview.append($("<div class='d-flex'>").append(imageTag, "<button type=\"button\" class=\"btn-close\" aria-label=\"Close\"></button>"));
        }
    } else {
        productModifyFormFilePreview.append("<small>등록된 사진 없음</small>")
    }

});

productModifyFormFile.on('change', (e) => {
    console.log($(e.target.files));
    for (const file of e.target.files) {
        let reader = new FileReader();
        reader.onload = function () {
            let imageTag = new Image();
            // imageTag.height = 100;
            imageTag.classList.add('col-11', 'img-fluid', 'img-thumbnail', 'mb-1', 'position-relative');
            imageTag.src = this.result;
            product.images.push(this.result);
            productModifyFormFilePreview.append($("<div class='d-flex'>").append(imageTag, "<button type=\"button\" class=\"btn-close\" aria-label=\"Close\"></button>"));
        };
        reader.readAsDataURL(file);
    }
});

productModifyFormFilePreview.on('click', '.btn-close', function (e) {
    console.log($(e.target).parent().remove());
});

productModificationSubmitBtn.on('click', async () => {
    // product.name = await $("#productModifyForm input[name='name']").val();
    // product.details = await $("#productModifyForm textarea[name='details']").val();
    // product.images = [];
    // await $("#productModifyForm img").each(function (index, image) {
    //     // console.log(image.src);
    //     product.images.push({
    //         src: image.src
    //     });
    // });
    console.log(product);

    $.ajax({
        type: "POST",
        url: "/api/product/modify",
        async: false,
        data: {
            name: $("#productModifyForm input[name='name']").val(),
            details: $("#productModifyForm textarea[name='details']").val(),
            images: req.body.images,
            update_date: Date.now()
        },
        success: function (data) {
            console.log("Modify Product [" + data + "]");
            productFormToggle();
            getProductList();
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
});






