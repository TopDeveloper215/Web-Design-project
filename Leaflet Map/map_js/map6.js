var img;
            var offSiteX = -0.00001532;
            var offSiteY =  0.00005708;
            var lat6;
            var lon6;
            var latlng;
            var labelFlag;
            var options;
            var angleMarker;
            var angle;
            var i=0;
            
            var map_6 = L.map('map_6').setView([45.532,2.3922926], 17);
            
            var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map_6);
            
            var popupMapLong = L.popup()
            
            
            function onMapClick(e) 
            {
                popupMapLong
                .setLatLng(e.latlng)
                .setContent('Coordenadas en el mapa ' + e.latlng.toString())
                .openOn(map_6);
            }
            
            var places=[];
            places[0]=[];  // longitude
            places[1]=[];  // latitude
            places[2]=[];  // string1
            places[3]=[];  // string2
            places[4]=[];  // custom icon
            
            var marker6 = null;
            var line6 = L.polyline([]).addTo(map_6);
            
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
                                
                if (marker6==null) 
                {
                    marker6 = L.marker([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                    .addTo(map_6)
                    .setIcon(redIcon);		
                }
                
                line6.addLatLng([Latitude,Longitude]);
                
                if(i>0)
                {
                    marker6.setLatLng([places[1][i-1], places[0][i-1]])
                    .addTo(map_6)
                    .unbindTooltip()
                    .setIcon(redIcon);
                }
            
                marker6.setLatLng([Latitude,Longitude], {icon: redIcon, zIndexOffset: 0})
                                .addTo(map_6)
                                .setIcon(redIcon)
                                .bindTooltip(string1+'<br>'+string2+'KM/H', {permanent: true, interactive: true, direction: 'top'})
                                .on('move', function(e)
                                
                                {
                                var position = marker6.getLatLng();
                                map_6.setView(position, 15);
                                
                            });
                if (i>0) {
                        img = new Image();
                        img.src = 'http://eagleeye5g.itrackeagle.com/api/leaflet/images/arrow.png';
                        lat6 = places[1][i-1] + offSiteY;
                        lon6 = places[0][i-1] - offSiteX;
                        latlng = {lat6: lat6, lon6: lon6};
                        options = {label: 1,labelFlag: false,labelColor: 'black',img: img};
                        angleMarker = L.angleMarker(latlng, options);
                        angle = 0;
                        previousLatLng = {lat6:places[1][i-1], lon6: places[0][i-1]};
                        nextLanLng = {lat6: places[1][i], lon6:places[0][i]};
                        angle = angleMarker.getAngle(previousLatLng, nextLanLng);
                        angleMarker.setHeading(angle);
                        map_6.addLayer(angleMarker);
                    }
            
                i++;
            
            }
            
            redraw(45.532,2.3922926,'a','b',1);
            setTimeout(redraw,1000,45.534,2.391,'b','14 ',2);
            setTimeout(redraw,2500,45.536,2.393,'c','36 ',3);
            setTimeout(redraw,4000,45.538,2.394,'d','57 ',4);
            setTimeout(redraw, 6000,45.540,2.396,'e','165 ',5);
            
            map_6.on('click', onMapClick);
            