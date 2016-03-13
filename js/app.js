$(document).foundation();

(function () {
    $.ajax({
        method: 'GET',
        url: 'https://api.lever.co/v0/postings/thrivemarket?mode=json',
        success: function (data) {
            var deptNames = sortDeptNames(data);

            deptNames.forEach(function (deptName) {
                $('<div class="tm-dept"><h4>' + deptName + '</h4></div>').addClass('tm-' + formatClassName(deptName)).appendTo('#tm-job-container');
            });
            data.forEach(function (item) {
                var htmlBlock;
                htmlBlock = [
                    '<div class="row tm-job-link">',
                        '<div class="large-6 medium-6 small-12 columns">',
                            '<h5><a href="job_posting.html?id=' + item.id + '">' + item.text + '</a></h5>',
                        '</div>',
                        '<div class="large-6 medium-6 small-12 columns text-right">',
                            '<p>' + item.categories.location + ', ' + item.categories.commitment + '</p>',
                        '</div>',
                    '</div>'
                ].join('');
                $(htmlBlock).appendTo('div.tm-' + formatClassName(item.categories.team));
            });
        }
    });
})();

function sortDeptNames(data) {
    var key, obj = {}, arr = [];
    data.forEach(function (item) {
        obj[item.categories.team] = true;
    });
    for (key in obj) {
        arr.push(key);
    }
    return arr.sort();
}
function formatClassName(str) {
    return str.replace(/\s+/g, '');
}
