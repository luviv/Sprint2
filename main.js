window.addEventListener('load', () => {
    getData();
    async function getData() {
        const response = await fetch('./datos.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        const dataObjectList = [];
        var pesoV = document.getElementById('rangePeso');
        var edadV = document.getElementById('rangeEdad');
        var alturaV = document.getElementById('rangeAltura');
        var mascotasV = document.getElementById('rangeMascotas');
        var select = document.getElementById('dataA');
        var vectorPeso = [1, 1, 1, 1];
        var vectorCarac = [0, 0, 0, 0]
        var maxpeso;
        var maxedad;
        var maxaltura;
        var maxmascota;
        var minpeso;
        var minedad;
        var minaltura;
        var minmascota;
        console.log(rows);
        const dataA = document.getElementById('dataA');
        const dataB = document.getElementById('dataB');

        var pesos = [];
        var edades = [];
        var alturas = [];
        var mascotas = [];

        var usuarioSelec = 0;
        var personasNorma = [];

        edadV.addEventListener('change', () =>{
            vectorPeso[0] = parseFloat(edadV.value);
            console.log(vectorPeso[0]+ " Vector edad");
            getPersonasNorma();
            generarImgs();
            console.log(vectorPeso);
        });

        pesoV.addEventListener('change', () =>{
            vectorPeso[1] = parseFloat(pesoV.value);
            console.log(vectorPeso[1]+ " Vector peso");
            getPersonasNorma();
            generarImgs();
        });

        alturaV.addEventListener('change', () =>{
            vectorPeso[2] = parseFloat(alturaV.value);
            console.log(vectorPeso[2]+ " Vector altura");
            getPersonasNorma();
            generarImgs();
        });

        mascotasV.addEventListener('change', () =>{
            vectorPeso[3] = parseFloat(mascotasV.value);
            console.log(vectorPeso[3]+ " Vector mascotas");
            getPersonasNorma();
            generarImgs();
        });

        rows.forEach((e) => {
            const values = e.split(',');

            const dataObject = {
                nombre: values[0],
                edad: values[1],
                peso: values[2],
                altura: values[3],
                mascotas: values[4],
            }

            pesos.push(parseFloat(dataObject.peso));
            edades.push(parseFloat(dataObject.edad));
            alturas.push(parseFloat(dataObject.altura));
            mascotas.push(parseFloat(dataObject.mascotas));

            let option1 = document.createElement('option');
            option1.setAttribute('value', values[0]);
            option1.innerHTML = values[0];

            dataA.appendChild(option1);

            dataObjectList.push(dataObject);

        });

        //Seleccionar
        select.addEventListener('change', () => {
            
            console.log(select[select.selectedIndex].text);
            var contador = 0;
            dataObjectList.forEach((persona) => {
                if(persona.nombre == select[select.selectedIndex].text){
                    usuarioSelec = contador;
                }
                contador++;
               

            });
            getPersonasNorma();
            generarImgs();
            console.log("listo");
            console.log(calcularDist(usuarioSelec, personasNorma));

            console.log(personasNorma);
            console.log(usuarioSelec);
        });

        function getPersonasNorma(){
            personasNorma = [];
            dataObjectList.forEach((persona) => {
                
                    vectorCarac[0] = parseFloat(persona.edad);
                    vectorCarac[1] = parseFloat(persona.peso);
                    vectorCarac[2] = parseFloat(persona.altura);
                    vectorCarac[3] = parseFloat(persona.mascotas);
                    
                    personasNorma.push(normalizacion(vectorCarac));

            });
        }

        function calcularMagnitud(vector) {
            var magnitud = Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1]) + (vector[2] * vector[2]) + (vector[3] * vector[3]));
            if(magnitud == 0) {
                magnitud = 0,0000001;
            }
            return magnitud;
        }

        function calcularDist(index, vector) {
            var distancias = [];
            for (let i = 0; i < vector.length; i++) {
                if(i != index) {
                    var productoPunto = (vector[index][0] * vector[i][0]) + (vector[index][1] * vector[i][1]) + (vector[index][2] * vector[i][2]) + (vector[index][3] * vector[i][3]);
                    var resultado = productoPunto / (calcularMagnitud(vector[index]) * calcularMagnitud(vector[i]));
                    distancias.push(resultado);
                    
                }
                 else {
                     distancias.push(0);
                 }
                
            }
            return distancias;
        }

        function normalizacion(vectorCarac) {
            maxpeso = Math.max(...pesos);
            console.log(maxpeso);
            maxedad = Math.max(...edades);
            console.log(maxedad);
            maxaltura = Math.max(...alturas);
            console.log(maxaltura);
            maxmascota = Math.max(...mascotas);
            console.log(maxmascota);

            minpeso = Math.min(...pesos);
            console.log(minpeso);
            minedad = Math.min(...edades);
            console.log(minedad);
            minaltura = Math.min(...alturas);
            console.log(minaltura);
            minmascota = Math.min(...mascotas);
            console.log(minmascota);

            var vectorNor = [0, 0, 0, 0];
            vectorNor[0] = (vectorPeso[0]*(vectorCarac[0]-minedad))/maxedad;
            vectorNor[1] = (vectorPeso[1]*(vectorCarac[1]-minpeso))/maxpeso;
            vectorNor[2] = (vectorPeso[2]*(vectorCarac[2]-minaltura))/maxaltura;
            vectorNor[3] = (vectorPeso[3]*(vectorCarac[3]-minmascota))/maxmascota;

            return vectorNor;
        }

        function generarImgs(){
            var rango1 = document.getElementById('rango1');
            var rango2 = document.getElementById('rango2');
            var rango3 = document.getElementById('rango3');
            var rango4 = document.getElementById('rango4');
            var rango5 = document.getElementById('rango5');
            var rango6 = document.getElementById('rango6');
            rango1.innerHTML = "";
            rango2.innerHTML = "";
            rango3.innerHTML = "";
            rango4.innerHTML = "";
            rango5.innerHTML = "";
            rango6.innerHTML = "";
            var distancia =[];
            distancia = calcularDist(usuarioSelec, personasNorma);
            var img = document.createElement('img');

            img.src = './Fotos/' + usuarioSelec + '.jpg';
            img.width = '100';
            img.height = '100';
            rango6.appendChild(img);
            for (let i = 0; i < 21; i++) {
                if(i != usuarioSelec) {
                    
                    
                    if((distancia[i]*100) > 0 && (distancia[i]*100) < 20 ) {
                        var img1 = document.createElement('img');
                        img1.src = './Fotos/' + i + '.jpg';
                        img1.width = '100';
                        img1.height = '100';
                        rango1.appendChild(img1);
                        
                    }
                    if((distancia[i]*100) > 20 && (distancia[i]*100) < 40 ) {
                        var img2 = document.createElement('img');
                        img2.src = './Fotos/' + i + '.jpg';
                        img2.width = '100';
                        img2.height = '100';
                        rango2.appendChild(img2);
                        
                    }
                    if((distancia[i]*100) > 40 && (distancia[i]*100) < 60 ) {
                        var img3 = document.createElement('img');
                        img3.src = './Fotos/' + i + '.jpg';
                        img3.width = '100';
                        img3.height = '100';
                        rango3.appendChild(img3);
                        
                    }
                    if((distancia[i]*100) > 60 && (distancia[i]*100) < 80 ) {
                        var img4 = document.createElement('img');
                        img4.src = './Fotos/' + i + '.jpg';
                        img4.width = '100';
                        img4.height = '100';
                        rango4.appendChild(img4);
                       
                    }
                    if((distancia[i]*100) > 80 && (distancia[i]*100) < 100 ) {
                        var img5 = document.createElement('img');
                        img5.src = './Fotos/' + i + '.jpg';
                        img5.width = '100';
                        img5.height = '100';
                        rango5.appendChild(img5);
                        
                    }
                }  
            }
            distancia = [];
        }
    }
});