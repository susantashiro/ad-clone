

/** Get request to Lever API for specific job post based on jobID in query string */
$.ajax({
    method: 'GET',
    url: 'https://api.lever.co/v0/postings/thrivemarket/' + getParameterByName('id'),
    success: function (data) {
        appendJobSummary(data);
        appendJobDetails(data);
    }
});

/**
* Returns parameter of query string by field name
* @param {string} name - field name of query string.
* @param {string} url - url with query string.
*/
function getParameterByName(name, url) {
    var regex, results;
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
* Appends job title, team, location, commitment, and description to container div
* @param {array} data - Lever API data of all job listings.
*/
function appendJobSummary(data) {
    var htmlSummary = [
        '<div>',
            '<h2>' + data.text + '</h2>',
            '<h3>' + data.categories.team + ', ' + data.categories.location + ', ' + data.categories.commitment + '</h3>',
        '</div>',
        '<div><br></div>',
        data.description
    ].join('');
    $(htmlSummary).appendTo('#tm-job-detail-container');
}

/**
* Appends job details to the container div
* @param {array} data - Lever API data of all job listings.
*/
function appendJobDetails(data) {
    var htmlDetail = '';
    data.lists.forEach(function (item) {
        htmlDetail += [
            '<div><br></div>',
            '<h3>' + item.text + '</h3>',
            '<ul>' + item.content + '</ul>'
        ].join('');
    });
    htmlDetail += '<a class="button" href="' + data.applyUrl + '" target="_blank">APPLY NOW</a>';
    $(htmlDetail).appendTo('#tm-job-detail-container');
}
