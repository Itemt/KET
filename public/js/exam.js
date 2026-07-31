/* ==========================================================================
   CAMBRIDGE KET A2 MOCK EXAM - CLIENT SIDE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Verificar datos del alumno en localStorage
  const studentDataRaw = localStorage.getItem('ket_student');
  if (!studentDataRaw) {
    alert('Por favor regístrate con tu nombre y grado antes de comenzar el examen.');
    window.location.href = '/';
    return;
  }

  const student = JSON.parse(studentDataRaw);
  setupStudentHeader(student);

  // Variables de Estado
  let examData = null;
  let timerInterval = null;
  let remainingSeconds = 90 * 60; // 90 Minutos
  let mediaRecorder = null;
  let audioChunks = [];
  let recordingSeconds = 0;
  let recordingInterval = null;

  // Cargar Examen desde API
  fetchExamData();
  setupTabNavigation();
  startGlobalTimer();
  setupSpeakingRecorder();
  setupFormSubmission(student);

  /* --- Cargar Datos del Examen desde Backend --- */
  async function fetchExamData() {
    try {
      const res = await fetch('/api/exam');
      const data = await res.json();

      if (data.success) {
        examData = data.exam;
        renderReadingWritingSection(examData.sections.reading_writing);
        renderListeningSection(examData.sections.listening);
      } else {
        alert('Error al cargar el contenido del examen.');
      }
    } catch (err) {
      console.error('Error al conectar con la API de examen:', err);
    }
  }

  /* --- Configurar Encabezado del Estudiante --- */
  function setupStudentHeader(s) {
    document.getElementById('student-display-name').textContent = `${s.firstName} ${s.lastName}`;
    document.getElementById('student-display-grade').textContent = s.grade;
    const initials = (s.firstName.charAt(0) + s.lastName.charAt(0)).toUpperCase();
    document.getElementById('avatar-initials').textContent = initials;
  }

  /* --- Navegación de Pestañas --- */
  function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.exam-section-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* --- Renderizar Sección Reading & Writing --- */
  function renderReadingWritingSection(section) {
    const container = document.getElementById('reading-writing-container');
    let html = '';

    section.parts.forEach(part => {
      html += `
        <div class="card">
          <div class="part-header">
            <h3 class="part-title">📘 Part ${part.part}</h3>
            <p class="instructions">${part.instructions}</p>
          </div>
      `;

      if (part.passage) {
        html += `<div class="context-box">${part.passage}</div>`;
      }

      // Renderizar anuncios A-H si existen (Matching Notices Part 2)
      if (part.notices) {
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 24px;">`;
        part.notices.forEach(not => {
          html += `
            <div style="background: #f8fafc; border-left: 4px solid var(--primary); padding: 14px 16px; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
              <h4 style="color: var(--primary); font-weight: 700; font-size: 0.95rem; margin-bottom: 6px;">${not.title}</h4>
              <p style="font-size: 0.88rem; color: var(--dark); line-height: 1.5;">${not.text}</p>
            </div>
          `;
        });
        html += `</div>`;
      }

      if (part.texts) {
        html += `<div class="context-box">`;
        part.texts.forEach(txt => {
          html += `<p><strong>${txt.name}:</strong> ${txt.content}</p>`;
        });
        html += `</div>`;
      }

      // Preguntas de opción múltiple / cloze
      if (part.questions) {
        part.questions.forEach((q, idx) => {
          html += `<div class="question-block">`;
          if (q.context) {
            html += `<div class="context-box">${q.context}</div>`;
          }
          if (q.question) {
            html += `<p class="question-text">${idx + 1}. ${q.question}</p>`;
          }

          if (q.options) {
            html += `<div class="options-group">`;
            Object.keys(q.options).forEach(optKey => {
              html += `
                <label class="option-label">
                  <input type="radio" name="${q.id}" value="${optKey}">
                  <span><strong>${optKey}.</strong> ${q.options[optKey]}</span>
                </label>
              `;
            });
            html += `</div>`;
          } else if (part.type === 'open_cloze') {
            html += `
              <div style="margin-top: 10px;">
                <label style="font-weight: 600;">Gap (${q.gapNumber}):</label>
                <input type="text" name="${q.id}" class="input-field" placeholder="Escribe una palabra aquí..." style="max-width: 300px; margin-left: 10px;">
              </div>
            `;
          }

          html += `</div>`;
        });
      }

      // Redacción de texto (Parts 6 & 7)
      if (part.type === 'text_production') {
        html += `
          <div class="question-block">
            <textarea name="${part.fieldName}" id="${part.fieldName}" class="input-field writing-area" data-minwords="${part.minWords}" placeholder="Write your text here in English..."></textarea>
            <div class="word-count-badge" id="badge-${part.fieldName}">Palabras: 0 / mín. ${part.minWords}</div>
          </div>
        `;
      }

      html += `</div>`;
    });

    container.innerHTML = html;

    // Escuchar eventos de conteo de palabras para redacciones
    setupWritingCounters();
  }

  /* --- Contadores de Palabras en Redacciones --- */
  function setupWritingCounters() {
    const textareas = document.querySelectorAll('.writing-area');
    textareas.forEach(ta => {
      ta.addEventListener('input', () => {
        const text = ta.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const minWords = parseInt(ta.getAttribute('data-minwords') || '0', 10);
        const badge = document.getElementById(`badge-${ta.id}`);

        if (badge) {
          badge.textContent = `Palabras: ${words} / mín. ${minWords}`;
          if (words >= minWords) {
            badge.classList.add('valid');
          } else {
            badge.classList.remove('valid');
          }
        }
      });
    });
  }

  /* --- Renderizar Sección Listening --- */
  function renderListeningSection(section) {
    const container = document.getElementById('listening-container');
    let html = '';

    section.parts.forEach(part => {
      html += `
        <div class="card">
          <div class="part-header">
            <h3 class="part-title">🎧 Listening Part ${part.part}</h3>
            <p class="instructions">${part.instructions}</p>
          </div>
      `;

      // Audio general de la parte (ej. Part 2 o Part 5 con monólogo completo)
      if (part.audioScript) {
        html += `
          <div class="audio-player-box" style="margin-bottom: 24px;">
            <div>
              <strong style="font-size: 1rem;">🔊 Audio Principal - Part ${part.part}</strong>
              <div style="font-size: 0.8rem; color: #cbd5e1;">Haz clic en reproducir para escuchar las instrucciones y datos.</div>
            </div>
            <button type="button" class="audio-controls-btn" onclick="playSpeechText('${encodeURIComponent(part.audioScript)}')">
              ▶️ Play Audio Track (Part ${part.part})
            </button>
          </div>
        `;
      }

      if (part.questions) {
        part.questions.forEach((q, idx) => {
          html += `<div class="question-block">`;

          // Botón de Reproducción de Audio por pregunta si existe a nivel de pregunta
          if (q.audioScript) {
            html += `
              <div class="audio-player-box">
                <div>
                  <strong style="font-size: 0.95rem;">🔊 Track Audio - Question ${q.question ? q.question.split('.')[0] : idx + 1}</strong>
                </div>
                <button type="button" class="audio-controls-btn" onclick="playSpeechText('${encodeURIComponent(q.audioScript)}')">
                  ▶️ Play Audio Track
                </button>
              </div>
            `;
          }

          if (q.question) {
            html += `<p class="question-text">${idx + 1}. ${q.question}</p>`;
          }

          if (q.options) {
            html += `<div class="options-group">`;
            Object.keys(q.options).forEach(optKey => {
              html += `
                <label class="option-label">
                  <input type="radio" name="${q.id}" value="${optKey}">
                  <span><strong>${optKey}.</strong> ${q.options[optKey]}</span>
                </label>
              `;
            });
            html += `</div>`;
          } else if (q.label) {
            html += `
              <div style="margin-top: 10px;">
                <label style="font-weight: 600;">${q.label}</label>
                <input type="text" name="${q.id}" class="input-field" placeholder="${q.hint || ''}" style="max-width: 300px; margin-left: 10px;">
              </div>
            `;
          }

          html += `</div>`;
        });
      }

      html += `</div>`;
    });

    container.innerHTML = html;
  }

  /* --- Función Global para reproducir audio síntesis (Web Speech API) --- */
  window.playSpeechText = function(encodedText) {
    const text = decodeURIComponent(encodedText);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Detener audios anteriores
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB'; // Acento Inglés de Cambridge
      utterance.rate = 0.9;     // Velocidad adecuada para A2
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta reproductor de síntesis de audio.');
    }
  };

  /* --- Temporizador Global del Examen --- */
  function startGlobalTimer() {
    const clock = document.getElementById('timer-clock');
    const timerBox = document.getElementById('timer-display');

    timerInterval = setInterval(() => {
      remainingSeconds--;

      if (remainingSeconds <= 300) {
        timerBox.classList.add('warning');
      }

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        alert('⏰ El tiempo del examen ha terminado. Tu examen se enviará automáticamente.');
        document.getElementById('ket-exam-form').dispatchEvent(new Event('submit'));
        return;
      }

      const mins = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;
      clock.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
  }

  /* --- Grabador de Voz MediaRecorder API (Speaking) --- */
  function setupSpeakingRecorder() {
    const btnRecord = document.getElementById('btn-record');
    const btnStop = document.getElementById('btn-stop');
    const statusText = document.getElementById('speaking-status');
    const timerDisplay = document.getElementById('recording-timer');
    const previewContainer = document.getElementById('audio-preview-container');
    const audioPlayer = document.getElementById('audio-player');
    const hiddenUrlInput = document.getElementById('speaking_audio_url');
    const uploadStatus = document.getElementById('upload-status-text');

    btnRecord.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          audioPlayer.src = audioUrl;
          previewContainer.classList.add('active');

          // Enviar archivo grabado al backend mediante FormData
          uploadAudioBlob(audioBlob);
        };

        mediaRecorder.start();
        btnRecord.classList.add('recording');
        btnRecord.style.display = 'none';
        btnStop.style.display = 'inline-flex';
        statusText.textContent = '🎙️ Grabando audio de Speaking... ¡Habla claro al micrófono!';
        timerDisplay.style.display = 'block';

        recordingSeconds = 0;
        recordingInterval = setInterval(() => {
          recordingSeconds++;
          const m = Math.floor(recordingSeconds / 60);
          const s = recordingSeconds % 60;
          timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);

      } catch (err) {
        console.error('Error al acceder al micrófono:', err);
        alert('No se pudo acceder al micrófono. Por favor permite los permisos de audio en tu navegador.');
      }
    });

    btnStop.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
      clearInterval(recordingInterval);
      btnRecord.classList.remove('recording');
      btnRecord.style.display = 'inline-flex';
      btnStop.style.display = 'none';
      statusText.textContent = 'Grabación finalizada. Puedes escuchar tu audio a continuación.';
    });

    async function uploadAudioBlob(blob) {
      uploadStatus.textContent = '⏳ Subiendo audio grabado al servidor...';
      const formData = new FormData();
      formData.append('audio', blob, `speaking_${Date.now()}.webm`);

      try {
        const response = await fetch('/api/speaking/upload', {
          method: 'POST',
          body: formData
        });
        const resData = await response.json();

        if (resData.success) {
          hiddenUrlInput.value = resData.audioUrl;
          uploadStatus.textContent = '✅ Audio guardado exitosamente en el servidor.';
          uploadStatus.style.color = 'var(--success)';
        } else {
          uploadStatus.textContent = '❌ Error al guardar el audio.';
          uploadStatus.style.color = 'var(--danger)';
        }
      } catch (error) {
        console.error('Error al subir audio:', error);
        uploadStatus.textContent = '❌ Error de conexión al subir el audio.';
        uploadStatus.style.color = 'var(--danger)';
      }
    }
  }

  /* --- Envío Final del Examen --- */
  function setupFormSubmission(student) {
    const form = document.getElementById('ket-exam-form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const confirmSubmit = confirm('¿Estás seguro de enviar tu Examen KET A2? Revisa bien antes de enviar.');
      if (!confirmSubmit) return;

      const formData = new FormData(form);
      const answersObj = {};

      formData.forEach((value, key) => {
        answersObj[key] = value;
      });

      const payload = {
        student: {
          firstName: student.firstName,
          lastName: student.lastName,
          grade: student.grade
        },
        speaking_audio_url: document.getElementById('speaking_audio_url').value,
        answers: answersObj
      };

      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
          clearInterval(timerInterval);
          showResultsModal(result.score);
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (err) {
        console.error('Error al enviar el examen:', err);
        alert('Ocurrió un error de red al intentar enviar tu examen.');
      }
    });
  }

  /* --- Mostrar Modal de Resultados --- */
  function showResultsModal(score) {
    document.getElementById('res-rw-score').textContent = `${score.reading_writing}`;
    document.getElementById('res-lis-score').textContent = `${score.listening}`;
    document.getElementById('res-total-score').textContent = `${score.total} / ${score.max}`;

    const modal = document.getElementById('results-modal');
    modal.classList.add('active');
  }
});
