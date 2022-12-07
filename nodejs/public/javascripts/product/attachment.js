export function getAttachmentInfo(id) {
    let result;
    $.ajax({
        type: 'GET',
        url: 'api/product/attachment/info',
        async: false,
        data: {
            id: id
        },
        success: function (data) {
            console.log(data);
            result = data;
        },
        error: function (xhr) {
            console.error(xhr);
        }
    });
    return result;
}

export function getAllAttachmentInfo() {
    let result;
    $.ajax({
        type: 'GET',
        url: 'api/product/attachment/all',
        async: false,
        success: function (data) {
            console.log(data);
            result = data;
        },
        error: function (xhr) {
            console.error(xhr);
        }
    });
    return result;
}
