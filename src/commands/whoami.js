const https = require('https');
const axios = require('axios');

const user = require('../user');
const repos = require('../repos.js');

let whoami = async function() {
    let output = [];

    let table = user.getTableInfo();

    table += '<td>';
    let repoStats = await getPinnedGhRepos();
    repoStats.repos.forEach((k, v) =>
	table += '<a href="' + r.html_url + '">' +
            r.name + '</a> ' +
            r.stargazers_count + ' <i class="fas fa-star"></i> | ' +
            r.forks + ' <i class="fas fa-code-branch"></i><br>');
    table += '</td></tr></table>';

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

let getPinnedGhRepos = function() {

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

module.exports = whoami;
