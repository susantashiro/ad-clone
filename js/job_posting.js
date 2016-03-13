(function () {
    var jobID = getParameterByName('id');
    $.ajax({
        method: 'GET',
        url: 'https://api.lever.co/v0/postings/thrivemarket/' + jobID,
        success: function (data) {
            var htmlSummary, htmlDetail = '';
            htmlSummary = [
                '<div>',
                    '<h2>' + data.text + '</h2>',
                    '<h3>' + data.categories.team + ', ' + data.categories.location + ', ' + data.categories.commitment + '</h3>',
                '</div>',
                '<div><br></div>',
                data.description
            ].join('');
            $(htmlSummary).appendTo('#tm-job-detail-container');

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
    });

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





})();
