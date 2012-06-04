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

	this_3d.subscriptions = []

	this.events = {}
  _.extend(this.events, Backbone.Events)
	
	// functions

	// Conection + subscribe Webdis
	this.connect = function(){
		if("WebSocket" in window){
			var ws = new WebSocket('ws://127.0.0.1:7379')
			console.log(ws)
			ws.onopen = function(){
				this_3d.subscribeAll()
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
		console.log("subscribe to "+this_3d.subscriptions)

		//this_3d.ws.send(JSON.stringify(['UNSUBSCRIBE']))
		//this_3d.ws.send(JSON.stringify(['PUNSUBSCRIBE']))

		for(var i=0; i<this_3d.subscriptions.length; i++){
			this_3d.ws.send(JSON.stringify(['SUBSCRIBE', this_3d.subscriptions[i]]))
		}
	}

	// Translations
	this.transX = function(nom, variable){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var position = {x: elements.objects[nom].position.x}
			var tweenX = new TWEEN.Tween(position).to({x:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				elements.objects[nom].position.x = position.x
			})
			tweenX.start()
		})
	}

	this.transY = function(nom, variable){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var position = {y: elements.objects[nom].position.y}
			var tweenY = new TWEEN.Tween(position).to({y:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				elements.objects[nom].position.y = position.y
			})
			tweenY.start()
		})
	}

	this.transZ = function(nom, variable){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			 var position = {z: elements.objects[nom].position.z}
			 var tweenZ = new TWEEN.Tween(position).to({z:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
			 	elements.objects[nom].position.z = position.z
			 })
			 tweenZ.start()
		})
	}

	// Rotations
	this.rotX = function(nom, variable){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var rotation = {x: elements.objects[nom].rotation.x}
			var rotaX = new TWEEN.Tween(rotation).to({x:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				elements.objects[nom].rotation.x = rotation.x
			})
			rotaX.start()
		})
	}

	this.rotY = function(nom, variable){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var rotation = {y: elements.objects[nom].rotation.y}
			var rotaY = new TWEEN.Tween(rotation).to({y:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				elements.objects[nom].rotation.y = rotation.y
			})
			rotaY.start()
		})
	}

	this.rotZ = function(nom, variable){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var rotation = {z: elements.objects[nom].rotation.z}
			var rotaZ = new TWEEN.Tween(rotation).to({z:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				elements.objects[nom].rotation.z = rotation.z
			})
			rotaZ.start()
		})
	}

	// Echelles
	/*
	adapter la position de l'élement afin qu'il change de taille en fonction de la position de base souhaitée (top/middle/bottom)
	*/
	this.scaleX = function(nom, variable, level){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var h1 = elements.objects[nom].scale.x
			var p1 = elements.objects[nom].position.x

			var scale = {x: elements.objects[nom].scale.x}
			var scaX = new TWEEN.Tween(scale).to({x:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				var h2 = elements.objects[nom].scale.x

				switch(level){
					case "top":
						elements.objects[nom].position.x = p1 - (h1-h2)
						break
					case "middle":
						elements.objects[nom].position.x += 0 
						break
					case "bottom":
						elements.objects[nom].position.x = p1 + (h1-h2)
						break
				}

				elements.objects[nom].scale.x = scale.x
			})
			scaX.start()
		})
	}

	this.scaleY = function(nom, variable, level){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var h1 = elements.objects[nom].scale.y
			var p1 = elements.objects[nom].position.y

			var scale = {y: elements.objects[nom].scale.y}
			var scaY = new TWEEN.Tween(scale).to({y:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				var h2 = elements.objects[nom].scale.y

				switch(level){
					case "top":
						elements.objects[nom].position.y = p1 - (h1-h2)
						break
					case "middle":
						elements.objects[nom].position.y += 0 
						break
					case "bottom":
						elements.objects[nom].position.y = p1 + (h1-h2)
						break
				}

				elements.objects[nom].scale.y = scale.y
			})
			scaY.start()
		})
	}

	this.scaleZ = function(nom, variable, level){
		this_3d.subscriptions.push('var:' + variable)

		this_3d.events.bind('var:'+variable, function(value){
			var h1 = elements.objects[nom].scale.z
			var p1 = elements.objects[nom].position.z

			var scale = {z: elements.objects[nom].scale.z}
			var scaZ = new TWEEN.Tween(scale).to({z:value/100},1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
				var h2 = elements.objects[nom].scale.z

				switch(level){
					case "top":
						elements.objects[nom].position.z = p1 - (h1-h2)
						break
					case "middle":
						elements.objects[nom].position.z += 0 
						break
					case "bottom":
						elements.objects[nom].position.z = p1 + (h1-h2)
						break
				}

				elements.objects[nom].scale.z = scale.z
				
			})
			scaZ.start()
		})
	}
}
