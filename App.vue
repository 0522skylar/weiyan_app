<script>
	export default {
		onLaunch: function() {
			
			
		},
		onShow: function() {
			
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	a {
		-webkit-tap-highlight-color: transparent;
		&:-webkit-any-link{
			cursor: none;
		}
	}
</style>
