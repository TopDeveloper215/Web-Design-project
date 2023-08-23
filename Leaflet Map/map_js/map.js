var img;
            var offSiteX = -0.00001532;
            var offSiteY =  0.00005708;
            var lat;
            var lon;
            var latlng;
            var labelFlag;
            var options;
            var angleMarker;
            var angle;
            var i=0;
            
            var map = L.map('map').setView([48.857,2.2922926], 17);
            
            var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            
            var popupMapLongLat = L.popup()
            function onMapClick(e) 
            {
                popupMapLongLat
                .setLatLng(e.latlng)
                .setContent('Coordenadas en el mapa ' + e.latlng.toString())
                .openOn(map);
            }
            
            var places=[];
            places[0]=[];  // longitude
            places[1]=[];  // latitude
            places[2]=[];  // string1
            places[3]=[];  // string2
            places[4]=[];  // custom icon
            
            var marker = null;
            var line = L.polyline([]).addTo(map);
            
            //Redraw the icon on the map and the tracking line for the car
            function redraw( Latitude,Longitude, string1, string2, icon) 
            {
                places[0].push(Longitude);
                places[1].push(Latitude);
                places[2].push(string1);
                places[3].push(string2);
                places[4].push(icon);
            
            //changes the color of the icon depending on the situationand status of the vehicle	
            switch(icon) {
                            case 1:
                            icon = 'http://eagleeye5g.itrackeagle.com/api/leaflet/images/eaglemobile_carnormal.png';
                            break;
                            case 2:
                            icon = 'http://eagleeye5g.itrackeagle.com/api/leaflet/images/eaglemobile_alarm.png';
                            break;
                            case 3:
                            icon = 'http://eagleeye5g.itrackeagle.com/api/leaflet/images/eaglemobile_engineon.png';
                            break;
                            case 4:
                            icon = 'http://eagleeye5g.itrackeagle.com/api/leaflet/images/eaglemobile_lowsignal.png';
                            break;
                            case 5:
                            icon = 'http://eagleeye5g.itrackeagle.com/api/leaflet/images/eaglemobile_driving.png';
                            
                        }
            var redIcon = L.icon({
                                    iconUrl: icon,
                                    iconSize: [41, 41], // size of the icon
                                    shadowSize: [41, 41], // size of the shadow
                                    iconAnchor: [21, 42], // point of the icon which will correspond to marker's location
                                    shadowAnchor: [14, 41], // the same for the shadow
                                    tooltipAnchor: [0, -42]//Making sure the Tootip is where is suppose to be
                                });
                                
                if (marker==null) 
                {
                    marker = L.marker([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                    .addTo(map)
                    .setIcon(redIcon);		
                }
                
                line.addLatLng([Latitude,Longitude]);
                
                if(i>0)
                {
                    marker.setLatLng([places[1][i-1], places[0][i-1]])
                    .addTo(map)
                    .unbindTooltip()
                    .setIcon(redIcon);
                }
            
                marker.setLatLng([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                                .addTo(map)
                                .setIcon(redIcon)
                                .bindTooltip(string1+'<br>'+string2+'KM/H', {permanent: true, interactive: true, direction: 'top'})
                                .on('move', function(e)
                                
                                {
                                var position = marker.getLatLng();
                                map.setView(position, 15);
                                
                            });
                if (i>0) {
                        img = new Image();
                        img.src = 'arrow.png';
                        lat = places[1][i-1] + offSiteY;
                        lon = places[0][i-1] - offSiteX;
                        latlng = {lat: lat, lon: lon};
                        options = {label: 1,labelFlag: false,labelColor: 'black',img: img};
                        angleMarker = L.angleMarker(latlng, options);
                        angle = 0;
                        previousLatLng = {lat:places[1][i-1], lon: places[0][i-1]};
                        nextLanLng = {lat: places[1][i], lon:places[0][i]};
                        angle = angleMarker.getAngle(previousLatLng, nextLanLng);
                        angleMarker.setHeading(angle);
                        map.addLayer(angleMarker);
                    }
            
                i++;
            
            }
            
            redraw(48.857,2.2922926,'a','b',1);
            setTimeout(redraw,1000,48.858,2.291,'b','45 ',2);
            setTimeout(redraw,2000,48.859,2.293,'c','65 ',3);
            setTimeout(redraw,3000,48.860,2.294,'d','85 ',4);
            setTimeout(redraw, 4000,48.862,2.294,'e','125 ',5);
            
            map.on('click', onMapClick);