/*!
 * Q.js<https://github.com/itorr/q.js>
 * Version: 1.2
 * Built: 2014/12/28
 */
var 
Q=function(W,D,HTML,hash,view,arg,_arg,i,index,Regex,key,Q,uri,param,pamkey,hasharr){
	HTML=D.documentElement;
	Regex=[];
	key='';
    pamkey='!';
	onhashchange=function(){
		Q.hash=hash=location.hash.substring(key.length+1);
		hasharr=hash.split(/\?/g).shift().split(pamkey);
		uri=hasharr[0];
        param=hasharr[1];
        arg=hasharr.slice(0,1);
        if(!(uri in Q)){
            i=Regex.length;
            while(i--){
                if(_arg=uri.match(Regex[i])){
                    arg=_arg;
                    arg.unshift(Regex[i]);
                    break;
                }
			}

		}else{
            arg.splice(1,0,uri);
		}

		if(!Q[arg[0]]){
            // default
            arg=[];
            arg[0]=index;
            arg[1]=index;
		}

		if(param){
            var pamjson=new Object(),
            urlpams=param.split("&");

			for(var j=0;j<urlpams.length;j++){
				pamjson[urlpams[j].split("=")[0]]=urlpams[j].split("=")[1];
			}

			arg.splice(2,0,pamjson);
		}else{
			arg.splice(2,0,undefined);
		}
		
		var isPopOver=null;
		
		if(Q.pop){
			
			isPopOver=Q.pop.apply(W,arg);
		}
		
		$.when(isPopOver).done(function(){
			
			Q.lash=view=arg.shift();

			HTML.setAttribute('view',view);

			Q[view].apply(W,arg);
		});


	};

	
	if(!'onhashchange' in W){
		Q.path=location.hash;
		setInterval(function(){
			if(Q.path!=location.hash){
				onhashchange();
				Q.path=location.hash;
			}
		},100);
	}

	Q={
		init:function(o){

			if(o.key!==undefined)
				key=o.key;

			index=o.index||'V';

			if(o.pop&&typeof o.pop=='function')
				Q.pop=o.pop;

			onhashchange();

			return this
		},
		reg:function(r,u){
			if(!r)
				return;

			if(u == undefined)
				u=function(){};

			if(r instanceof RegExp){ //正则注册
				Q[r]=u;
				Regex.push(r);
			}else if(r instanceof Array){ //数组注册
				for(var i in r){
					this.reg.apply(this,[].concat(r[i]).concat(u));
				}
			}else if(typeof r=='string'){ //关键字注册
				if(typeof u=='function')
					Q[r]=u;
				else if(typeof u=='string'&&Q[u])
					Q[r]=Q[u];
			}	
			
			return this
		},
		V:function(){
			console.log('Q.js <https://github.com/itorr/q.js> 2014/12/28');
			return this
		},
		go:function(u){
			location.hash='#'+key+u;
			return this
		}
	};
	return Q;
}(this,document);