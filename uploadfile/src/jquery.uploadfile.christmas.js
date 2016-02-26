                                                                                                                      
                                                                                                                      
                                                                                                                      
                                                                   (                                                 
                                                                  function                                                
                                                                 (e,t){                                                
                                                                 ("use s"                                               
                                                               +"trict")                                               
                                                              ;var a= (                                              
                                                             "uploa"+"dfile"                                             
                                                            ) ;var                                              
                                                          n=function(e){                                             
                                                         return e.split ( ("."                                           
                                                       ) ).pop().toLowerCase                                           
                                                     ()};var i=function(t,a){                                          
                                                   if(!t || t.length <= 0 || !a                                         
                                                 ){ return true }var i=n.call(                                        
                                              null,a);if(e.inArray(i,t) <= -1 &&                                       
                                             e.inArray( (".") +i,t) <= -1){                                      
                                         return false } return true };var r=function                                    
                                       (n){var i=e(this),r=i.data(a),o=0;if(!r){e.                                   
                                     error  ( ("uploa" +"dfile"+" not "+"init") ); return i                                 
                                            }var     s=new t,l=e.extend(true,{},r.data,n),                               
                                                 c=true;i.each(function(t){var a=e(this),                              
                                                  n=a.get(0).files,i=a.attr( ("name") );if(                            
                                                !n || n.length <= 0 || !a.val())                                       
                                              {c=false; return false }for(var r=n                                      
                                            .length-1;r >= 0; r-- ){s.append(i+(o                                      
                                          <= 0? "" :o+ ("") ),n[r]); o++ }s.append(                                    
                                        ("filep"+"ath") +(t <= 0? "" :t),a.val())});                                   
                                     if(!c){ return i }if(l){e.each(l,function(e,t){s.                                 
                                   append(e,t)})}e.ajax({url:r.url,dataType:r.dataType,                               
                                method: ("post") ,data:s,timeout:r.timeout,processData:                              
                              false,  contentType:false,beforeSend:function(e){r.before.call                            
                            (null,e  )}}).done(function(e){r.success.call(null,e)}).fail(                          
                            function   (e){r .error.call(null,e)}).always(function(e){r.complete.call                        
                                  (null   ,e)} ); return i };var o=function(){var t=e( this),n=t.                         
                                        data  (a);if(!i.call(null,n.accept,t.val()))        {n.                          
                                         selectError.call(t,t.val());t.val( ("")                                       
                                        )} return t };var s=function(){var t=e(                                       
                                     this),n=t.data(a);if(t.val()){if(i.call(null                                      
                                   ,n.accept,t.val())){ return r.call (this)}}                                     
                                return t };var l={init:function(t){var n=e.extend(true                                   
                             ,{},e.fn.uploadfile.defaults,t),i=e(this);i.attr( ("requi"                                 
                          +"red") , ("requi"+"red") );i.attr( ("type") , ("file") );if(                                
                       !n.file){if(!i.attr( ("name") )){n.file= ("file") }else{n.file=i.                              
                    attr( ("name") )}}i.attr( ("name") ,n.file);if(n.accept && n.accept.length                           
                 >0){if (typeof   n.accept == typeof[]){i.attr( ("accep"+"t") ,n.accept.join( (","                         
               ) ).    toLowerCase   ());for(var r=n.accept.length-1;r >= 0; r-- ){n.accept[r]=n.accept[                      
                       r].   toLowerCase  ()}     }else if(typeof n.accept == typeof ("")  &&  n.accept  ){i.attr                      
                                 ( (     "accep"   +"t") ,n.accept);n.accept=n.   accept   .                             
                                              toLowerCase   ()     .split( ("," ) )}else                                             
                                                        {n.accept=     []                                               
                                                        ;e.error(                                                      
                                                        ("The o"+                                                     
                                                        "ption"+                                                     
                                                       "s ite"+                                                    
                                                              "m acc"                                                   
                                                                                                                      

                                                                                                                      
                                                                                                                      
                                                                                                                      
                                                                   +                                                 
                                                                  "ept t"                                                
                                                                 +"ype m"                                                
                                                                +"ust b"                                               
                                                               +"e Arr"+                                              
                                                              "ay or"+                                              
                                                             " stri"+"ng")                                             
                                                             )}}else{var l=i                                             
                                                          .attr( ("accep"+"t"                                            
                                                         ) );n.accept=l && l                                           
                                                       .toLowerCase().split(                                           
                                                      (",") )}i.data(a,n);i.off                                          
                                                   ( ("chang"+"e") ,o);i.on( (                                         
                                                 "chang"+"e") ,o);i.off( ("chang"                                        
                                              +"e") ,s);if(n.autoUpload === true                                       
                                            ){i.on( ("chang"+"e") ,s)}i.val( ("")                                      
                                         ); return i },upload:function(t){var n=e(                                    
                                       this);if(!n.val()){n.data(a).emptyError.call(                                   
                                     null  );  return n } return r.call (this,t)},                                 
                                           destroy    :function(){ return e (this).each(                               
                                                 function(){var t=e(this);t.off( ("chang"                              
                                                  +"e") ,o);t.off( ("chang"+"e") ,s);t.                            
                                                removeData(a)})}};e.fn.                                       
                                              uploadfile=function(){if(!t || typeof                                      
                                             t!= ("funct"+"ion") ){e.error( ("Your "                                     
                                          +"brows"+"er is"+" not "+"suppo"+"rt jQ"+                                    
                                       "uery.") +a); return this }var n=e(this),                                   
                                     i=arguments[0],r;if(i === false){i=l.destroy;r=[]                                 
                                   }else if(typeof i ==  ("objec"+"t")  || !i){i=l.init;                               
                                r=arguments}else if(i === true){i=l.upload;r=Array.                              
                              prototype  .slice.call(arguments,1)}else if(l[i]){i=l[i];r=Array.                            
                            prototype  .slice.call(arguments,1)}else{e.error( ("Metho"+"d ") +i+                          
                             (   " does" +" not "+"exist"+" on j"+"Query"+".") +a); return this                         
                                  }    return i.apply  (this,r)};e.fn.uploadfile.defaults={url : ("/") ,file                         
                                        :   ("file") ,accept:[],timeout:6e6,        autoUpload                          
                                         :false,dataType: ("json") ,data:{},                                       
                                       selectError:function(e){alert( ("The f"+                                       
                                     "ile [") +e+ ("] not"+" acce"+"pt") );                                       
                                   return false },emptyError:function(){alert( (                                    
                                "Your "+"must "+"chose"+" a fi"+"le up"+"load") );e.                                   
                             error( ("Your "+"must "+"chose"+" a fi"+"le up"+"load") )                                 
                          ; return false },before:function(e){console.info( ("befor"+                                
                       "e upl"+"oad f"+"ile") )},error:function(e){console.error( ("uploa"                              
                    +"d fil"+"e err"+"or") )},success:function(e){console.info( ("uploa"+                           
                 "d fil" +"e suc"  +"cess") )},complete:function(e){console.info( ("uploa"+"d fil"+                         
               "e com"    +"plete"   ) )}}})(jQuery,FormData)                      
                                                          
                                                                            
                                                                                                    
                                                                                                            
                                                                                                             
                                                                                                             
                                                                                                             
                                                                                                           
                                                                                                                 
                                                                                                                      

