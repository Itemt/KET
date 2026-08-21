document.addEventListener('DOMContentLoaded', () => {
  // Verificar Autenticación de Estudiante
  const studentData = localStorage.getItem('ket_student');
  if (!studentData) {
    window.location.href = '/';
    return;
  }

  let student;
  try {
    student = JSON.parse(studentData);
  } catch (e) {
    localStorage.removeItem('ket_student');
    window.location.href = '/';
    return;
  }

  let examData = null;

  setupStudentHeader(student);
  fetchExamData();
  setupModuleSelector();
  setupTabNavigation();
  setupAudioTrackSwitcher();
  setupAudioPlayer('1');
  setupAudioPlayer('2');
  setupAudioPlayer('3');
  setupAudioPlayer('4');
  setupAudioPlayer('5');
  setupFormSubmission(student);
  setupSaveProgressButtons();

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

        // Restaurar progreso y respuestas previamente guardadas
        if (data.existingAnswers) {
          restoreSavedAnswers(data.existingAnswers);
        }
      } else {
        alert('Error al cargar el contenido del examen.');
      }
    } catch (err) {
      console.error('Error al conectar con la API de examen:', err);
    }
  }

  /* --- Restaurar Respuestas Guardadas --- */
  function restoreSavedAnswers(savedAnswers) {
    if (!savedAnswers || typeof savedAnswers !== 'object') return;

    Object.keys(savedAnswers).forEach(key => {
      const val = savedAnswers[key];
      if (val === undefined || val === null || val === '') return;

      // 1. Opciones Radio
      try {
        const radios = document.querySelectorAll(`input[type="radio"][name="${CSS.escape(key)}"]`);
        radios.forEach(radio => {
          if (radio.value === val) radio.checked = true;
        });
      } catch (e) {}

      // 2. Textos e Insumos
      try {
        const input = document.querySelector(`input[name="${CSS.escape(key)}"]:not([type="radio"]), textarea[name="${CSS.escape(key)}"]`);
        if (input) {
          input.value = val;
        }
      } catch (e) {}
    });
  }

  /* --- Configurar Encabezado del Estudiante --- */
  function setupStudentHeader(s) {
    const fullNameElem = document.getElementById('display-student-fullname');
    if (fullNameElem) fullNameElem.textContent = `${s.firstName} ${s.lastName}`;

    const gradeElem = document.getElementById('display-student-grade');
    if (gradeElem) gradeElem.textContent = `Grado: ${s.grade}`;

    const initialsElem = document.getElementById('student-avatar-initials');
    if (initialsElem) {
      const initials = (s.firstName.charAt(0) + s.lastName.charAt(0)).toUpperCase();
      initialsElem.textContent = initials;
    }
  }

  /* --- Selector Inicial de Módulo (Listening vs Reading & Writing) --- */
  function setupModuleSelector() {
    const btnSelectListening = document.getElementById('btn-select-listening');
    const btnSelectRW = document.getElementById('btn-select-rw');
    const modalOverlay = document.getElementById('module-selection-modal');

    if (btnSelectListening) {
      btnSelectListening.addEventListener('click', () => {
        switchTab('tab-listening');
        if (modalOverlay) modalOverlay.classList.remove('active');
      });
    }

    if (btnSelectRW) {
      btnSelectRW.addEventListener('click', () => {
        switchTab('tab-reading-writing');
        if (modalOverlay) modalOverlay.classList.remove('active');
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

  let currentActiveTab = 'tab-listening';

  function switchTab(targetTabId) {
    currentActiveTab = targetTabId;
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.exam-section-content');
    const btnSubmit = document.getElementById('btn-submit-exam');

    tabBtns.forEach(b => {
      if (b.getAttribute('data-tab') === targetTabId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    sections.forEach(s => {
      if (s.id === targetTabId) {
        s.style.display = 'block';
        s.classList.add('active');
      } else {
        s.style.display = 'none';
        s.classList.remove('active');
      }
    });

    if (btnSubmit) {
      if (targetTabId === 'tab-listening') {
        btnSubmit.innerHTML = '🎧 Enviar Listening';
        btnSubmit.style.background = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
      } else if (targetTabId === 'tab-reading-writing') {
        btnSubmit.innerHTML = '📖 Enviar Reading & Writing';
        btnSubmit.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --- Alternar entre Sub-Pestañas de Audios 1, 2, 3, 4 y 5 con Lazy Loading --- */
  function prepareTrackAudio(trackNum) {
    const audio = document.getElementById(`audio-element-${trackNum}`);
    if (audio && (audio.preload === 'none' || audio.readyState === 0)) {
      audio.preload = 'metadata';
      audio.load();
    }
  }

  function pauseAllAudiosExcept(keepPlayingId = null) {
    ['1', '2', '3', '4', '5'].forEach(id => {
      if (id !== keepPlayingId) {
        const a = document.getElementById(`audio-element-${id}`);
        const btn = document.getElementById(`btn-play-a${id}`);
        if (a && !a.paused) {
          a.pause();
        }
        if (btn && btn.innerHTML !== '▶️') {
          btn.innerHTML = '▶️';
        }
      }
    });
  }

  function setupAudioTrackSwitcher() {
    const btnTrack1 = document.getElementById('btn-audio-track-1');
    const btnTrack2 = document.getElementById('btn-audio-track-2');
    const btnTrack3 = document.getElementById('btn-audio-track-3');
    const btnTrack4 = document.getElementById('btn-audio-track-4');
    const btnTrack5 = document.getElementById('btn-audio-track-5');

    const container1 = document.getElementById('audio-track-1-container');
    const container2 = document.getElementById('audio-track-2-container');
    const container3 = document.getElementById('audio-track-3-container');
    const container4 = document.getElementById('audio-track-4-container');
    const container5 = document.getElementById('audio-track-5-container');

    function resetTrackBtns() {
      [btnTrack1, btnTrack2, btnTrack3, btnTrack4, btnTrack5].forEach(btn => {
        if (btn) {
          btn.classList.remove('active');
          btn.style.background = '#f1f5f9';
          btn.style.color = 'var(--dark)';
        }
      });
      [container1, container2, container3, container4, container5].forEach(c => {
        if (c) c.style.display = 'none';
      });
    }

    if (btnTrack1) {
      btnTrack1.addEventListener('click', () => {
        pauseAllAudiosExcept('1');
        resetTrackBtns();
        btnTrack1.classList.add('active');
        btnTrack1.style.background = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
        btnTrack1.style.color = 'white';
        container1.style.display = 'block';
        prepareTrackAudio('1');
      });
    }

    if (btnTrack2) {
      btnTrack2.addEventListener('click', () => {
        pauseAllAudiosExcept('2');
        resetTrackBtns();
        btnTrack2.classList.add('active');
        btnTrack2.style.background = 'linear-gradient(135deg, #8b5cf6, #ec4899)';
        btnTrack2.style.color = 'white';
        container2.style.display = 'block';
        prepareTrackAudio('2');
      });
    }

    if (btnTrack3) {
      btnTrack3.addEventListener('click', () => {
        pauseAllAudiosExcept('3');
        resetTrackBtns();
        btnTrack3.classList.add('active');
        btnTrack3.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btnTrack3.style.color = 'white';
        container3.style.display = 'block';
        prepareTrackAudio('3');
      });
    }

    if (btnTrack4) {
      btnTrack4.addEventListener('click', () => {
        pauseAllAudiosExcept('4');
        resetTrackBtns();
        btnTrack4.classList.add('active');
        btnTrack4.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        btnTrack4.style.color = 'white';
        container4.style.display = 'block';
        prepareTrackAudio('4');
      });
    }

    if (btnTrack5) {
      btnTrack5.addEventListener('click', () => {
        pauseAllAudiosExcept('5');
        resetTrackBtns();
        btnTrack5.classList.add('active');
        btnTrack5.style.background = 'linear-gradient(135deg, #d946ef, #c026d3)';
        btnTrack5.style.color = 'white';
        container5.style.display = 'block';
        prepareTrackAudio('5');
      });
    }
  }

  /* --- Control Optimizado de Reproductor de Audio (1, 2, 3, 4 o 5) --- */
  function setupAudioPlayer(idSuffix) {
    const audio = document.getElementById(`audio-element-${idSuffix}`);
    const btnPlay = document.getElementById(`btn-play-a${idSuffix}`);
    const btnRewind = document.getElementById(`btn-rewind-5-a${idSuffix}`);
    const btnForward = document.getElementById(`btn-forward-5-a${idSuffix}`);
    const seekBar = document.getElementById(`seek-bar-a${idSuffix}`);
    const currentLabel = document.getElementById(`time-current-a${idSuffix}`);
    const durationLabel = document.getElementById(`time-duration-a${idSuffix}`);

    if (!audio) return;

    function formatTime(seconds) {
      if (isNaN(seconds) || seconds < 0 || !isFinite(seconds)) return '00:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (audio.paused) {
          pauseAllAudiosExcept(idSuffix);

          if (audio.readyState === 0) {
            audio.load();
          }

          btnPlay.innerHTML = '⏳';
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                btnPlay.innerHTML = '⏸️';
              })
              .catch(err => {
                console.warn(`Error al reproducir audio ${idSuffix}:`, err);
                btnPlay.innerHTML = '▶️';
              });
          }
        } else {
          audio.pause();
          btnPlay.innerHTML = '▶️';
        }
      });
    }

    audio.addEventListener('play', () => {
      if (btnPlay) btnPlay.innerHTML = '⏸️';
    });

    audio.addEventListener('playing', () => {
      if (btnPlay) btnPlay.innerHTML = '⏸️';
    });

    audio.addEventListener('pause', () => {
      if (btnPlay) btnPlay.innerHTML = '▶️';
    });

    audio.addEventListener('waiting', () => {
      if (btnPlay) btnPlay.innerHTML = '⏳';
    });

    audio.addEventListener('canplay', () => {
      if (!audio.paused && btnPlay) {
        btnPlay.innerHTML = '⏸️';
      }
      if (durationLabel && isFinite(audio.duration)) {
        durationLabel.textContent = formatTime(audio.duration);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      if (durationLabel && isFinite(audio.duration)) {
        durationLabel.textContent = formatTime(audio.duration);
      }
    });

    audio.addEventListener('durationchange', () => {
      if (durationLabel && isFinite(audio.duration)) {
        durationLabel.textContent = formatTime(audio.duration);
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (currentLabel) currentLabel.textContent = formatTime(audio.currentTime);
      if (durationLabel && (!audio.duration || durationLabel.textContent === '00:00') && isFinite(audio.duration)) {
        durationLabel.textContent = formatTime(audio.duration);
      }
      if (seekBar && isFinite(audio.duration) && audio.duration > 0) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
      }
    });

    audio.addEventListener('error', (e) => {
      console.error(`Error de red o decodificación en Audio ${idSuffix}:`, e);
      if (btnPlay) {
        btnPlay.innerHTML = '🔄';
        btnPlay.title = 'Error cargando audio. Haz clic para reintentar.';
      }
    });

    if (seekBar) {
      seekBar.addEventListener('input', () => {
        if (isFinite(audio.duration) && audio.duration > 0) {
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
        if (isFinite(audio.duration) && audio.duration > 0) {
          audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        }
      });
    }
  }

  /* --- Renderizar Sección Reading & Writing --- */
  function renderReadingWritingSection(section) {
    const container = document.getElementById('reading-writing-container');
    if (!container || !section || !section.parts) return;
    let html = '';

    section.parts.forEach(part => {
      html += `
        <div class="card" style="margin-bottom: 20px;">
          <div class="part-header" style="border-left: 4px solid var(--primary); padding-left: 12px; margin-bottom: 16px;">
            <h3 class="part-title" style="color: var(--primary); font-size: 1.1rem; font-weight: 800;">📘 Part ${part.part}</h3>
            <p class="instructions" style="font-size: 0.9rem; color: var(--text-muted);">${part.instructions || ''}</p>
          </div>
      `;

      if (part.passage) {
        html += `<div class="context-box" style="white-space: pre-line; line-height: 1.6; margin-bottom: 20px;">${part.passage}</div>`;
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
        html += `<div class="context-box" style="margin-bottom: 20px;">`;
        part.texts.forEach(txt => {
          html += `<p style="margin-bottom: 8px;"><strong>${txt.name}:</strong> ${txt.content}</p>`;
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
            html += `<p class="question-text" style="font-weight: 700; color: var(--dark); font-size: 0.98rem; margin-bottom: 12px;">${q.question}</p>`;
          }

          if (q.options) {
            html += `<div class="options-group">`;
            Object.keys(q.options).forEach(optKey => {
              html += `
                <label class="option-item">
                  <input type="radio" name="${q.id}" value="${optKey}">
                  <span><strong>${optKey}.</strong> ${q.options[optKey]}</span>
                </label>
              `;
            });
            html += `</div>`;
          } else if (part.type === 'open_cloze') {
            html += `
              <div style="margin-top: 10px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                <label style="font-weight: 700; color: var(--dark);">Gap (${q.gapNumber}):</label>
                <input type="text" name="${q.id}" class="input-field" placeholder="Escribe tu respuesta aquí..." style="max-width: 240px;">
              </div>
            `;
          }

          html += `</div>`;
        });
      }

      if (part.type === 'text_production') {
        html += `
          <div class="question-block">
            <textarea name="${part.fieldName}" id="${part.fieldName}" class="input-field writing-area" rows="6" data-minwords="${part.minWords}" style="width: 100%; padding: 12px; border-radius: 8px; border: 1.5px solid var(--border-color);" placeholder="Write your text here in English..."></textarea>
            <div class="word-count-badge" id="badge-${part.fieldName}" style="margin-top: 8px; font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">Palabras: 0 / mín. ${part.minWords}</div>
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
            badge.style.color = 'var(--success)';
          } else {
            badge.style.color = 'var(--text-muted)';
          }
        }
      });
    });
  }

  /* --- Renderizar Sección Listening (Audios 1, 2, 3, 4 y 5) --- */
  function renderListeningSection(section) {
    if (!section || !section.audios) return;

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
        themeColor = '#f59e0b';
        titleColor = '#b45309';
      } else if (index === 4) {
        containerId = 'listening-questions-a5';
        themeColor = '#d946ef';
        titleColor = '#a21caf';
      }

      const container = document.getElementById(containerId);
      if (!container) return;

      let html = '';

      (audioObj.parts || []).forEach(part => {
        html += `
          <div class="card" style="margin-top: 16px;">
            <div class="part-header" style="border-left: 4px solid ${themeColor}; padding-left: 12px; margin-bottom: 16px;">
              <h3 class="part-title" style="color: ${titleColor}; font-size: 1.1rem; font-weight: 800;">${part.title || ''}</h3>
              <p class="instructions" style="font-size: 0.9rem; color: var(--text-muted);">${part.instructions || ''}</p>
            </div>
        `;

        if (part.type === 'matching' && part.options) {
          html += `
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 0.88rem;">
              <strong>Opciones A–H:</strong> `;
            Object.keys(part.options).forEach(k => {
              html += `<span style="margin-right: 12px;"><strong>${k}:</strong> ${part.options[k]}</span>`;
            });
            html += `</div>`;
        }

        if (part.questions) {
          part.questions.forEach((q) => {
            html += `<div class="question-block">`;
            
            if (q.question) {
              html += `<p class="question-text" style="font-weight: 700; color: var(--dark); font-size: 0.98rem; margin-bottom: 12px;">${q.question}</p>`;
            }

            if (part.type === 'matching' && part.options) {
              html += `<div class="options-group" style="display: flex; gap: 8px; flex-wrap: wrap;">`;
              Object.keys(part.options).forEach(optKey => {
                html += `
                  <label class="option-item">
                    <input type="radio" name="${q.id}" value="${optKey}">
                    <span><strong>${optKey}</strong></span>
                  </label>
                `;
              });
              html += `</div>`;
            } else if (q.options) {
              html += `<div class="options-group">`;
              Object.keys(q.options).forEach(optKey => {
                html += `
                  <label class="option-item">
                    <input type="radio" name="${q.id}" value="${optKey}">
                    <span><strong>${optKey}.</strong> ${q.options[optKey]}</span>
                  </label>
                `;
              });
              html += `</div>`;
            } else if (part.type === 'gap_fill' || q.label) {
              html += `
                <div style="margin-top: 10px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                  <label style="font-weight: 700; color: var(--dark); min-width: 140px;">${q.label || ('Gap ' + (q.gapNumber || ''))}</label>
                  <div style="font-size: 1rem; color: ${titleColor}; font-weight: 600;">${q.prompt || ''}</div>
                  <input type="text" name="${q.id}" class="input-field" placeholder="Tu respuesta..." style="max-width: 240px;">
                </div>
              `;
            } else {
              html += `<input type="text" name="${q.id}" class="input-field" placeholder="Tu respuesta..." style="max-width: 300px;">`;
            }

            html += `</div>`;
          });
        }

        html += `</div>`;
      });

      container.innerHTML = html;
    });
  }

  /* --- Guardar Progreso del Estudiante --- */
  function setupSaveProgressButtons() {
    const btnHeader = document.getElementById('btn-save-progress-header');
    const btnBottom = document.getElementById('btn-save-progress-bottom');

    if (btnHeader) btnHeader.addEventListener('click', () => saveProgress(true));
    if (btnBottom) btnBottom.addEventListener('click', () => saveProgress(true));
  }

  async function saveProgress(showToast = true) {
    const form = document.getElementById('ket-exam-form');
    if (!form) return;

    const formData = new FormData(form);
    const answersObj = {};

    formData.forEach((value, key) => {
      if (value !== undefined && value !== null && value.toString().trim() !== '') {
        answersObj[key] = value.toString().trim();
      }
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
      if (result.success && showToast) {
        showSaveToast('💾 ¡Tu progreso ha sido guardado exitosamente!');
      }
    } catch (err) {
      console.error('Error al guardar progreso:', err);
      if (showToast) alert('No se pudo guardar el progreso. Verifica tu conexión a internet.');
    }
  }

  function showSaveToast(message) {
    let toast = document.getElementById('save-progress-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'save-progress-toast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.style.display = 'none'; }, 300);
    }, 3000);
  }

  /* --- Envío Final del Examen --- */
  function setupFormSubmission(student) {
    const form = document.getElementById('ket-exam-form');

    const handleSubmission = async (e) => {
      if (e) e.preventDefault();

      const sectionName = currentActiveTab === 'tab-listening' ? 'Listening' : 'Reading & Writing';
      const confirmSubmit = confirm(`¿Estás seguro de enviar tus respuestas de ${sectionName}? Se guardará y actualizará el puntaje de esta sección.`);
      if (!confirmSubmit) return;

      const formData = new FormData(form);
      const answersObj = {};

      formData.forEach((value, key) => {
        if (value !== undefined && value !== null && value.toString().trim() !== '') {
          answersObj[key] = value.toString().trim();
        }
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
          showResultsModal(result.score);
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (err) {
        console.error('Error al enviar el examen:', err);
        alert('Ocurrió un error de red al intentar enviar tu examen.');
      }
    };

    if (form) form.addEventListener('submit', handleSubmission);
  }

  /* --- Mostrar Modal de Resultados --- */
  function showResultsModal(score) {
    if (!score) score = {};

    const listeningVal = score.score_listening !== undefined ? score.score_listening : (score.listening !== undefined ? score.listening : 0);
    const maxListeningVal = score.max_listening !== undefined ? score.max_listening : 125;

    const rwVal = score.score_reading_writing !== undefined ? score.score_reading_writing : (score.reading_writing !== undefined ? score.reading_writing : 0);
    const maxRwVal = score.max_reading_writing !== undefined ? score.max_reading_writing : 48;

    const totalVal = score.total_auto_score !== undefined ? score.total_auto_score : (score.total !== undefined ? score.total : 0);
    const maxTotalVal = score.max_auto_score !== undefined ? score.max_auto_score : (score.max !== undefined ? score.max : 173);

    const listeningElem = document.getElementById('res-score-listening');
    if (listeningElem) listeningElem.textContent = `${listeningVal} / ${maxListeningVal}`;

    const rwElem = document.getElementById('res-score-rw');
    if (rwElem) rwElem.textContent = `${rwVal} / ${maxRwVal}`;

    const totalElem = document.getElementById('res-score-total');
    if (totalElem) totalElem.textContent = `${totalVal} / ${maxTotalVal}`;

    const modal = document.getElementById('results-modal');
    if (modal) modal.classList.add('active');

    const btnFinish = document.getElementById('btn-modal-finish');
    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        localStorage.removeItem('ket_student');
        window.location.href = '/';
      });
    }
  }

  const btnExit = document.getElementById('btn-exit-exam');
  if (btnExit) {
    btnExit.addEventListener('click', async () => {
      const confirmExit = confirm('¿Deseas salir del examen? Puedes guardar tu progreso antes de salir.');
      if (confirmExit) {
        await saveProgress(false);
        window.location.href = '/';
      }
    });
  }
});
