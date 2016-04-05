$(document).foundation();

/** Slick carousel settings for images below mission section */
$('.tm-mission-carousel').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    speed: 200,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 639,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

/** Slick carousel settings for location images */
$('.tm-location-images').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200
});

/** Slick carousel settings for perks carousel */
$('.tm-perks-carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    dots: true,
    arrows: false
});

/** Get Request to Lever API for all job openings */
$.ajax({
    method: 'GET',
    url: 'https://api.lever.co/v0/postings/thrivemarket?mode=json',
    success: function (data) {
        var deptNames = sortDeptNames(data);
        appendDeptSections(deptNames);
        appendJobTitles(data);
    }
});

/**
* Collects all department names, returns alphabetized names in an array
* @param {array} data - Lever API data of all job listings.
*/
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

/**
* Adds a div to the DOM with department name header
* @param {array} names - Departments names of all Lever job listings.
*/
function appendDeptSections(names) {
    names.forEach(function (deptName) {
        var htmlBlock = $('<div class="tm-dept"><h4>' + deptName + '</h4></div>');
        $(htmlBlock).addClass('tm-' + formatClassName(deptName));
        $(htmlBlock).addClass('clearfix');
        $(htmlBlock).appendTo('#tm-job-container');
    });
}

/**
* Appends job title, location, and commitment to associated department div
* @param {array} data - Lever API data of all job listings.
*/
function appendJobTitles(data) {
    data.forEach(function (item) {
        var htmlBlock = [
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

/**
* Removes all white space from string
* @param {string} str - Department name from Lever API job listings.
*/
function formatClassName(str) {
    return str.replace(/\s+/g, '');
}
