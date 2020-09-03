let repos = function(data) {
    this.data = data;
    this.repos = {};

    this.parseData();
};

repos.prototype.parseData = function() {
    this.data.user.pinnedItems.edges.forEach(e => {
	let repo = e.node;
	this.repos[repo.name] = [repo.stargazers.totalCount, repo.forks.totalCount];
    });
};

module.exports = repos;
