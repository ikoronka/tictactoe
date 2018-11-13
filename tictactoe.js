// OK, just so you know, i really wanted to die while checking if anyone's won.innerHTMLyet, so i took an itsy bitsy peek at the documentation of this "problem"

// VARIABLES
var tds = document.getElementsByTagName("td");
var xtimes = 0;
//when to stop putting X and Os
var numXOs = 0;
var win = 0;
var won = $("#win").get(0);
var end = false;
var start = 0;

//makes a new array, later uses checkResult() 
var arr = new Array(3)
$(function () {
	var arr = new Array(3)
	for (i = 0; i < 3; i++)
		arr[i] = new Array(3)

	// function, that gets the score and displays win
	function score(num) {
		if (win === 1 && num === 1) {
			return Number($("#O").get(0).innerHTML) + 1;
		} else if (win === -1 && num === 1) {
			return Number($("#X").get(0).innerHTML) + 1;
		} else if (win === 1 && !end) {
			var score = Number($("#O").get(0).innerHTML) + 1;
			end = true;
			$("#O").get(0).innerHTML = score.toString();
		} else if (win === -1 && !end) {
			var score = Number($("#X").get(0).innerHTML) + 1;
			end = true;
			$("#X").get(0).innerHTML = score.toString();
		}
	}

	// i'd say pretty self-explanatory
	var checkResult = function () {
		$("table tr").each(function (i, val) {
			$(this).find('td').each(function (j, val2) {
				arr[i][j] = parseInt($(this).attr("data-points"));
			});
		});

		for (var i = 0; i < 3; i++) {
			var rowSum = 0;
			for (var j = 0; j < 3; j++) {
				rowSum += arr[i][j];
			}
			if (rowSum === 3 && win == 0) {
				win = 1;
				won.innerHTML = "Circle won!!!"
			} else if (rowSum === -3 && win == 0) {
				win = -1;
				won.innerHTML = "Cross won!!!"
			}
		}

		for (var i = 0; i < 3; i++) {
			var colSum = 0;
			for (var j = 0; j < 3; j++) {
				colSum += arr[j][i];
			}
			if (colSum === 3 && win == 0) {
				win = 1;
				won.innerHTML = "Circle won!!!"
			} else if (colSum === -3 && win == 0) {
				win = -1;
				won.innerHTML = "Cross won!!!"
			}
		}

		if (arr[0][0] + arr[1][1] + arr[2][2] === 3 && win == 0) {
			win = 1;
			won.innerHTML = "Circle won!!!"
		} else if (arr[0][0] + arr[1][1] + arr[2][2] === -3 && win == 0) {
			win = -1;
			won.innerHTML = "Cross won!!!"
		}

		if (arr[2][0] + arr[1][1] + arr[0][2] === 3 && win == 0) {
			win = 1;
			won.innerHTML = "Circle won!!!"
		} else if (arr[2][0] + arr[1][1] + arr[0][2] === -3 && win == 0) {
			win = -1;
			won.innerHTML = "Cross won!!!"
		}
		score();
	}


	// put a thingy in the thingy when you click on thingy
	// TODO:
	$('td').on('click', function () {
		var td = $(this).get(0);
		if (win == 1 || win == -1) {
			alert('field is filled or it is the end of the game');
		} else {
			// painfully checking who's starting
			if (xtimes == 0 && start == 1) {
				$(this).attr("data-points", 1).innerHTML = "0";
				$(this).get(0).innerHTML = "O";
				xtimes += 1;
				numXOs++;
			} else if (xtimes == 0 && start == -1) {
				$(this).attr("data-points", -1).innerHTML = "X";
				$(this).get(0).innerHTML = "X";
				xtimes += 2;
				numXOs++;
				// actual filling out after start
			} else if (xtimes % 2 == 0 && numXOs < 9 && td.innerHTML == "" && win != 1) {
				$(this).attr("data-points", 1).innerHTML = "0";
				$(this).get(0).innerHTML = "O";
				xtimes += 1;
				numXOs++;
			} else if (numXOs < 9 && td.innerHTML == "" && win != 1) {
				$(this).attr("data-points", -1).innerHTML = "X";
				$(this).get(0).innerHTML = "X";
				xtimes += 1;
				numXOs++;
			}
		}
		checkResult();
	});
	
	//refresh everything
	$(".btn").on("click", function () {
		var tds = $("td");
		if (win == 1) {
			start = 1;
			console.log($("#winner").get(0));
			won.innerHTML = "Circle is starting";
		} else if (win == -1) {
			start = -1;
			won.innerHTML = "Cross is starting";
		}
		tds.get().forEach(function (td) {
			td.innerHTML = "";
			win = 0;
			xtimes = 0;
			numXOs = 0;
			end = false;
		})
		tds.each(function () {
			$(this).attr("data-points", 0);
		})
	})
});

//gives ids to tds
for (i = 0; i < tds.length; i++) {
	$(tds[i]).attr("id", i.toString());
}
