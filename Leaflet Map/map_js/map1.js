            var img1;
            var offSiteX = -0.00001532;
            var offSiteY =  0.00005708;
            var lat1;
            var lon1;
            var latlng;
            var labelFlag;
            var options;
            var angleMarker;
            var angle;
            var i=0;
            
            var map_1 = L.map('map_1').setView([48.877,2.4922926], 17);
            
            var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map_1);
            
            var popupMapLong = L.popup()
            
            
            function onMapClick(e) 
            {
                popupMapLong
                .setLatLng(e.latlng)
                .setContent('Coordenadas en el mapa ' + e.latlng.toString())
                .openOn(map_1);
            }
            
            var places=[];
            places[0]=[];  // longitude
            places[1]=[];  // latitude
            places[2]=[];  // string1
            places[3]=[];  // string2
            places[4]=[];  // custom icon
            
            var marker1 = null;
            var line1 = L.polyline([]).addTo(map_1);
            
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
                                
                if (marker1==null) 
                {
                    marker1 = L.marker([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                    .addTo(map_1)
                    .setIcon(redIcon);		
                }
                
                line1.addLatLng([Latitude,Longitude]);
                
                if(i>0)
                {
                    marker1.setLatLng([places[1][i-1], places[0][i-1]])
                    .addTo(map_1)
                    .unbindTooltip()
                    .setIcon(redIcon);
                }
            
                marker1.setLatLng([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                                .addTo(map_1)
                                .setIcon(redIcon)
                                .bindTooltip(string1+'<br>'+string2+'KM/H', {permanent: true, interactive: true, direction: 'top'})
                                .on('move', function(e)
                                
                                {
                                var position = marker1.getLatLng();
                                map_1.setView(position, 15);
                                
                            });
                if (i>0) {
                        img1 = new Image();
                        img1.src = 'arrow1.png';
                        lat1 = places[1][i-1] + offSiteY;
                        lon1 = places[0][i-1] - offSiteX;
                        latlng = {lat1: lat1, lon1: lon1};
                        options = {label: 1,labelFlag: false,labelColor: 'black',img: img};
                        angleMarker = L.angleMarker(latlng, options);
                        angle = 0;
                        previousLatLng = {lat1:places[1][i-1], lon1: places[0][i-1]};
                        nextLanLng = {lat1: places[1][i], lon1:places[0][i]};
                        angle = angleMarker.getAngle(previousLatLng, nextLanLng);
                        angleMarker.setHeading(angle);
                        map_1.addLayer(angleMarker);
                    }
            
                i++;
            
            }
            
            redraw(48.877,2.4922926,'a','b',1);
            setTimeout(redraw,1000,48.876,2.491,'b','25 ',2);
            setTimeout(redraw,2500,48.875,2.493,'c','35 ',3);
            setTimeout(redraw,4000,48.874,2.494,'d','45 ',4);
            setTimeout(redraw, 6000,48.873,2.494,'e','55 ',5);
            
            map_1.on('click', onMapClick);
            