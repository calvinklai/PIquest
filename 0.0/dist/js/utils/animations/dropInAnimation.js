define([],function(){function e(e,t){var n=60,r=300,i=e.requestAnimationFrame,s=e.cancelAnimationFrame;return{enter:function(e,o){function l(){var e=t()-f,c=e/r;if(e>r){u.style.top=0,s(a),o();return}u.style.top=n*(c-1)+"px",a=i(l)}var u=e[0],a,f=t();return e.css({top:-n+"px"}),a=i(l),function(t){t&&(s(a),e.css({top:"0px"}))}},leave:function(e,o){function l(){var e=t()-f,c=1-e/r;if(e>r){s(a),o();return}u.style.top=n*(c-1)+"px",a=i(l)}var u=e[0],a,f=t();return a=i(l),function(e){e&&s(a)}}}}return["$window","timerNow",e]});