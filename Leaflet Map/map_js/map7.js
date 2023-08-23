var img;
            var offSiteX = -0.00001532;
            var offSiteY =  0.00005708;
            var lat7;
            var lon7;
            var latlng;
            var labelFlag;
            var options;
            var angleMarker;
            var angle;
            var i=0;
            
            var map_7 = L.map('map_7').setView([46.025,2.3922926], 17);
            
            var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map_7);
            
            var popupMapLong = L.popup()
            
            
            function onMapClick(e) 
            {
                popupMapLong
                .setLatLng(e.latlng)
                .setContent('Coordenadas en el mapa ' + e.latlng.toString())
                .openOn(map_7);
            }
            
            var places=[];
            places[0]=[];  // longitude
            places[1]=[];  // latitude
            places[2]=[];  // string1
            places[3]=[];  // string2
            places[4]=[];  // custom icon
            
            var marker7 = null;
            var line7 = L.polyline([]).addTo(map_7);
            
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
                                
                if (marker7==null) 
                {
                    marker7 = L.marker([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                    .addTo(map_7)
                    .setIcon(redIcon);		
                }
                
                line7.addLatLng([Latitude,Longitude]);
                
                if(i>0)
                {
                    marker7.setLatLng([places[1][i-1], places[0][i-1]])
                    .addTo(map_7)
                    .unbindTooltip()
                    .setIcon(redIcon);
                }
            
                marker7.setLatLng([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                                .addTo(map_7)
                                .setIcon(redIcon)
                                .bindTooltip(string1+'<br>'+string2+'KM/H', {permanent: true, interactive: true, direction: 'top'})
                                .on('move', function(e)
                                
                                {
                                var position = marker7.getLatLng();
                                map_7.setView(position, 15);
                                
                            });
                if (i>0) {
                        img = new Image();
                        img.src = 'http://eagleeye5g.itrackeagle.com/api/leaflet/images/arrow.png';
                        lat7 = places[1][i-1] + offSiteY;
                        lon7 = places[0][i-1] - offSiteX;
                        latlng = {lat7: lat7, lon7: lon7};
                        options = {label: 1,labelFlag: false,labelColor: 'black',img: img};
                        angleMarker = L.angleMarker(latlng, options);
                        angle = 0;
                        previousLatLng = {lat7:places[1][i-1], lon7: places[0][i-1]};
                        nextLanLng = {lat7: places[1][i], lon7:places[0][i]};
                        angle = angleMarker.getAngle(previousLatLng, nextLanLng);
                        angleMarker.setHeading(angle);
                        map_7.addLayer(angleMarker);
                    }
            
                i++;
            
            }
            
            redraw(46.025,2.3922926,'a','b',1);
            setTimeout(redraw,1000,46.022,2.391,'b','45 ',2);
            setTimeout(redraw,2500,46.024,2.393,'c','78 ',3);
            setTimeout(redraw,4000,46.021,2.394,'d','105 ',4);
            setTimeout(redraw, 6000,46.026,2.396,'e','145 ',5);
            
            map_7.on('click', onMapClick);
            