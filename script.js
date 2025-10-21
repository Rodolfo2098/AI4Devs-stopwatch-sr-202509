// Clase para manejar cronómetros
class Stopwatch {
    constructor(name = 'Cronómetro') {
        this.name = name;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.intervalId = null;
    }

    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => {
                this.elapsedTime = Date.now() - this.startTime;
                this.updateDisplay();
            }, 10);
            this.isRunning = true;
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
        }
    }

    reset() {
        this.pause();
        this.elapsedTime = 0;
        this.startTime = 0;
        this.updateDisplay();
    }

    getTimeString() {
        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        // Esta función será sobrescrita por cada instancia
    }
}

// Clase para manejar temporizadores
class Timer {
    constructor(name = 'Temporizador', minutes = 0, seconds = 0) {
        this.name = name;
        this.totalTime = (minutes * 60 + seconds) * 1000; // en milisegundos
        this.remainingTime = this.totalTime;
        this.isRunning = false;
        this.intervalId = null;
        this.isFinished = false;
        this.alarmIntervalId = null;
    }

    start() {
        if (!this.isRunning && this.remainingTime > 0) {
            this.startTime = Date.now();
            this.intervalId = setInterval(() => {
                const elapsed = Date.now() - this.startTime;
                this.remainingTime = Math.max(0, this.totalTime - elapsed);
                this.updateDisplay();

                if (this.remainingTime <= 0) {
                    this.finish();
                }
            }, 10);
            this.isRunning = true;
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
        }
        // Detener alarma si está sonando
        this.stopAlarm();
    }

    reset() {
        this.pause();
        this.remainingTime = this.totalTime;
        this.isFinished = false;
        this.updateDisplay();
    }

    finish() {
        this.pause();
        this.remainingTime = 0;
        this.isFinished = true;
        this.updateDisplay();
        this.showAlert();
        this.startAlarm();
    }

    stopAlarm() {
        if (this.alarmIntervalId) {
            clearInterval(this.alarmIntervalId);
            this.alarmIntervalId = null;
        }
    }

    getTimeString() {
        const totalSeconds = Math.ceil(this.remainingTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        // Esta función será sobrescrita por cada instancia
    }

    showAlert() {
        const modal = document.getElementById('alertModal');
        const message = document.getElementById('alertMessage');
        message.textContent = `El temporizador "${this.name}" ha terminado.`;
        modal.style.display = 'block';
    }

    startAlarm() {
        // Crear alarma continua que se repite cada segundo
        this.alarmIntervalId = setInterval(() => {
            this.playSound();
        }, 1000);
    }

    playSound() {
        // Crear un sonido usando Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}

// Aplicación principal
class TimerApp {
    constructor() {
        this.stopwatches = [];
        this.timers = [];
        this.currentStopwatch = null;
        this.currentTimer = null;
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderStopwatches();
        this.renderTimers();
    }

    setupEventListeners() {
        // Pestañas
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Cronómetro principal
        document.getElementById('startPauseBtn').addEventListener('click', () => {
            this.toggleMainStopwatch();
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearMainStopwatch();
        });

        // Agregar cronómetro
        document.getElementById('addStopwatchBtn').addEventListener('click', () => {
            this.addStopwatch();
        });

        // Temporizador principal
        document.getElementById('startTimerBtn').addEventListener('click', () => {
            this.startMainTimer();
        });

        document.getElementById('pauseTimerBtn').addEventListener('click', () => {
            this.pauseMainTimer();
        });

        document.getElementById('resetTimerBtn').addEventListener('click', () => {
            this.resetMainTimer();
        });

        // Agregar temporizador
        document.getElementById('addTimerBtn').addEventListener('click', () => {
            this.addTimer();
        });

        // Modal de alerta
        document.getElementById('closeAlertBtn').addEventListener('click', () => {
            document.getElementById('alertModal').style.display = 'none';
        });

        document.getElementById('stopAlarmBtn').addEventListener('click', () => {
            this.stopAllAlarms();
            document.getElementById('alertModal').style.display = 'none';
        });

        // Cerrar modal al hacer clic fuera
        document.getElementById('alertModal').addEventListener('click', (e) => {
            if (e.target.id === 'alertModal') {
                document.getElementById('alertModal').style.display = 'none';
            }
        });
    }

    switchTab(tabName) {
        // Actualizar botones de pestañas
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Mostrar contenido correspondiente
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    }

    // Funciones del cronómetro principal
    toggleMainStopwatch() {
        const button = document.getElementById('startPauseBtn');

        if (this.currentStopwatch) {
            if (this.currentStopwatch.isRunning) {
                this.currentStopwatch.pause();
                button.textContent = 'Iniciar';
            } else {
                this.currentStopwatch.start();
                button.textContent = 'Pausar';
            }
        } else {
            // Crear cronómetro principal si no existe
            this.currentStopwatch = new Stopwatch('Principal');
            this.currentStopwatch.updateDisplay = () => {
                document.getElementById('mainDisplay').textContent = this.currentStopwatch.getTimeString();
            };
            this.currentStopwatch.start();
            button.textContent = 'Pausar';
        }
    }

    clearMainStopwatch() {
        if (this.currentStopwatch) {
            this.currentStopwatch.reset();
            document.getElementById('startPauseBtn').textContent = 'Iniciar';
        }
    }

    addStopwatch() {
        const nameInput = document.getElementById('stopwatchName');
        const name = nameInput.value.trim();

        if (name) {
            const stopwatch = new Stopwatch(name);
            stopwatch.updateDisplay = () => {
                const item = document.querySelector(`[data-stopwatch-id="${stopwatch.name}"] .item-display`);
                if (item) {
                    item.textContent = stopwatch.getTimeString();
                }
            };

            this.stopwatches.push(stopwatch);
            nameInput.value = '';
            this.renderStopwatches();
            this.saveData();
        }
    }

    renderStopwatches() {
        const container = document.getElementById('stopwatchList');
        container.innerHTML = '';

        this.stopwatches.forEach(stopwatch => {
            const item = document.createElement('div');
            item.className = 'stopwatch-item';
            item.dataset.stopwatchId = stopwatch.name;

            if (this.currentStopwatch && this.currentStopwatch.name === stopwatch.name) {
                item.classList.add('selected');
            }

            item.innerHTML = `
                <div class="item-name">${stopwatch.name}</div>
                <div class="item-display">${stopwatch.getTimeString()}</div>
                <div class="item-controls">
                    <button class="btn btn-primary" onclick="app.selectStopwatch('${stopwatch.name}')">
                        ${this.currentStopwatch && this.currentStopwatch.name === stopwatch.name ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                    <button class="btn btn-danger" onclick="app.removeStopwatch('${stopwatch.name}')">Eliminar</button>
                </div>
            `;

            container.appendChild(item);
        });
    }

    selectStopwatch(name) {
        const stopwatch = this.stopwatches.find(s => s.name === name);
        if (stopwatch) {
            // NO pausar cronómetro actual - dejar que continúe funcionando
            this.currentStopwatch = stopwatch;
            this.currentStopwatch.updateDisplay = () => {
                document.getElementById('mainDisplay').textContent = this.currentStopwatch.getTimeString();
            };

            // Actualizar botón principal
            const button = document.getElementById('startPauseBtn');
            button.textContent = this.currentStopwatch.isRunning ? 'Pausar' : 'Iniciar';

            this.renderStopwatches();
        }
    }

    removeStopwatch(name) {
        if (confirm(`¿Estás seguro de que quieres eliminar el cronómetro "${name}"?`)) {
            this.stopwatches = this.stopwatches.filter(s => s.name !== name);

            if (this.currentStopwatch && this.currentStopwatch.name === name) {
                this.currentStopwatch = null;
                document.getElementById('startPauseBtn').textContent = 'Iniciar';
                document.getElementById('mainDisplay').textContent = '00:00:00';
            }

            this.renderStopwatches();
            this.saveData();
        }
    }

    // Funciones del temporizador principal
    startMainTimer() {
        const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

        if (minutes === 0 && seconds === 0) {
            alert('Por favor ingresa un tiempo válido');
            return;
        }

        if (!this.currentTimer) {
            this.currentTimer = new Timer('Principal', minutes, seconds);
            this.currentTimer.updateDisplay = () => {
                document.getElementById('mainTimerDisplay').textContent = this.currentTimer.getTimeString();
            };
        }

        this.currentTimer.start();
        document.getElementById('startTimerBtn').style.display = 'none';
        document.getElementById('pauseTimerBtn').style.display = 'inline-block';
    }

    pauseMainTimer() {
        if (this.currentTimer) {
            this.currentTimer.pause();
            document.getElementById('startTimerBtn').style.display = 'inline-block';
            document.getElementById('pauseTimerBtn').style.display = 'none';
        }
    }

    resetMainTimer() {
        if (this.currentTimer) {
            this.currentTimer.reset();
            document.getElementById('startTimerBtn').style.display = 'inline-block';
            document.getElementById('pauseTimerBtn').style.display = 'none';
        }
    }

    addTimer() {
        const nameInput = document.getElementById('timerName');
        const minutesInput = document.getElementById('timerMinutes');
        const secondsInput = document.getElementById('timerSeconds');

        const name = nameInput.value.trim();
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;

        if (name && (minutes > 0 || seconds > 0)) {
            const timer = new Timer(name, minutes, seconds);
            timer.updateDisplay = () => {
                const item = document.querySelector(`[data-timer-id="${timer.name}"] .item-display`);
                if (item) {
                    item.textContent = timer.getTimeString();
                }
            };

            this.timers.push(timer);
            nameInput.value = '';
            minutesInput.value = '0';
            secondsInput.value = '0';
            this.renderTimers();
            this.saveData();
        } else {
            alert('Por favor ingresa un nombre y un tiempo válido');
        }
    }

    renderTimers() {
        const container = document.getElementById('timerList');
        container.innerHTML = '';

        this.timers.forEach(timer => {
            const item = document.createElement('div');
            item.className = 'timer-item';
            item.dataset.timerId = timer.name;

            if (this.currentTimer && this.currentTimer.name === timer.name) {
                item.classList.add('selected');
            }

            item.innerHTML = `
                <div class="item-name">${timer.name}</div>
                <div class="item-display">${timer.getTimeString()}</div>
                <div class="item-controls">
                    <button class="btn btn-primary" onclick="app.selectTimer('${timer.name}')">
                        ${this.currentTimer && this.currentTimer.name === timer.name ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                    <button class="btn btn-danger" onclick="app.removeTimer('${timer.name}')">Eliminar</button>
                </div>
            `;

            container.appendChild(item);
        });
    }

    selectTimer(name) {
        const timer = this.timers.find(t => t.name === name);
        if (timer) {
            // NO pausar temporizador actual - dejar que continúe funcionando
            this.currentTimer = timer;
            this.currentTimer.updateDisplay = () => {
                document.getElementById('mainTimerDisplay').textContent = this.currentTimer.getTimeString();
            };

            // Actualizar inputs
            const totalSeconds = Math.ceil(this.currentTimer.totalTime / 1000);
            document.getElementById('minutesInput').value = Math.floor(totalSeconds / 60);
            document.getElementById('secondsInput').value = totalSeconds % 60;

            // Actualizar botones según el estado del temporizador seleccionado
            if (this.currentTimer.isRunning) {
                document.getElementById('startTimerBtn').style.display = 'none';
                document.getElementById('pauseTimerBtn').style.display = 'inline-block';
            } else {
                document.getElementById('startTimerBtn').style.display = 'inline-block';
                document.getElementById('pauseTimerBtn').style.display = 'none';
            }

            this.renderTimers();
        }
    }

    removeTimer(name) {
        if (confirm(`¿Estás seguro de que quieres eliminar el temporizador "${name}"?`)) {
            this.timers = this.timers.filter(t => t.name !== name);

            if (this.currentTimer && this.currentTimer.name === name) {
                this.currentTimer = null;
                document.getElementById('startTimerBtn').style.display = 'inline-block';
                document.getElementById('pauseTimerBtn').style.display = 'none';
                document.getElementById('mainTimerDisplay').textContent = '00:00';
                document.getElementById('minutesInput').value = '0';
                document.getElementById('secondsInput').value = '0';
            }

            this.renderTimers();
            this.saveData();
        }
    }

    // Detener todas las alarmas
    stopAllAlarms() {
        this.timers.forEach(timer => {
            timer.stopAlarm();
        });
    }

    // Persistencia
    saveData() {
        const data = {
            stopwatches: this.stopwatches.map(s => ({
                name: s.name,
                elapsedTime: s.elapsedTime,
                isRunning: s.isRunning
            })),
            timers: this.timers.map(t => ({
                name: t.name,
                totalTime: t.totalTime,
                remainingTime: t.remainingTime,
                isRunning: t.isRunning
            })),
            currentStopwatch: this.currentStopwatch ? this.currentStopwatch.name : null,
            currentTimer: this.currentTimer ? this.currentTimer.name : null
        };

        localStorage.setItem('timerAppData', JSON.stringify(data));
    }

    loadData() {
        const data = localStorage.getItem('timerAppData');
        if (data) {
            try {
                const parsed = JSON.parse(data);

                // Restaurar cronómetros
                this.stopwatches = parsed.stopwatches.map(s => {
                    const stopwatch = new Stopwatch(s.name);
                    stopwatch.elapsedTime = s.elapsedTime;
                    stopwatch.isRunning = false; // No restaurar estado de ejecución
                    stopwatch.updateDisplay = () => {
                        const item = document.querySelector(`[data-stopwatch-id="${stopwatch.name}"] .item-display`);
                        if (item) {
                            item.textContent = stopwatch.getTimeString();
                        }
                    };
                    return stopwatch;
                });

                // Restaurar temporizadores
                this.timers = parsed.timers.map(t => {
                    const timer = new Timer(t.name, 0, 0);
                    timer.totalTime = t.totalTime;
                    timer.remainingTime = t.remainingTime;
                    timer.isRunning = false; // No restaurar estado de ejecución
                    timer.updateDisplay = () => {
                        const item = document.querySelector(`[data-timer-id="${timer.name}"] .item-display`);
                        if (item) {
                            item.textContent = timer.getTimeString();
                        }
                    };
                    return timer;
                });

                // Restaurar selecciones actuales
                if (parsed.currentStopwatch) {
                    this.currentStopwatch = this.stopwatches.find(s => s.name === parsed.currentStopwatch);
                    if (this.currentStopwatch) {
                        this.currentStopwatch.updateDisplay = () => {
                            document.getElementById('mainDisplay').textContent = this.currentStopwatch.getTimeString();
                        };
                    }
                }

                if (parsed.currentTimer) {
                    this.currentTimer = this.timers.find(t => t.name === parsed.currentTimer);
                    if (this.currentTimer) {
                        this.currentTimer.updateDisplay = () => {
                            document.getElementById('mainTimerDisplay').textContent = this.currentTimer.getTimeString();
                        };

                        const totalSeconds = Math.ceil(this.currentTimer.totalTime / 1000);
                        document.getElementById('minutesInput').value = Math.floor(totalSeconds / 60);
                        document.getElementById('secondsInput').value = totalSeconds % 60;
                    }
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        }
    }
}

// Inicializar la aplicación cuando se carga la página
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TimerApp();
});