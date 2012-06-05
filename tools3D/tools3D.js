/*
 * tools3D.js
 *
 * Fonctions pour l'animation 3D de Scene Three-Blender
 *
 * Edit by Guillaume BOURBON
 */

function Tools(){
	this_3d = this
	this.version = '0.1'

	this.events = {}
  _.extend(this.events, Backbone.Events)

  this_3d.listVar = []
  this_3d.listObjets = {}

	// functions

	// Conection + subscribe Webdis
	this.connect = function(){
		if("WebSocket" in window){
			var ws = new WebSocket('ws://127.0.0.1:7379')
			console.log(ws)
			ws.onopen = function(){
				this_3d.subscribeAll()
				this_3d.createText()
			}
			ws.onmessage = function(evt) {
				msg = $.JSON.decode(evt.data)
				data = msg['SUBSCRIBE']
        if(data[0] == "message"){
        	this_3d.events.trigger(data[1], data[2])
        	this_3d.events.trigger('__all__',data)
        }
        else{
        	console.log('message inconnu')
        }
      }
      ws.onclose = function(){}
      this_3d.ws = ws
      return ws
		}
		else return false // not supported
  }

	this.subscribeAll = function(){
		console.log("subscribe to "+this_3d.listVar)

		this_3d.ws.send(JSON.stringify(['UNSUBSCRIBE']))
		this_3d.ws.send(JSON.stringify(['PUNSUBSCRIBE']))

		for(var i=0; i<this_3d.listVar.length; i++){
			this_3d.ws.send(JSON.stringify(['SUBSCRIBE', 'var:'+this_3d.listVar[i]]))
		}
	}
//---------------------------------------------------------------------------

	// Translations
	this.transX = function(nom, variable){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var position = {x: elements.objects[nom].position.x}
			var tweenX = new TWEEN.Tween(position).to({x:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				elements.objects[nom].position.x = position.x
			})
			tweenX.start()
		})
	}

	this.transY = function(nom, variable){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var position = {y: elements.objects[nom].position.y}
			var tweenY = new TWEEN.Tween(position).to({y:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				elements.objects[nom].position.y = position.y
			})
			tweenY.start()
		})
	}

	this.transZ = function(nom, variable){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			 var position = {z: elements.objects[nom].position.z}
			 var tweenZ = new TWEEN.Tween(position).to({z:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
			 	elements.objects[nom].position.z = position.z
			 })
			 tweenZ.start()
		})
	}
//---------------------------------------------------------------------------

	// Rotations
	this.rotX = function(nom, variable){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var rotation = {x: elements.objects[nom].rotation.x}
			var rotaX = new TWEEN.Tween(rotation).to({x:value/100},1000).easing(TWEEN.Easing.Elastic.Out).onUpdate(function(){
				elements.objects[nom].rotation.x = rotation.x
			})
			rotaX.start()
		})
	}

	this.rotY = function(nom, variable){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var rotation = {y: elements.objects[nom].rotation.y}
			var rotaY = new TWEEN.Tween(rotation).to({y:value/100},1000).easing(TWEEN.Easing.Elastic.Out).onUpdate(function(){
				elements.objects[nom].rotation.y = rotation.y
			})
			rotaY.start()
		})
	}

	this.rotZ = function(nom, variable){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var rotation = {z: elements.objects[nom].rotation.z}
			var rotaZ = new TWEEN.Tween(rotation).to({z:value/100},1000).easing(TWEEN.Easing.Elastic.Out).onUpdate(function(){
				elements.objects[nom].rotation.z = rotation.z
			})
			rotaZ.start()
		})
	}
//---------------------------------------------------------------------------

	// Echelles
	this.scaleX = function(nom, variable, level){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var h1 = elements.objects[nom].scale.x
			var p1 = elements.objects[nom].position.x
			var h2 = 0

			var scale = {x: elements.objects[nom].scale.x}
			var scaX = new TWEEN.Tween(scale).to({x:value/100},1000).easing(TWEEN.Easing.Linear.None).onUpdate(function(){
				h2 = elements.objects[nom].scale.x

				switch(level){
					case "top":
						elements.objects[nom].position.x = p1 - (h1-h2)*0.9
						elements.objects[nom].scale.x = scale.x
						break
					case "middle":
						elements.objects[nom].position.x += 0 
						elements.objects[nom].scale.x = scale.x
						break
					case "bottom":
						elements.objects[nom].position.x = p1 + (h1-h2)*0.9
						elements.objects[nom].scale.x = scale.x
						break
				}
			})
			scaX.start()
		})
	}

	this.scaleY = function(nom, variable, level){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var h1 = elements.objects[nom].scale.y
			var p1 = elements.objects[nom].position.y
			var h2 = 0

			var scale = {y: elements.objects[nom].scale.y}
			var scaY = new TWEEN.Tween(scale).to({y:value/100},1000).easing(TWEEN.Easing.Linear.None).onUpdate(function(){
				h2 = elements.objects[nom].scale.y

				switch(level){
					case "top":
						elements.objects[nom].position.y = p1 - (h1-h2)*0.9
						elements.objects[nom].scale.y = scale.y
						break
					case "middle":
						elements.objects[nom].position.y += 0 
						elements.objects[nom].scale.y = scale.y
						break
					case "bottom":
						elements.objects[nom].position.y = p1 + (h1-h2)*0.9
						elements.objects[nom].scale.y = scale.y
						break
				}
			})
			scaY.start()
		})
	}

	this.scaleZ = function(nom, variable, level){
		this_3d.listObject(nom, variable)

		this_3d.events.bind('var:'+variable, function(value){
			var h1 = elements.objects[nom].scale.z
			var p1 = elements.objects[nom].position.z
			var h2 = 0

			var scale = {z: elements.objects[nom].scale.z}
			var scaZ = new TWEEN.Tween(scale).to({z:value/100},1000).easing(TWEEN.Easing.Linear.None).onUpdate(function(){
				h2 = elements.objects[nom].scale.z
				
				switch(level){
					case "top":
						elements.objects[nom].position.z = p1 - (h1-h2)*0.9
						elements.objects[nom].scale.z = scale.z
						break
					case "middle":
						elements.objects[nom].position.z += 0 
						elements.objects[nom].scale.z = scale.z
						break
					case "bottom":
						elements.objects[nom].position.z = p1 + (h1-h2)*0.9
						elements.objects[nom].scale.z = scale.z
						break
				}
			})			
			scaZ.start()
		})
	}
//---------------------------------------------------------------------------

	this.createText = function(){
		//mise en place du bandeau sur la gauche ave la liste des variables et les objets qui y sont associés
		var content =  "<ul>"
		for(var i=0;i<this_3d.listVar.length;i++){
			
			content += '<li><span id="'+this_3d.listVar[i]+'">'+this_3d.listVar[i]+'</span><ul>'
			for(var j=0;j<this_3d.listObjets[this_3d.listVar[i]].length;j++){
				content += '<li class="'+this_3d.listObjets[this_3d.listVar[i]][j]+'">'+this_3d.listObjets[this_3d.listVar[i]][j]+'</li>'
			}
			content += '</ul></li>' 
		}
		content += "</ul>"

		document.getElementById('list').innerHTML = content

		//intéractions avec la liste
		for(var k=0;k<this_3d.listVar.length;k++){
			var element = document.getElementById(this_3d.listVar[k])
			element.onmouseover = function(){
				// au besoin
			}
			element.onmouseout = function(){
				// au besoin
			}
			
			element.onclick = function(){
				// au besoin
			}			
		}

		var li = document.getElementsByTagName('li')
		var liClass = []

		for(var x=0;x<li.length;x++){
			liClass[x] = li[x]
		}

		for(var i=0;i<liClass.length;i++){
			if(liClass[i].getAttribute('class') == null){
				liClass.splice(i,1)
			}
		}

		for(var k=0;k<liClass.length;k++){
			liClass[k].onmouseover = function(){
				this.style.color = 'blue'
				this.style.cursor = 'pointer'
			}
			liClass[k].onmouseout = function(){
				this.style.color = 'black'
			}
			liClass[k].onclick = function(){
				nomObj = this.getAttribute('class')
				var obj = this
				if(elements.objects[nomObj].visible){
					elements.objects[nomObj].visible = false
					for(var j=0;j<liClass.length;j++){
						if(liClass[j].getAttribute('class') == obj.getAttribute('class')){
							if(liClass[j] != obj){
								liClass[j].style.textDecoration = 'line-through'
							}
						}
					}
					this.style.textDecoration = 'line-through'
					//().style.textDecoration = 'line-through'
				}
				else{
					elements.objects[nomObj].visible = true
					for(var j=0;j<liClass.length;j++){
						if(liClass[j].getAttribute('class') == obj.getAttribute('class')){
							if(liClass[j] != obj){
								liClass[j].style.textDecoration = 'none'
							}
						}
					}
					this.style.textDecoration = 'none'
					//().style.textDecoration = 'none'
				}
			}
		}
	}

	this.listObject = function(nom, variable){
		this_3d.listVar.push(variable)
		
		for(var i=0;i<this_3d.listVar.length;i++){
			var valeur = this_3d.listVar[i]
			for(var j=0;j<this_3d.listVar.length;j++){
 				if(j != i && this_3d.listVar[j] == valeur){
					// doublons
					this_3d.listVar.splice(j,1)	
				}
			}
		}

		if(!(this_3d.listObjets.hasOwnProperty(variable))){
			this_3d.listObjets[variable]=[]
		}
		
		if(this_3d.listObjets[variable].indexOf(nom) == -1){
			this_3d.listObjets[variable].push(nom)
		}

		this_3d.events.bind('var:'+variable, function(value){
			document.getElementById(variable).innerHTML = variable+' : '+value
		})
	}
}
