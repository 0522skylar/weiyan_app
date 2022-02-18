// const BASE_URL = "http://192.168.43.249:80/home";
const BASE_URL = "http://localhost:80";
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method:options.method || "GET",
			data: options.data || null,
			success: (res) => {
				if( res.statusCode !== 200 ){
					return uni.showToast({
						title:"获取数据失败"
					});
				}
				resolve(res);
			},
			fail: (err) => {
				uni.showToast({
					title:"获取数据失败"
				})
				reject(err);
			}
		})
	})
}