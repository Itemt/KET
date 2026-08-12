/* ==========================================================================
   CAMBRIDGE KET A2 MOCK EXAM - ADMIN DASHBOARD CLIENT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let submissionsList = [];
  let currentPasscode = '';

  // Elementos DOM
  const loginOverlay = document.getElementById('admin-login-overlay');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('login-error');
  const dashboardContent = document.getElementById('admin-dashboard-content');
  const tbody = document.getElementById('submissions-tbody');
  const searchInput = document.getElementById('search-input');
  const gradeFilter = document.getElementById('grade-filter');
  const btnRefresh = document.getElementById('btn-refresh');

  // Elementos Modal Detalle
  const detailModal = document.getElementById('detail-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const btnLogout = document.getElementById('btn-admin-logout');

  // Pestañas internas del Modal Detalle
  setupModalTabSwitcher();

  sessionStorage.removeItem('admin_passcode');

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('admin_passcode');
      currentPasscode = '';
      dashboardContent.style.display = 'none';
      btnLogout.style.display = 'none';
      loginOverlay.classList.add('active');
    });
  }

  /* --- Formulario de Login Admin --- */
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passcode = document.getElementById('admin-passcode').value.trim();
    attemptLogin(passcode);
  });

  async function attemptLogin(passcode) {
    const cleanPass = passcode.trim();
    if (cleanPass === 'ket2026') {
      currentPasscode = cleanPass;
      sessionStorage.setItem('admin_passcode', cleanPass);
      loginOverlay.classList.remove('active');
      dashboardContent.style.display = 'block';
      if (btnLogout) btnLogout.style.display = 'inline-flex';
      loadSubmissions();
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: cleanPass })
      });
      const data = await res.json();

      if (data.success) {
        currentPasscode = cleanPass;
        sessionStorage.setItem('admin_passcode', cleanPass);
        loginOverlay.classList.remove('active');
        dashboardContent.style.display = 'block';
        if (btnLogout) btnLogout.style.display = 'inline-flex';
        loadSubmissions();
      } else {
        loginError.style.display = 'block';
        loginError.textContent = 'PIN incorrecto. Intenta nuevamente.';
      }
    } catch (err) {
      loginError.style.display = 'block';
      loginError.textContent = 'Error al validar PIN. Verifica tu conexión.';
    }
  }

  /* --- Cargar Entregas desde la API --- */
  async function loadSubmissions() {
    try {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">Cargando lista de entregas...</td></tr>`;

      const res = await fetch('/api/admin/submissions');
      const data = await res.json();

      if (data.success) {
        submissionsList = data.submissions;
        updateDashboardStats(submissionsList);
        renderSubmissionsTable(submissionsList);
      } else {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--danger); padding: 30px;">Error al cargar las entregas.</td></tr>`;
      }
    } catch (err) {
      console.error('Error al obtener entregas:', err);
    }
  }

  /* --- Actualizar Métricas Estadísticas --- */
  function updateDashboardStats(list) {
    document.getElementById('stat-total-submissions').textContent = list.length;

    let totalScore = 0;
    list.forEach(sub => {
      totalScore += sub.total_auto_score;
    });

    const avg = list.length > 0 ? (totalScore / list.length).toFixed(1) : 0;
    const maxSample = list.length > 0 ? list[0].max_auto_score : 173;

    const avgElem = document.getElementById('stat-avg-score');
    if (avgElem) avgElem.textContent = `${avg} / ${maxSample}`;
  }

  /* --- Renderizar Tabla de Entregas --- */
  function renderSubmissionsTable(list) {
    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">
            No hay respuestas registradas aún.
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    list.forEach(sub => {
      const percentage = (sub.total_auto_score / (sub.max_auto_score || 1)) * 100;
      let badgeClass = 'score-med';
      if (percentage >= 70) badgeClass = 'score-high';
      else if (percentage < 50) badgeClass = 'score-low';

      const formattedAttempt = sub.attempt_time ? new Date(sub.attempt_time).toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) : 'No registrada';

      html += `
        <tr>
          <td><strong>#${sub.submission_id}</strong></td>
          <td><div style="font-weight: 700; color: var(--dark);">${sub.first_name} ${sub.last_name}</div></td>
          <td><span style="font-weight: 600; color: var(--primary);">${sub.grade}</span></td>
          <td>
            <span class="score-pill score-high" style="background: #e0f2fe; color: #0369a1;">
              🎧 ${sub.score_listening || 0} / ${sub.max_listening || 125}
            </span>
          </td>
          <td>
            <span class="score-pill score-med">
              📖 ${sub.score_reading_writing || 0} / 48
            </span>
          </td>
          <td>
            <span class="score-pill ${badgeClass}">
              🏆 ${sub.total_auto_score} / ${sub.max_auto_score || 173} (${Math.round(percentage)}%)
            </span>
          </td>
          <td style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">🕒 ${formattedAttempt}</td>
          <td>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="viewSubmissionDetail(${sub.submission_id})">
                👁️ Ver
              </button>
              <button class="btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" onclick="deleteSubmissionItem(${sub.submission_id})">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  // Búsqueda y Filtros
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (gradeFilter) gradeFilter.addEventListener('change', applyFilters);
  if (btnRefresh) btnRefresh.addEventListener('click', loadSubmissions);

  function applyFilters() {
    const term = searchInput.value.toLowerCase().trim();
    const selectedGrade = gradeFilter.value;

    const filtered = submissionsList.filter(sub => {
      const fullName = `${sub.first_name} ${sub.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(term);
      const matchesGrade = selectedGrade === 'ALL' || sub.grade === selectedGrade;
      return matchesSearch && matchesGrade;
    });

    renderSubmissionsTable(filtered);
  }

  /* --- Cambiador de Pestañas dentro del Modal Detalle --- */
  function setupModalTabSwitcher() {
    const btnListening = document.getElementById('btn-modal-tab-listening');
    const btnRW = document.getElementById('btn-modal-tab-rw');
    const btnWriting = document.getElementById('btn-modal-tab-writing');

    const contentListening = document.getElementById('modal-tab-listening-content');
    const contentRW = document.getElementById('modal-tab-rw-content');
    const contentWriting = document.getElementById('modal-tab-writing-content');

    if (btnListening && btnRW && btnWriting) {
      btnListening.addEventListener('click', () => {
        setModalTabActive(btnListening, contentListening);
      });
      btnRW.addEventListener('click', () => {
        setModalTabActive(btnRW, contentRW);
      });
      btnWriting.addEventListener('click', () => {
        setModalTabActive(btnWriting, contentWriting);
      });
    }

    function setModalTabActive(activeBtn, activeContent) {
      [btnListening, btnRW, btnWriting].forEach(btn => {
        btn.style.background = '#f1f5f9';
        btn.style.color = 'var(--text-muted)';
      });
      [contentListening, contentRW, contentWriting].forEach(cnt => {
        cnt.style.display = 'none';
      });

      activeBtn.style.background = '#e0f2fe';
      activeBtn.style.color = '#0369a1';
      activeContent.style.display = 'block';
    }
  }

  /* --- Construir Mapa de Preguntas y Respuestas Correctas --- */
  function buildQuestionMap(fullExamData) {
    const map = {};
    if (!fullExamData || !fullExamData.sections) return map;

    // Listening
    if (fullExamData.sections.listening && fullExamData.sections.listening.audios) {
      fullExamData.sections.listening.audios.forEach(audioObj => {
        if (audioObj.parts) {
          audioObj.parts.forEach(part => {
            if (part.questions) {
              part.questions.forEach(q => {
                map[q.id] = {
                  id: q.id,
                  text: q.question || (q.label ? `${q.label} ${q.prompt || ''}` : `Pregunta ${q.id}`),
                  correctAnswer: q.correctAnswer || (q.acceptableAnswers ? q.acceptableAnswers[0] : ''),
                  acceptableAnswers: q.acceptableAnswers || []
                };
              });
            }
          });
        }
      });
    }

    // Reading & Writing
    if (fullExamData.sections.reading_writing && fullExamData.sections.reading_writing.parts) {
      fullExamData.sections.reading_writing.parts.forEach(part => {
        if (part.questions) {
          part.questions.forEach(q => {
            map[q.id] = {
              id: q.id,
              text: q.question || (q.gapNumber ? `Gap (${q.gapNumber})` : `Pregunta ${q.id}`),
              correctAnswer: q.correctAnswer || (q.acceptableAnswers ? q.acceptableAnswers[0] : ''),
              acceptableAnswers: q.acceptableAnswers || []
            };
          });
        }
      });
    }

    return map;
  }

  /* --- Ver Detalle de Entrega --- */
  window.viewSubmissionDetail = async function(id) {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`);
      const data = await res.json();

      if (data.success) {
        const sub = data.submission;

        document.getElementById('modal-student-name').textContent = `${sub.first_name} ${sub.last_name}`;
        document.getElementById('modal-student-meta').textContent = `Grado: ${sub.grade} | Envió: ${new Date(sub.submitted_at).toLocaleString()}`;
        document.getElementById('modal-student-avatar').textContent = (sub.first_name.charAt(0) + sub.last_name.charAt(0)).toUpperCase();

        const scoreListElem = document.getElementById('modal-score-listening');
        if (scoreListElem) scoreListElem.textContent = `${sub.score_listening || 0} / ${sub.max_listening || 125}`;

        const scoreRwElem = document.getElementById('modal-score-rw');
        if (scoreRwElem) scoreRwElem.textContent = `${sub.score_reading_writing || 0} / 48`;

        const scoreTotalElem = document.getElementById('modal-score-total');
        if (scoreTotalElem) scoreTotalElem.textContent = `${sub.total_auto_score} / ${sub.max_auto_score || 173}`;

        // Textos del Writing (Partes 6 y 7)
        const p6Text = (sub.writing_part6 || '').trim();
        const p7Text = (sub.writing_part7 || '').trim();

        const p6Words = p6Text ? p6Text.split(/\s+/).length : 0;
        const p7Words = p7Text ? p7Text.split(/\s+/).length : 0;

        document.getElementById('modal-writing-p6').textContent = p6Text || 'Sin respuesta redactada por el alumno.';
        document.getElementById('modal-writing-p7').textContent = p7Text || 'Sin respuesta redactada por el alumno.';

        const badgeP6 = document.getElementById('badge-wordcount-p6');
        if (badgeP6) badgeP6.textContent = `${p6Words} palabras ${p6Words >= 25 ? '✅ (Completado)' : '(mín. 25)'}`;

        const badgeP7 = document.getElementById('badge-wordcount-p7');
        if (badgeP7) badgeP7.textContent = `${p7Words} palabras ${p7Words >= 35 ? '✅ (Completado)' : '(mín. 35)'}`;

        const questionMap = buildQuestionMap(sub.fullExamData);

        // Renderizar las respuestas individuales de Listening (125 Preguntas)
        renderModalListeningAnswers(sub.raw_answers_json || {}, questionMap);
        renderModalRWAnswers(sub.raw_answers_json || {}, questionMap);

        detailModal.classList.add('active');
      } else {
        alert('Error al consultar el detalle.');
      }
    } catch (err) {
      console.error('Error al ver detalle:', err);
    }
  };

  /* --- Renderizar Lista Completa de Respuestas de Listening (125 Preguntas) --- */
  function renderModalListeningAnswers(answersObj, questionMap = {}) {
    const container = document.getElementById('modal-listening-answers-container');
    if (!container) return;

    let html = '';
    let answeredCount = 0;

    for (let i = 1; i <= 125; i++) {
      const qKey = `listening_q${i}`;
      const given = answersObj[qKey] !== undefined && answersObj[qKey] !== null ? answersObj[qKey].toString().trim() : '';
      const qDef = questionMap[qKey] || {};

      let trackTag = 'Audio 1';
      let trackBorder = '#06b6d4';
      let tagBg = '#e0f2fe';
      let tagColor = '#0369a1';

      if (i >= 26 && i <= 50) {
        trackTag = 'Audio 2';
        trackBorder = '#8b5cf6';
        tagBg = '#f3e8ff';
        tagColor = '#6d28d9';
      } else if (i >= 51 && i <= 75) {
        trackTag = 'Audio 3';
        trackBorder = '#10b981';
        tagBg = '#d1fae5';
        tagColor = '#047857';
      } else if (i >= 76 && i <= 100) {
        trackTag = 'Audio 4';
        trackBorder = '#f59e0b';
        tagBg = '#fef3c7';
        tagColor = '#b45309';
      } else if (i >= 101) {
        trackTag = 'Audio 5';
        trackBorder = '#d946ef';
        tagBg = '#f5d0fe';
        tagColor = '#a21caf';
      }

      const correctAns = qDef.correctAnswer || '';
      let statusBadge = '';
      let cardBg = '#f8fafc';

      if (given) answeredCount++;

      if (!given) {
        statusBadge = `<span style="background: #fef3c7; color: #b45309; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;">⚠️ Sin responder</span>`;
      } else {
        const isMatch = (correctAns && given.toLowerCase() === correctAns.toLowerCase()) || 
                        (qDef.acceptableAnswers && qDef.acceptableAnswers.some(a => a.toLowerCase() === given.toLowerCase()));
        if (isMatch) {
          statusBadge = `<span style="background: #dcfce7; color: #15803d; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;">✅ Correcto (+1)</span>`;
          cardBg = '#f0fdf4';
        } else {
          statusBadge = `<span style="background: #fee2e2; color: #b91c1c; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;">❌ Incorrecto</span>`;
          cardBg = '#fef2f2';
        }
      }

      const qTextDisplay = qDef.text ? `<div style="font-size: 0.88rem; color: var(--dark); font-weight: 600; margin-bottom: 6px;">${qDef.text}</div>` : '';

      html += `
        <div style="background: ${cardBg}; border-left: 4px solid ${trackBorder}; padding: 12px 16px; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 800; font-size: 0.9rem; color: var(--dark);">Pregunta ${i} (${qKey}):</span>
              <span style="font-size: 0.7rem; font-weight: 800; background: ${tagBg}; color: ${tagColor}; padding: 2px 6px; border-radius: 4px;">${trackTag}</span>
            </div>
            ${statusBadge}
          </div>

          ${qTextDisplay}

          <div style="display: flex; gap: 16px; font-size: 0.9rem; flex-wrap: wrap; margin-top: 4px;">
            <div style="font-weight: 600; color: var(--dark);">
              📝 Alumno marcó: <span style="background: white; border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; font-weight: 700;">${given || 'Sin respuesta'}</span>
            </div>
            ${correctAns ? `
              <div style="font-weight: 600; color: #047857;">
                ✅ Respuesta correcta: <span style="background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 4px; font-weight: 700;">${correctAns}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  /* --- Renderizar Lista Completa de Respuestas de Reading & Writing --- */
  function renderModalRWAnswers(answersObj, questionMap = {}) {
    const container = document.getElementById('modal-rw-answers-container');
    if (!container) return;

    let html = '';
    let foundCount = 0;

    Object.keys(answersObj).sort().forEach(key => {
      if (key.startsWith('rw_')) {
        foundCount++;
        const given = (answersObj[key] || '').toString().trim();
        const qDef = questionMap[key] || {};
        const correctAns = qDef.correctAnswer || '';

        let statusBadge = '';
        let cardBg = '#f8fafc';

        if (!given) {
          statusBadge = `<span style="background: #fef3c7; color: #b45309; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;">⚠️ Sin responder</span>`;
        } else {
          const isMatch = (correctAns && given.toLowerCase() === correctAns.toLowerCase()) || 
                          (qDef.acceptableAnswers && qDef.acceptableAnswers.some(a => a.toLowerCase() === given.toLowerCase()));
          if (isMatch) {
            statusBadge = `<span style="background: #dcfce7; color: #15803d; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;">✅ Correcto (+1)</span>`;
            cardBg = '#f0fdf4';
          } else {
            statusBadge = `<span style="background: #fee2e2; color: #b91c1c; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;">❌ Incorrecto</span>`;
            cardBg = '#fef2f2';
          }
        }

        const qTextDisplay = qDef.text ? `<div style="font-size: 0.88rem; color: var(--dark); font-weight: 600; margin-bottom: 6px;">${qDef.text}</div>` : '';

        html += `
          <div style="background: ${cardBg}; border-left: 4px solid var(--primary); padding: 12px 16px; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
              <span style="font-weight: 800; font-size: 0.9rem; color: var(--dark);">${key}:</span>
              ${statusBadge}
            </div>

            ${qTextDisplay}

            <div style="display: flex; gap: 16px; font-size: 0.9rem; flex-wrap: wrap; margin-top: 4px;">
              <div style="font-weight: 600; color: var(--dark);">
                📝 Alumno marcó: <span style="background: white; border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; font-weight: 700;">${given || 'Sin respuesta'}</span>
              </div>
              ${correctAns ? `
                <div style="font-weight: 600; color: #047857;">
                  ✅ Respuesta correcta: <span style="background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 4px; font-weight: 700;">${correctAns}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }
    });

    if (foundCount === 0) {
      html = `<div style="grid-column: 1 / -1; color: var(--text-muted); padding: 15px; text-align: center; background: #f8fafc; border-radius: 8px;">No se registraron respuestas de Reading & Writing en esta entrega.</div>`;
    }

    container.innerHTML = html;
  }

  // Cerrar Modal Detalle
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      detailModal.classList.remove('active');
    });
  }

  // Eliminar Entrega
  window.deleteSubmissionItem = async function(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar esta entrega? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        loadSubmissions();
      } else {
        alert('Error al eliminar la entrega.');
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };
});
