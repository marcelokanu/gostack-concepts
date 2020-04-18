import axios from 'axios';

const api = axios.create( {
  baseURL: 'http://localhost:3333', 
});

export default api;

/**
Ios com Emulador: localhost
Ios com dispositivo fisico: IP da maquina

Android roda em uma máquina virtual
Android com Emulador: para usar localhost - adb reverse tcp:3333 tcp:3333
Android com Emulador: 10.0.2.2 (Android Studio Emulador)
Android com Emulador genymotion: 10.0.3.2
Android com dispositivo fisico: Ip da máquina
 */