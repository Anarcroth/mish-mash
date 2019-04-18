const https = require('https');

const user = require('../user');

let whoami = async function() {
    let output = [];

    output.push(user.getTableInfo());

    let ghUrl = 'https://github.com/' + user.getGithub();
    output.push('<a href="' + ghUrl + '">' + '<i class="fab fa-github"></i> ' + user.getGithub() + '</a>');

    let reposText = await getBestRepos();
    reposText.forEach(r => output.push('<a href="' + r.html_url + '">' +
                                      r.name + '</a> ' +
                                      r.stargazers_count + ' <i class="fas fa-star"></i> | ' +
                                      r.forks + ' <i class="fas fa-code-branch"></i>'));
    return output.join('<br>');
};

let getBestRepos = function() {
    return new Promise((resolve, reject) => {
        getGithubRepos(function(statusCode, result) {
            resolve(getMaxStargazers(result));
        });
    });
};

let getGithubRepos = function(onResult) {
    let options = {
        host: 'api.github.com',
        path: '/users/' + user.getGithub() + '/repos',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'
        }
    };

    let req = https.request(options, function(res) {
        let output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            let obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log('error: ' + err.message);
    });

    req.end();
};

let getMaxStargazers = function(repos) {
    let top3Repos = [];
    let sortedRepos = quicksort(repos, 0, repos.length);
    // This is a hack where it removes an unnecessary added repo at the end
    sortedRepos.pop();
    for (let i = 0; i < 3; i++){
        top3Repos.push(sortedRepos.pop());
    }

    return JSON.parse(JSON.stringify(top3Repos));
};

let quicksort = function(a, low, high) {
    if (low < high) {
        let p = partition(a, low, high);
        quicksort(a, low, p - 1);
        quicksort(a, p + 1, high);
    }
    return a;
};

let partition = function(a, low, high) {
    let pivot = a[low]['stargazers_count'];
    let i = low;
    for (let j = low; j < high - 1; j++) {
        if (a[j]['stargazers_count'] <= pivot) {
            if (i !== j) {
                let temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
            i += 1;
        }
    }
    let temp = a[i];
    a[i] = a[high];
    a[high] = temp;
    return i;
};

module.exports = whoami;
