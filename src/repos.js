let repos = function(data) {
    this.data = data;
    this.repos = [];

    this.parseData();
};

let repo = function(name, stargazers, forks, url) {
    console.log(name + stargazers + forks + url);
    this.name = name;
    this.stargazers = stargazers;
    this.forks = forks;
    this.url = url;
};

repos.prototype.parseData = function() {
    this.data.user.pinnedItems.edges.forEach(e => {
	let repo = e.node;
	let stargazers = repo.stargazers.totalCount;
	let forks = repo.forks.totalCount;
	let url = repo.url;
	console.log( stargazers + forks + url);
	this.repos.push(new repo(repo.name, stargazers, forks, url));
    });
};

module.exports = repos, repo;
