export const handleTime=(time)=>{
		let minute = 1000*60,
		    hour =minute*60,
		    day=hour*24	,
		    month=day*30,
		    year = day*365,
			now=Date.parse(new Date()),
		 	vTime=Date.parse(new Date(time)),
		  	diffV=now-vTime,
		  	yearC=diffV/year,
		  	monthC=diffV/month,
		  	weekC=diffV/(7*day),
		  	dayC=diffV/day,
		  	hourC=diffV/hour,
		  	minC=diffV/minute;
		  	if(yearC>=1){
		  		  return  Math.floor(yearC)+' years ago'
		  	}else if(monthC>=1){
		  		return Math.floor(monthC)+' months ago'
		  	}else if(weekC>=1){
		  		return Math.floor(weekC)+' weeks ago'
		  	}else if(dayC>=1){
		  		return Math.floor(dayC)+' days ago'
		  	}else if (hourC>=1){
		  		return Math.floor(hourC)+ ' hours ago'
		  	}else if (minC>=1){
		  		return Math.floor(minC)+' minutes ago'
		  	}
		  	return 'recent'
	}
export const handleNum=function(num){
	    
		let toTho=(n)=>{
			n=typeof n ==='number'?n:Number(n);
		  return n.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
		}

		num=String(num)
		if(num ==='undefined'){return '···'}
		if(num.length>=9){
			
			num=Math.round(num.replace(/\d{8}$/,'.$&'));

			return toTho(num)+"亿"
		}
		else if(num.length>=5){
			num=Math.round(num.replace(/\d{4}$/,'.$&'));
			return toTho(num)+'万'
		}
		return toTho(num)
	}
