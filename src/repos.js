let repos = function(data) {
    this.data = data;
    this.repos = [];

    this.parseData();
};

repos.prototype.parseData = function() {
    this.data.user.pinnedItems.edges.forEach(e => {
	let repo = {};
	let r = e.node;
	repo.name = r.name;
	repo.stargazers = r.stargazers.totalCount;
	repo.forks = r.forks.totalCount;
	repo.url = r.url;
	this.repos.push(repo);
    });
};

module.exports = repos;
