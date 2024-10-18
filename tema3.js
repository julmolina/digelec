document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { 
            question: "¿Cuál de las siguientes opciones NO es un lenguaje de programación utilizado en microcontroladores?", 
            options: ["Java", "HTML", "C", "Micropython"], 
            answer: "HTML",
            explanation: "HTML es un lenguaje de marcado utilizado para estructurar el contenido web, no es un lenguaje de programación como Java, C o Micropython que se utilizan en microcontroladores."
        },
        { 
            question: "¿Cuáles son las partes de un microchip?", 
            options: ["CPU, RAM, ROM y líneas de entrada/salida", "RAM, CPU, ROM y disco rígido", "RAM, pines digitales, UPS y LCD", "LED, pines analógicos, fuente de alimentación y ROM"], 
            answer: "CPU, RAM, ROM y líneas de entrada/salida",
            explanation: "Un microchip normalmente incluye la CPU, RAM, ROM y líneas de entrada/salida. Los otros elementos mencionados no son parte del microchip."
        },
        { 
            question: "¿Cuáles son tres características de los microcontroladores PIC de Gama Media?", 
            options: ["Arquitectura RISC de 8 bits con conjunto de instrucciones limitado, Memoria Flash, EEPROM y RAM moderadas y Bajo consumo de energía.", "Periféricos integrados, Bajo número de pines (6-8) y Mayor memoria Flash, EEPROM y RAM.", "Arquitectura RISC de 8 bits con ejecución rápida, Periféricos integrados y Memoria Flash, EEPROM y RAM moderadas.", "Interfaz USB, Periféricos básicos y Mayor memoria Flash, EEPROM y RAM."], 
            answer: "Arquitectura RISC de 8 bits con ejecución rápida, Periféricos integrados y Memoria Flash, EEPROM y RAM moderadas.",
            explanation: "Los microcontroladores PIC de Gama Media se caracterizan por su arquitectura RISC de 8 bits, lo que permite una ejecución rápida. Además, incluyen periféricos integrados que facilitan su uso en diversas aplicaciones y cuentan con memoria Flash, EEPROM y RAM en cantidades moderadas, lo que los hace adecuados para aplicaciones que requieren eficiencia y bajo consumo de energía."
        },
        { 
            question: "¿Cuál de las siguientes opciones es una limitación del uso de microcontroladores PIC?", 
            options: ["Programabilidad limitada", "Bajo consumo de energía", "Arquitectura simple", "Demasiados recursos"], 
            answer: "Programabilidad limitada",
            explanation: "La programabilidad limitada de los microcontroladores PIC significa que su conjunto de instrucciones es restringido y su flexibilidad es menor en comparación con otros tipos de microcontroladores. Esto puede limitar su capacidad para manejar aplicaciones complejas o específicas que requieren un mayor nivel de personalización en la programación."
        },
        { 
            question: "En el código de control del LED, ¿qué instrucción apaga el LED después de 1 segundo?", 
            options: ["output_high(PIN_B0);", "delay_ms(500);", "output_bit(PIN_B0,0);", "output_low(PIN_B1);"], 
            answer: "output_bit(PIN_B0,0);",
            explanation: "La instrucción que apaga el LED es output_bit(PIN_B0,0); ya que esta función establece el estado del pin B0 a bajo, apagando el LED conectado a dicho pin."
        },
        { 
            question: "¿Qué función se utiliza para establecer el canal del ADC en el código de control de pantalla LCD?", 
            options: ["setup_adc(adc_clock_internal);", "set_adc_channel(0);", "read_adc();", "lcd_gotoxy(1,1);"], 
            answer: "set_adc_channel(0);",
            explanation: "La función set_adc_channel(0); se utiliza para seleccionar el canal 0 del ADC, lo cual es necesario antes de iniciar la conversión ADC."
        },
        { 
            question: "¿Qué función inicializa la pantalla LCD en el código de comunicación UART?", 
            options: ["lcd_clear()", "lcd_putc()", "lcd_gotoxy()", "lcd_init()"], 
            answer: "lcd_init()",
            explanation: "La función lcd_init() inicializa la pantalla LCD, configurando los pines y el estado inicial del dispositivo."
        },
        { 
            question: "¿Cuál de las siguientes librerías se utiliza para la configuración del tiempo de retardo en los códigos?", 
            options: ["#use timer(clock=20M)", "#use delay(clock=20M)", "#include (timer.h) ", "#include (delay.h)"], 
            answer: "#use delay(clock=20M)",
            explanation: "#use delay(clock=20M) es una directiva usada para configurar el tiempo de retardo en los programas, estableciendo la velocidad del reloj."
        },
        { 
            question: "En los códigos proporcionados, ¿cuál es la librería que se usa para configurar el manejo de puertos como entradas o salidas?", 
            options: ["#use fast_io(B)", "#use port_io(B)", "#define io_ports(B)", "#include <input_output.h>"], 
            answer: "#use fast_io(B)",
            explanation: "La directiva #use fast_io(B) se utiliza para definir que los pines del puerto B se configuren rápidamente como entradas o salidas según el programa."
        },
        { 
            question: "¿Cuál de las siguientes instrucciones se utiliza para incluir el microcontrolador PIC16F877A en el código?", 
            options: ["#use pic16f877a.h", "#include <pic16f877a.lib>", "#include <16f877a.h>", "#device 16F877A"], 
            answer: "#include <16f877a.h>",
            explanation: "La instrucción correcta para incluir el microcontrolador PIC16F877A en el código es #include <16f877a.h>."
        }
    ];

    const quizContainer = document.getElementById('quiz-container');

    // Función para mezclar el array de preguntas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Función para crear y mostrar las preguntas
    function displayQuestions() {
        shuffle(questions);
        quizContainer.innerHTML = questions.map((q, index) => `
            <div class="question-container" data-question-index="${index}">
                <div class="question">${index + 1}. ${q.question}</div>
                ${q.options.map(option => `
                    <div class="answer" id="q${index}-${option}">
                        <input type="radio" name="question-${index}" value="${option}" id="input-q${index}-${option}">
                        <label for="input-q${index}-${option}">${option}</label>
                    </div>
                `).join('')}
                <button onclick="checkAnswer(${index}, '${q.answer}', '${q.explanation}')">Enviar</button>
                <div class="explanation" id="explanation-${index}"></div> <!-- Justificación -->
            </div>
        `).join('');
    }

    // Función para verificar las respuestas
    window.checkAnswer = function(questionIndex, correctAnswer, explanation) {
        const questionContainer = document.querySelector(`.question-container[data-question-index="${questionIndex}"]`);
        const selectedOption = questionContainer.querySelector(`input[name="question-${questionIndex}"]:checked`);
        const answerDivs = questionContainer.querySelectorAll(`.answer`);
        const correctDiv = Array.from(answerDivs).find(div => div.textContent.includes(correctAnswer));
        const explanationDiv = document.querySelector(`#explanation-${questionIndex}`);

        // Limpiar clases anteriores
        answerDivs.forEach(div => {
            div.classList.remove('correct', 'incorrect');
            div.querySelector('label').classList.remove('correct-answer');
        });

        explanationDiv.textContent = ""; // Limpiar explicación anterior

        if (selectedOption) {
            const selectedLabel = document.querySelector(`input[name="question-${questionIndex}"]:checked + label`);
            const answerDiv = selectedLabel.parentElement;
            const isCorrect = selectedOption.value === correctAnswer;

            if (isCorrect) {
                answerDiv.classList.add('correct');
            } else {
                answerDiv.classList.add('incorrect');
                explanationDiv.textContent = explanation; // Mostrar explicación
            }
        } else {
            // Si no se ha seleccionado ninguna opción, no hacer nada
            if (correctDiv) {
                correctDiv.classList.add('correct');
                correctDiv.querySelector('label').classList.add('correct-answer');
            }
        }

        // Subrayar la respuesta correcta si la respuesta seleccionada es incorrecta
        if (selectedOption && correctDiv) {
            correctDiv.querySelector('label').classList.add('correct-answer');
        }
    };

    displayQuestions();
});
