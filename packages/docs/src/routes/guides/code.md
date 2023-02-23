<script>
	let arr = [0, 1];

	function handleClick () {
		// this method call does not trigger an update
		arr.push(2);
		// this assignment will trigger an update
		// if the markup references `arr`
		arr = arr
	}
</script>
