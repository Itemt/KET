/* ==========================================================================
   CAMBRIDGE KET A2 MOCK EXAM - CLIENT SIDE ENGINE (AUDIOS 1, 2, 3 & 4)
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

  // Cargar Examen desde API
  fetchExamData();
  setupModuleSelector();
  setupTabNavigation();
  setupAudioTrackSwitcher();
  setupAudioPlayer('1');
  setupAudioPlayer('2');
  setupAudioPlayer('3');
  setupAudioPlayer('4');
  startGlobalTimer();
  setupFormSubmission(student);

  /* --- Cargar Datos del Examen desde Backend --- */
  async function fetchExamData() {
    try {
      const studentId = student.id || student.student_id || '';
      const res = await fetch('/api/exam?studentId=' + encodeURIComponent(studentId));
      const data = await res.json();

      if (data.success) {
        examData = data.exam;
        if (examData.sections && examData.sections.reading_writing) {
          renderReadingWritingSection(examData.sections.reading_writing);
        }
        if (examData.sections && examData.sections.listening) {
          renderListeningSection(examData.sections.listening);
        }
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

  /* --- Selector Inicial de Módulo (Listening vs Reading & Writing) --- */
  function setupModuleSelector() {
    const btnSelectListening = document.getElementById('btn-select-listening');
    const btnSelectRW = document.getElementById('btn-select-rw');
    const moduleScreen = document.getElementById('module-selection-screen');

    if (btnSelectListening) {
      btnSelectListening.addEventListener('click', () => {
        switchTab('tab-listening');
        if (moduleScreen) moduleScreen.style.display = 'none';
      });
    }

    if (btnSelectRW) {
      btnSelectRW.addEventListener('click', () => {
        switchTab('tab-reading-writing');
        if (moduleScreen) moduleScreen.style.display = 'none';
      });
    }
  }

  /* --- Navegación de Pestañas Principales --- */
  function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });
  }

  function switchTab(targetTabId) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.exam-section-content');

    tabBtns.forEach(b => {
      if (b.getAttribute('data-tab') === targetTabId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    sections.forEach(s => {
      if (s.id === targetTabId) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --- Cambiador de Pistas dentro de Listening (Audio 1, 2, 3, 4) --- */
  function setupAudioTrackSwitcher() {
    const btnTrack1 = document.getElementById('btn-audio-track-1');
    const btnTrack2 = document.getElementById('btn-audio-track-2');
    const btnTrack3 = document.getElementById('btn-audio-track-3');
    const btnTrack4 = document.getElementById('btn-audio-track-4');

    const container1 = document.getElementById('audio-track-1-container');
    const container2 = document.getElementById('audio-track-2-container');
    const container3 = document.getElementById('audio-track-3-container');
    const container4 = document.getElementById('audio-track-4-container');

    const audio1 = document.getElementById('audio-element-1');
    const audio2 = document.getElementById('audio-element-2');
    const audio3 = document.getElementById('audio-element-3');
    const audio4 = document.getElementById('audio-element-4');

    function resetTrackBtns() {
      [btnTrack1, btnTrack2, btnTrack3, btnTrack4].forEach(b => {
        if (b) {
          b.classList.remove('active');
          b.style.background = '#f1f5f9';
          b.style.color = 'var(--dark)';
        }
      });
      [container1, container2, container3, container4].forEach(c => {
        if (c) c.style.display = 'none';
      });
      [audio1, audio2, audio3, audio4].forEach(a => {
        if (a && !a.paused) a.pause();
      });
    }

    if (btnTrack1) {
      btnTrack1.addEventListener('click', () => {
        resetTrackBtns();
        btnTrack1.classList.add('active');
        btnTrack1.style.background = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
        btnTrack1.style.color = 'white';
        container1.style.display = 'block';
      });
    }

    if (btnTrack2) {
      btnTrack2.addEventListener('click', () => {
        resetTrackBtns();
        btnTrack2.classList.add('active');
        btnTrack2.style.background = 'linear-gradient(135deg, #8b5cf6, #ec4899)';
        btnTrack2.style.color = 'white';
        container2.style.display = 'block';
      });
    }

    if (btnTrack3) {
      btnTrack3.addEventListener('click', () => {
        resetTrackBtns();
        btnTrack3.classList.add('active');
        btnTrack3.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btnTrack3.style.color = 'white';
        container3.style.display = 'block';
      });
    }

    if (btnTrack4) {
      btnTrack4.addEventListener('click', () => {
        resetTrackBtns();
        btnTrack4.classList.add('active');
        btnTrack4.style.background = 'linear-gradient(135deg, #eab308, #ca8a04)';
        btnTrack4.style.color = 'white';
        container4.style.display = 'block';
      });
    }
  }

  /* --- Control Genérico de Reproductor de Audio (1, 2, 3 o 4) --- */
  function setupAudioPlayer(idSuffix) {
    const audio = document.getElementById(`audio-element-${idSuffix}`);
    const btnPlay = document.getElementById(`btn-play-a${idSuffix}`);
    const btnRewind = document.getElementById(`btn-rewind-5-a${idSuffix}`);
    const btnForward = document.getElementById(`btn-forward-5-a${idSuffix}`);
    const seekBar = document.getElementById(`seek-bar-a${idSuffix}`);
    const volumeBar = document.getElementById(`vol-bar-a${idSuffix}`);
    const currentLabel = document.getElementById(`time-current-a${idSuffix}`);
    const durationLabel = document.getElementById(`time-duration-a${idSuffix}`);
    const speedBtns = document.querySelectorAll(`.btn-speed-a${idSuffix}`);

    if (!audio) return;

    function formatTime(seconds) {
      if (isNaN(seconds) || seconds < 0) return '00:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (audio.paused) {
          // Pausar los otros audios
          ['1', '2', '3', '4'].forEach(otherId => {
            if (otherId !== idSuffix) {
              const otherAudio = document.getElementById(`audio-element-${otherId}`);
              if (otherAudio && !otherAudio.paused) otherAudio.pause();
            }
          });

          audio.play();
          btnPlay.innerHTML = '⏸️';
        } else {
          audio.pause();
          btnPlay.innerHTML = '▶️';
        }
      });
    }

    audio.addEventListener('play', () => {
      if (btnPlay) btnPlay.innerHTML = '⏸️';
    });

    audio.addEventListener('pause', () => {
      if (btnPlay) btnPlay.innerHTML = '▶️';
    });

    audio.addEventListener('loadedmetadata', () => {
      if (durationLabel) durationLabel.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      if (currentLabel) currentLabel.textContent = formatTime(audio.currentTime);
      if (durationLabel && (!audio.duration || durationLabel.textContent === '00:00')) {
        durationLabel.textContent = formatTime(audio.duration);
      }
      if (seekBar && audio.duration) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
      }
    });

    if (seekBar) {
      seekBar.addEventListener('input', () => {
        if (audio.duration) {
          audio.currentTime = (seekBar.value / 100) * audio.duration;
        }
      });
    }

    if (btnRewind) {
      btnRewind.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
      });
    }

    if (btnForward) {
      btnForward.addEventListener('click', () => {
        if (audio.duration) {
          audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        }
      });
    }

    if (volumeBar) {
      volumeBar.addEventListener('input', () => {
        audio.volume = parseFloat(volumeBar.value);
      });
    }

    speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const speed = parseFloat(btn.getAttribute('data-speed') || '1.0');
        audio.playbackRate = speed;
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

      if (part.questions) {
        part.questions.forEach((q) => {
          html += `<div class="question-block">`;
          if (q.context) {
            html += `<div class="context-box">${q.context}</div>`;
          }
          if (q.question) {
            html += `<p class="question-text">${q.question}</p>`;
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
    setupWritingCounters();
  }

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

  /* --- Renderizar Sección Listening (Audios 1, 2, 3 y 4) --- */
  function renderListeningSection(section) {
    if (!section.audios) return;

    section.audios.forEach((audioObj, index) => {
      let containerId = 'listening-questions-a1';
      let themeColor = '#06b6d4';
      let titleColor = '#0891b2';

      if (index === 1) {
        containerId = 'listening-questions-a2';
        themeColor = '#8b5cf6';
        titleColor = '#6d28d9';
      } else if (index === 2) {
        containerId = 'listening-questions-a3';
        themeColor = '#10b981';
        titleColor = '#047857';
      } else if (index === 3) {
        containerId = 'listening-questions-a4';
        themeColor = '#eab308';
        titleColor = '#a16207';
      }

      const container = document.getElementById(containerId);
      if (!container) return;

      let html = '';

      audioObj.parts.forEach(part => {
        html += `
          <div class="card">
            <div class="part-header" style="border-left-color: ${themeColor};">
              <h3 class="part-title" style="color: ${titleColor};">${part.title}</h3>
              <p class="instructions">${part.instructions}</p>
            </div>
        `;

        if (part.questions) {
          part.questions.forEach((q) => {
            html += `<div class="question-block">`;
            
            if (q.question) {
              html += `<p class="question-text">${q.question}</p>`;
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
            } else if (part.type === 'gap_fill') {
              html += `
                <div style="margin-top: 10px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                  <label style="font-weight: 700; color: var(--dark); min-width: 140px;">${q.label}</label>
                  <div style="font-size: 1rem; color: ${titleColor}; font-weight: 600;">${q.prompt}</div>
                  <input type="text" name="${q.id}" class="input-field" placeholder="Tu respuesta..." style="max-width: 240px;">
                </div>
              `;
            }

            html += `</div>`;
          });
        }

        html += `</div>`;
      });

      container.innerHTML = html;
    });
  }

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

  /* --- Envío Final del Examen --- */
  function setupFormSubmission(student) {
    const form = document.getElementById('ket-exam-form');
    const btnSubmit = document.getElementById('btn-submit-exam');

    const handleSubmission = async (e) => {
      if (e) e.preventDefault();

      const confirmSubmit = confirm('¿Estás seguro de enviar tu Examen KET A2? Revisa bien que hayas completado tus respuestas de Audios 1, 2, 3, 4 y Reading & Writing.');
      if (!confirmSubmit) return;

      const formData = new FormData(form);
      const answersObj = {};

      formData.forEach((value, key) => {
        answersObj[key] = value;
      });

      const payload = {
        student: {
          firstName: student.firstName || student.first_name,
          lastName: student.lastName || student.last_name || '',
          grade: student.grade || '6to',
          username: student.username || ''
        },
        answers: answersObj,
        attempt_time: student.attemptTime || student.startTime || new Date().toISOString()
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
    };

    if (btnSubmit) btnSubmit.addEventListener('click', handleSubmission);
    if (form) form.addEventListener('submit', handleSubmission);
  }

  /* --- Mostrar Modal de Resultados --- */
  function showResultsModal(score) {
    const listeningElem = document.getElementById('res-listening-score');
    if (listeningElem) listeningElem.textContent = `${score.listening || 0} / ${score.max_listening || 100}`;

    const rwElem = document.getElementById('res-rw-score');
    if (rwElem) rwElem.textContent = `${score.reading_writing || 0} / ${score.max_reading_writing || 48}`;

    const totalElem = document.getElementById('res-total-score');
    if (totalElem) totalElem.textContent = `${score.total || 0} / ${score.max || 148}`;

    const modal = document.getElementById('results-modal');
    if (modal) modal.classList.add('active');
  }
});
