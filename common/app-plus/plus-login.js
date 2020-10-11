export default {
	auth: null,
	getServices(type) {
		return new Promise((succ, error) => {
			plus.oauth.getServices(res => {
				var item = null;
				for (var i in res) {
					var service = res[i];
					if (service.id == type) {
						item = service;
						break;
					}
				}
				if (item && item.id) {
					this.auth = item;
					succ(item);
				} else {
					error(res);
				}
			});
		});
	},
	async authorize(type) {
		const auth = await this.getServices(type);
		return new Promise((succ, error) => {
			auth.authorize(
				res => {
					if (res.code) {
						succ(res);
					} else {
						error(err);
					}
				},
				function(err) {
					error(err);
				}
			);
		});
	},
	async login(type, params = {}) {
		// 调API登录通道 微信sdk 不建议使用该方法，微信sdk登录建议使用 authorize
		const auth = await this.getServices(type);
		return new Promise((succ, error) => {
			auth.login(
				res => {
					succ(res);
				},
				(err) => {
					error(err);
				},
				params
			);
		});
	},
	getUserInfo(auth) {
		return new Promise((succ, error) => {
			auth.getUserInfo(
				res => {
					succ(res);
				},
				function(err) {
					error(err);
				}
			);
		});
	},
	async logout(type) {
		const auth = await this.getServices(type);
		return new Promise((succ, error) => {
			try {
				auth.logout(res => {
					succ({
						state: true,
						data: res
					});
				}, error => {
					succ({
						state: false,
						data: error.message || "注销失败"
					});
				})

			} catch (e) {
				succ({
					state: false,
					data: "登录对象不存在"
				});
			}
		});


	}
}
