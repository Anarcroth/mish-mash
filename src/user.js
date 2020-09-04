const fs = require('fs');

const readline = require('readline').createInterface({
    input: require('fs').createReadStream('./.conf')
});
const path = require('path');
const https = require('https');
const axios = require('axios');

const repos = require('./repos.js');

let user = function() {
    this.dirs = [];
    this.files = [];
    this.finalFiles = [];
    this.filesContents = [];

    this.github = '';
    this.basics = '';
    this.mypic = '';
    this.username = '';

    this.configPath = './.conf';
    this.contentsPath = './contents/';
};

user.prototype.init = function() {
    this.parseDirs();
    this.parseFiles();
};

user.prototype.parseFiles = function() {
    let dirContents = fs.readdirSync(this.contentsPath, 'utf8');
    for (let f = 0; f < dirContents.length; f++) {
        for (let fc = 0; fc < this.files.length; fc++) {
            if (this.files[fc].endsWith(dirContents[f])) {
                this.finalFiles.push(this.files[fc]);
                this.finalFiles.push(fs.readFileSync(this.contentsPath + dirContents[f], 'utf-8', function(){}));
            }
        }
    }
};

user.prototype.parseDirs = function() {
    let lines = fs.readFileSync(this.configPath, 'utf8', function(){}).split('\n');
    for (var line = 0; line < lines.length; line++) {
        if (lines[line].charAt(0) === '#') {
            lines.splice(line, 1);
            line -= 1;
        }
    }
    lines = lines.filter(n => n);

    // The equals sign indicates the right spot for the variable
    this.github = this.find(lines, 'github = ');
    this.basics = this.find(lines, 'basics = ');
    this.mypic = this.find(lines, 'mypic = ');
    this.username = this.find(lines, 'username = ');
    this.dirs = this.find(lines, 'sub_directories').split(' ');
    this.files = this.find(lines, 'files').split(' ');
};

user.prototype.find = function(lines, str) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].match(str)) {
            return lines[i].split(' = ')[1];
        }
    }
    return null;
};

user.prototype.readBasicsFile = function(basics){
    return fs.readFileSync(path.resolve(__dirname, basics));
};

user.prototype.getTableInfo = async function() {
    let htmlPic =
	'<img src="' + this.mypic + '" width="240" height="320">' +
	'<br><i>' + this.username + '</i>';
    let table =
	'<table><tr>' +
	'<td align="left">' + htmlPic + '</td>' +
	'<td>' + this.readBasicsFile(this.basics) + '</td>' +
	'<td><p align="right">';

    let repoStats = await this.getPinnedGhRepos();
    repoStats.repos.forEach((repo) =>
	table += '<a href="' + repo.url + '">' + repo.name + '</a>: ' +
            repo.stargazers + ' <i class="fas fa-star"></i> ' +
            repo.forks + ' <i class="fas fa-code-branch"></i><br>');
    table += '</p></td></tr></table>';
    return table;
};

let query = `
{
  user(login: "anarcroth") {
    pinnedItems(first: 6, types: REPOSITORY) {
      totalCount
      edges {
        node {
          ... on Repository {
            name
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            forks {
              totalCount
            }
            homepageUrl
            url
          }
        }
      }
    }
  }
}`;

user.prototype.getPinnedGhRepos = function() {

    let githubUrl = 'https://api.github.com/graphql';
    let token = process.env.GH_GQL_KEY;
    let oauth = {Authorization: 'bearer ' + token};

    return axios.post(githubUrl, {query: query}, {headers: oauth})
	.then((response) => {
	    // GraphQL returns a 'data' object
	    return new repos(response.data.data);
	})
	.catch((error) => {
	    alert(error);
	});
};

user.prototype.getGithub = function() {
    return this.github;
};

user.prototype.getDirs = function() {
    return JSON.parse(JSON.stringify(this.dirs));
};

user.prototype.getFiles = function() {
    return JSON.parse(JSON.stringify(this.files));
};

user.prototype.getFilesContents = function() {
    return JSON.parse(JSON.stringify(this.filesContents));
};

user.prototype.getFinalFiles = function() {
    return JSON.parse(JSON.stringify(this.finalFiles));
};

let u = new user();
u.init();

module.exports = u;
